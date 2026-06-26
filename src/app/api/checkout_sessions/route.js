import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '../../../lib/stripe'
import { getServerSession } from '@/lib/core/session'

export async function POST(req) {
    try {
        const headersList = await headers()
        const origin = headersList.get('origin')

        const body = await req.json()
        const priceAttr = body.amount
        const productName = body.productName || 'Recipely Premium Plan'
        const productDesc = body.productDesc || 'Premium access'

        // Distinguishes what's being purchased so the success page and
        // payments collection know how to handle it (recipe vs premium plan).
        const purchaseType = body.purchaseType || 'premium' // 'premium' | 'recipe'
        const recipeId = body.recipeId || null
        const planId = body.planId || null

        let parsedAmount = parseFloat(priceAttr);

        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            return NextResponse.json(
                { error: "Invalid price amount received." },
                { status: 400 }
            )
        }

        const user = await getServerSession()

        if (!user?.id) {
            return NextResponse.json(
                { error: "You must be logged in to make a purchase." },
                { status: 401 }
            )
        }

        // Recipe purchases must always carry a recipeId; without it the
        // payment can't be tied to a specific recipe in the payments collection.
        if (purchaseType === 'recipe' && !recipeId) {
            return NextResponse.json(
                { error: "Missing recipeId for recipe purchase." },
                { status: 400 }
            )
        }

        const session = await stripe.checkout.sessions.create({
            customer_email: user.email || undefined,
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        unit_amount: Math.round(parsedAmount * 100),
                        product_data: {
                            name: productName,
                            description: productDesc,
                        },
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            metadata: {
                userId: user.id,
                purchaseType,
                ...(recipeId ? { recipeId } : {}),
                ...(planId ? { planId } : {}),
            },
            success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/`,
        });

        return NextResponse.json({ url: session.url })

    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }
}