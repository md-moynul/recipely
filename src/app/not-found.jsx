import Link from "next/link";
import { Compass } from "@gravity-ui/icons";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <section className="w-full max-w-md rounded-3xl border border-[#EAE0D3] bg-white p-8 text-center shadow-sm dark:border-[#3A332A] dark:bg-[#252019]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FBF1E6] ">
          <Compass width={30} height={30} className="text-[#E85D3D]" />
        </div>

        <p className="mt-5 text-5xl font-bold text-[#E85D3D]">404</p>

        <h1 className="mt-2 text-xl font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
          This page got lost on the way to the kitchen
        </h1>

        <p className="mt-2 text-sm leading-relaxed text-[#6B6155] dark:text-[#B8AFA2]">
          The page you&apos;re looking for doesn&apos;t exist or may have
          been moved.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block rounded-xl bg-[#E85D3D] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#D14E30]"
        >
          Back Home
        </Link>
      </section>
    </main>
  );
}