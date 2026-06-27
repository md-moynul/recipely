import { Ban } from "@gravity-ui/icons";

export default function BlockedAccount() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      <div className="rounded-2xl border border-[#D64545]/30 bg-white p-8 text-center dark:bg-[#252019]">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#FBE9E7] dark:bg-[#3A1F1B]">
          <Ban width={22} height={22} className="text-[#C0392B] dark:text-[#E8897A]" />
        </div>

        <h2 className="mt-4 text-lg font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
          Your account has been blocked
        </h2>
        <p className="mt-1.5 text-sm text-[#6B6155] dark:text-[#B8AFA2]">
          You can&apos;t add new recipes while your account is restricted. If
          you think this is a mistake, please contact support.
        </p>
      </div>
    </div>
  );
}