import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CircleCheck, ArrowRight } from "@gravity-ui/icons";
import { stripe } from "@/lib/stripe";
import { postPayment } from "@/lib/action/payment";
import { getServerSession } from "@/lib/core/session";
import { changeIsPremium } from "@/lib/action/user";
import { getRecipeByRecipeId } from "@/lib/api/recipe";
import ClearCartOnSuccess from "@/components/cart/ClearCartOnSuccess";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }
  const [session, user] = await Promise.all([
    stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items", "payment_intent"],
    }),
    getServerSession()
  ]);

  const { status, customer_details, amount_total, currency, metadata } = session;
  const customerEmail = customer_details?.email;

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    if (!user || user.id !== metadata?.userId) {
      return redirect("/auth/login?error=UnauthorizedPaymentAccess");
    }

    const purchaseType = metadata?.purchaseType ?? "premium";
    const purchasedRecipes = [];

    if (purchaseType === "premium") {
      await changeIsPremium(user.id, true);
      await postPayment({
        userEmail: customerEmail,
        userId: user.id,
        purchaseType: "premium",
        recipeId: null,
        planId: metadata?.planId ?? null,
        amount: amount_total != null ? amount_total / 100 : null,
        currency,
        transactionId: session.payment_intent?.id ?? session.id,
        paymentStatus: "succeeded",
        paidAt: new Date(),
      });
    } else if (purchaseType === "cart") {
      const rawRecipeIds = metadata?.recipeIds ? metadata.recipeIds.split(",") : [];
      const recipeIds = rawRecipeIds.map((id) => id.trim()).filter(Boolean);

      // Save a transaction record for each recipe purchased in the cart
      await Promise.all(
        recipeIds.map(async (recipeId) => {
          try {
            await postPayment({
              userEmail: customerEmail,
              userId: user.id,
              purchaseType: "recipe",
              recipeId,
              planId: null,
              amount: null,
              currency,
              transactionId: session.payment_intent?.id ?? session.id,
              paymentStatus: "succeeded",
              paidAt: new Date(),
            });
            const recipe = await getRecipeByRecipeId(recipeId).catch(() => null);
            if (recipe) {
              purchasedRecipes.push(recipe);
            }
          } catch (e) {
            console.error(`Failed to record payment for recipe ${recipeId}:`, e);
          }
        })
      );
    } else {
      // Single recipe purchase
      const recipeId = metadata?.recipeId ?? null;
      await postPayment({
        userEmail: customerEmail,
        userId: user.id,
        purchaseType: "recipe",
        recipeId,
        planId: null,
        amount: amount_total != null ? amount_total / 100 : null,
        currency,
        transactionId: session.payment_intent?.id ?? session.id,
        paymentStatus: "succeeded",
        paidAt: new Date(),
      });

      if (recipeId) {
        const recipe = await getRecipeByRecipeId(recipeId).catch(() => null);
        if (recipe) purchasedRecipes.push(recipe);
      }
    }

    return (
      <main className="flex min-h-screen items-center justify-center px-4 py-12">
        <ClearCartOnSuccess />
        <section
          id="success"
          className="w-full max-w-lg rounded-3xl border border-[#EAE0D3] bg-white p-8 text-center shadow-sm dark:border-[#3A332A] dark:bg-[#252019]"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E6F4EA] dark:bg-[#1E3B2A]">
            <CircleCheck width={28} height={28} className="text-[#1E7B3C] dark:text-[#6FCF8E]" />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-[#2B2420] dark:text-[#F4EDE4]">
            Payment Successful!
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-[#6B6155] dark:text-[#B8AFA2]">
            Thank you for your purchase! A confirmation receipt has been sent to{" "}
            <span className="font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
              {customerEmail}
            </span>
            .
          </p>

          {purchasedRecipes.length > 0 && (
            <div className="my-6 rounded-2xl bg-[#FFF9F2] p-4 text-left border border-[#EAE0D3] dark:bg-[#1A1714] dark:border-[#3A332A]">
              <p className="text-xs font-bold uppercase tracking-wider text-[#9C9388] mb-3">
                Unlocked Recipes ({purchasedRecipes.length})
              </p>
              <div className="space-y-2.5">
                {purchasedRecipes.map((r) => (
                  <div
                    key={r._id || r.id}
                    className="flex items-center justify-between gap-3 bg-white dark:bg-[#252019] p-2.5 rounded-xl border border-[#EAE0D3] dark:border-[#3A332A]"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-[#FBF1E6] dark:bg-[#1A1714]">
                        {r.recipeImage ? (
                          <Image
                            src={r.recipeImage}
                            alt={r.recipeName}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-sm">
                            🍲
                          </div>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-[#2B2420] dark:text-[#F4EDE4] truncate">
                        {r.recipeName}
                      </p>
                    </div>

                    <Link
                      href={`/all-recipes/${r._id || r.id}`}
                      className="shrink-0 inline-flex items-center gap-1 rounded-lg bg-[#E85D3D] px-2.5 py-1 text-[11px] font-medium text-white hover:bg-[#D14E30] transition-colors"
                    >
                      Cook Now <ArrowRight width={12} height={12} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/dashboard/user/purchased"
              className="rounded-xl bg-[#E85D3D] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#D14E30]"
            >
              View Purchased Recipes
            </Link>
            <Link
              href="/all-recipes"
              className="rounded-xl border border-[#EAE0D3] px-5 py-2.5 text-sm font-medium text-[#2B2420] transition-colors hover:bg-[#FBF1E6] dark:border-[#3A332A] dark:text-[#F4EDE4] dark:hover:bg-[#1A1714]"
            >
              Browse More Recipes
            </Link>
          </div>

          <p className="mt-6 text-xs text-[#9C9388]">
            Questions? Email{" "}
            <a href="mailto:orders@recipely.com" className="text-[#E85D3D] hover:underline">
              orders@recipely.com
            </a>
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <section className="w-full max-w-md rounded-3xl border border-[#EAE0D3] bg-white p-8 text-center dark:border-[#3A332A] dark:bg-[#252019]">
        <p className="text-sm text-[#6B6155] dark:text-[#B8AFA2]">
          We couldn&apos;t confirm this payment. If you were charged, please contact support.
        </p>
      </section>
    </main>
  );
}