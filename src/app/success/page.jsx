import { redirect } from "next/navigation";
import Link from "next/link";
import { CircleCheck } from "@gravity-ui/icons";
import { stripe } from "@/lib/stripe";
import { postPayment } from "@/lib/action/payment";
import { getServerSession } from "@/lib/core/session";
import { changeIsPremium } from "@/lib/action/user";

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
      return redirect("/login?error=UnauthorizedPaymentAccess");
    }

    const purchaseType = metadata?.purchaseType ?? "premium";
    
    if (purchaseType === "premium") {
        await changeIsPremium(user.id, true);
    }

    await postPayment({
      userEmail: customerEmail,
      userId: user.id,
      purchaseType,
      recipeId: purchaseType === "recipe" ? metadata?.recipeId ?? null : null,
      planId: purchaseType === "premium" ? metadata?.planId ?? null : null,
      amount: amount_total != null ? amount_total / 100 : null,
      currency,
      transactionId: session.payment_intent?.id ?? session.id,
      paymentStatus: "succeeded",
      paidAt: new Date(),
    });

    return (
      <main className="flex min-h-screen items-center justify-center px-4 py-12">
        <section
          id="success"
          className="w-full max-w-md rounded-3xl border border-[#EAE0D3] bg-white p-8 text-center shadow-sm dark:border-[#3A332A] dark:bg-[#252019]"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E6F4EA] dark:bg-[#1E3B2A]">
            <CircleCheck width={28} height={28} className="text-[#1E7B3C] dark:text-[#6FCF8E]" />
          </div>

          <h1 className="mt-5 text-xl font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
            Payment successful
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-[#6B6155] dark:text-[#B8AFA2]">
            We appreciate your business! A confirmation email will be sent to{" "}
            <span className="font-medium text-[#2B2420] dark:text-[#F4EDE4]">
              {customerEmail}
            </span>
            .
          </p>

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