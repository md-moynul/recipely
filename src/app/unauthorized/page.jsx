import Link from "next/link";
import { ShieldExclamation } from "@gravity-ui/icons";
import { getServerSession } from "@/lib/core/session";

const page = async () => {
    const user = await getServerSession();
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <section className="w-full max-w-md rounded-3xl border border-[#EAE0D3] bg-white p-8 text-center shadow-sm dark:border-[#3A332A] dark:bg-[#252019]">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FBE9E7] dark:bg-[#3A1F1B]">
          <ShieldExclamation
            width={28}
            height={28}
            className="text-[#C0392B] dark:text-[#E8897A]"
          />
        </div>

        <h1 className="mt-5 text-xl font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
          You don&apos;t have access to this page
        </h1>

        <p className="mt-2 text-sm leading-relaxed text-[#6B6155] dark:text-[#B8AFA2]">
          You&apos;re signed in, but your account doesn&apos;t have
          permission to view this. If you think this is a mistake, contact
          support.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded-xl bg-[#E85D3D] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#D14E30]"
          >
            Back to Home
          </Link>
          <Link
            href={`/dashboard/${user?.role }`}
            className="rounded-xl border border-[#EAE0D3] px-5 py-2.5 text-sm font-medium text-[#2B2420] transition-colors hover:bg-[#FBF1E6] dark:border-[#3A332A] dark:text-[#F4EDE4] dark:hover:bg-[#1A1714]"
          >
            Go to Dashboard
          </Link>
        </div>
      </section>
    </main>
  );
};

export default page;