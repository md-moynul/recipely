import { Check, Star } from "@gravity-ui/icons";
import UpgradeButton from "./UpgradeButton";
import { getAllPlans } from "@/lib/api/plan";

const PremiumPage = async () => {
  const allPlans = await getAllPlans();
  console.log(allPlans);

  // Handles both possible shapes: a plain array of plan docs (as seeded
  // into MongoDB, e.g. [{ planId: "free", ... }, { planId: "premium", ... }]),
  // or an object like { plans: [...] }.
  const planList = Array.isArray(allPlans) ? allPlans : allPlans?.plans ?? [];

  const freePlan = planList.find((p) => p.planId === "free");
  const premiumPlan = planList.find((p) => p.planId === "premium");

  if (!freePlan || !premiumPlan) {
    return (
      <div className="mx-auto w-full max-w-4xl px-6 py-10">
        <p className="text-sm text-[#9C9388]">Plans are unavailable right now.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-10">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
          Go Premium
        </h1>
        <p className="mt-2 text-sm text-[#6B6155] dark:text-[#B8AFA2]">
          One payment. Lifetime access. No subscriptions, no renewals.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Free plan */}
        <div className="rounded-2xl border border-[#EAE0D3] bg-white p-6 dark:border-[#3A332A] dark:bg-[#252019]">
          <h2 className="text-lg font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
            {freePlan.name}
          </h2>
          <p className="mt-1 text-3xl font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
            $0
          </p>
          <p className="text-sm text-[#9C9388]">Forever</p>

          <ul className="mt-6 flex flex-col gap-3">
            {freePlan.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2.5 text-sm text-[#6B6155] dark:text-[#B8AFA2]"
              >
                <Check width={16} height={16} className="mt-0.5 shrink-0 text-[#9C9388]" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-xl border border-[#EAE0D3] px-4 py-2.5 text-center text-sm font-medium text-[#6B6155] dark:border-[#3A332A] dark:text-[#B8AFA2]">
            Your Current Plan
          </div>
        </div>

        {/* Premium plan */}
        <div className="relative rounded-2xl border-2 border-[#E85D3D] bg-white p-6 shadow-sm dark:bg-[#252019]">
          <span className="absolute -top-3 right-6 inline-flex items-center gap-1 rounded-full bg-[#E85D3D] px-3 py-1 text-xs font-semibold text-white">
            <Star width={12} height={12} className="fill-current" />
            Best Value
          </span>

          <h2 className="text-lg font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
            {premiumPlan.name}
          </h2>
          <p className="mt-1 text-3xl font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
            ${premiumPlan.price}
            <span className="text-base font-normal text-[#9C9388]"> one-time</span>
          </p>
          <p className="text-sm text-[#9C9388]">Pay once, keep it forever</p>

          <ul className="mt-6 flex flex-col gap-3">
            {premiumPlan.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2.5 text-sm text-[#2B2420] dark:text-[#F4EDE4]"
              >
                <Check width={16} height={16} className="mt-0.5 shrink-0 text-[#E85D3D]" />
                {feature}
              </li>
            ))}
          </ul>

          <UpgradeButton price={premiumPlan.price} />
        </div>
      </div>
    </div>
  );
};

export default PremiumPage;