import Image from "next/image";
import { Star, Calendar } from "@gravity-ui/icons";
import { getServerSession } from "@/lib/core/session";
import EditProfileDialog from "./EditProfileDialog";


// TODO: replace with your real session/user fetch, e.g.
// const user = await getServerSession();
const dummyUser = {
  name: "Md. Moynul Islam",
  email: "moynul@example.com",
  image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/65/35/73/sylhet-city.jpg",
  isPremium: true,
  createdAt: "2026-01-15T00:00:00.000Z",
};

const page = async () => {
  const user = (await getServerSession()) ?? dummyUser;

  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-10">
      <h1 className="text-2xl font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
        Profile
      </h1>
      <p className="mt-1 text-sm text-[#6B6155] dark:text-[#B8AFA2]">
        Manage how you appear on Recipely.
      </p>

      <div className="mt-8 rounded-2xl border border-[#EAE0D3] bg-white p-6 sm:p-8 dark:border-[#3A332A] dark:bg-[#252019]">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-[#E85D3D] bg-[#FBF1E6] dark:bg-[#1A1714]">
            {user?.image ? (
              <Image src={user.image} alt={user.name} fill className="object-cover" />
            ) : null}
          </div>

          <div className="flex-1">
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center">
              <h2 className="text-xl font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
                {user?.name}
              </h2>

              {user?.isPremium ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-[#F4A340]/40 bg-[#F4A340]/10 px-2.5 py-1 text-xs font-semibold text-[#B5781F]">
                  <Star width={13} height={13} className="fill-current" />
                  Premium
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full border border-[#EAE0D3] px-2.5 py-1 text-xs font-medium text-[#6B6155] dark:border-[#3A332A] dark:text-[#B8AFA2]">
                  Free Plan
                </span>
              )}
            </div>

            <p className="mt-1 text-sm text-[#9C9388]">{user?.email}</p>

            {user?.createdAt ? (
              <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-[#9C9388] sm:justify-start">
                <Calendar width={13} height={13} />
                Member since{" "}
                {new Date(user.createdAt).toLocaleDateString(undefined, {
                  dateStyle: "medium",
                })}
              </p>
            ) : null}
          </div>

          <div className="shrink-0">
            <EditProfileDialog user={user} />
          </div>
        </div>

        {!user?.isPremium && (
          <div className="mt-6 flex flex-col items-start justify-between gap-3 rounded-xl border border-[#F4A340]/40 bg-[#F4A340]/10 p-4 sm:flex-row sm:items-center">
            <p className="text-sm text-[#B5781F]">
              Go Premium to unlock unlimited recipes and a premium badge.
            </p>
            <a
              href="/dashboard/user/premium"
              className="shrink-0 rounded-xl bg-[#E85D3D] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#D14E30]"
            >
              Upgrade
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;