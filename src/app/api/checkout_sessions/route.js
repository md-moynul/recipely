import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '../../../lib/stripe'
import { getServerSession } from '@/lib/core/session'

export async function POST(req) {
    try {
        const headersList = await headers()
        const origin = headersList.get('origin')

        const body = await req.json()
        const purchaseType = body.purchaseType || 'premium' // 'premium' | 'recipe' | 'cart'
        
        const user = await getServerSession()
        if (!user?.id) {
            return NextResponse.json(
                { error: "You must be logged in to make a purchase." },
                { status: 401 }
            )
        }

        // 1. MULTI-ITEM CART CHECKOUT
        if (purchaseType === 'cart') {
            const items = body.items
            if (!Array.isArray(items) || items.length === 0) {
                return NextResponse.json(
                    { error: "No items found in cart." },
                    { status: 400 }
                )
            }

            const validItems = items.filter(
                (item) => item.recipeId && !isNaN(parseFloat(item.price)) && parseFloat(item.price) > 0
            )

            if (validItems.length === 0) {
                return NextResponse.json(
                    { error: "Cart items have invalid prices." },
                    { status: 400 }
                )
            }

            const line_items = validItems.map((item) => {
                const itemPrice = parseFloat(item.price);
                return {
                    price_data: {
                        currency: 'usd',
                        unit_amount: Math.round(itemPrice * 100),
                        product_data: {
                            name: item.recipeName || 'Recipe Access',
                            description: `Full lifetime access to recipe: ${item.recipeName || 'Recipe'}`,
                        },
                    },
                    quantity: 1,
                };
            });

            const recipeIds = validItems.map((i) => i.recipeId).join(',');

            const session = await stripe.checkout.sessions.create({
                customer_email: user.email || undefined,
                line_items,
                mode: 'payment',
                metadata: {
                    userId: user.id,
                    purchaseType: 'cart',
                    recipeIds,
                },
                success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${origin}/dashboard/user/cart`,
            });

            return NextResponse.json({ url: session.url })
        }

        // 2. SINGLE ITEM (RECIPE OR PLAN) CHECKOUT
        const priceAttr = body.amount
        const productName = body.productName || 'Recipely Premium Plan'
        const productDesc = body.productDesc || 'Premium access'
        const recipeId = body.recipeId || null
        const planId = body.planId || null

        let parsedAmount = parseFloat(priceAttr);

        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            return NextResponse.json(
                { error: "Invalid price amount received." },
                { status: 400 }
            )
        }

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