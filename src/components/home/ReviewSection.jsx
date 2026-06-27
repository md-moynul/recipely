"use client";

import { StarFill } from "@gravity-ui/icons";
import { motion } from "motion/react";
import Image from "next/image";

const reviews = [
  {
    id: 1,
    name: "Ayesha Khan",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    comment:
      "This biryani recipe is absolutely amazing! My family loved it. The spices were perfectly balanced.",
    recipe: "Kacchi Biryani",
    time: "2 days ago",
  },
  {
    id: 2,
    name: "Rahim Uddin",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
    comment:
      "Very easy to follow and tasted delicious. Will definitely make it again.",
    recipe: "Beef Kala Bhuna",
    time: "1 week ago",
  },
  {
    id: 3,
    name: "Nadia Islam",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    comment:
      "The best mango dessert I've ever made at home. My kids are asking for it every weekend!",
    recipe: "Mango Bhapa Doi",
    time: "3 days ago",
  },
  {
    id: 4,
    name: "Tanvir Ahmed",
    avatar: "https://randomuser.me/api/portraits/men/15.jpg",
    rating: 5,
    comment:
      "Finally a recipe site that doesn't bury the actual recipe under a life story. Clean and useful.",
    recipe: "Chicken Roast",
    time: "5 days ago",
  },
  {
    id: 5,
    name: "Farzana Karim",
    avatar: "https://randomuser.me/api/portraits/women/21.jpg",
    rating: 4,
    comment:
      "Loved being able to save recipes to favorites — makes meal planning so much easier.",
    recipe: "Shorshe Ilish",
    time: "4 days ago",
  },
  {
    id: 6,
    name: "Imran Hossain",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    rating: 5,
    comment:
      "Bought a premium recipe from a local chef on here and it was worth every taka. Incredible detail.",
    recipe: "Mutton Tehari",
    time: "6 days ago",
  },
  {
    id: 7,
    name: "Sumaiya Rahman",
    avatar: "https://randomuser.me/api/portraits/women/9.jpg",
    rating: 5,
    comment:
      "Shared my grandmother's pitha recipe here and got so many kind comments. Love this community.",
    recipe: "Patishapta Pitha",
    time: "1 day ago",
  },
  {
    id: 8,
    name: "Kamal Hasan",
    avatar: "https://randomuser.me/api/portraits/men/77.jpg",
    rating: 4,
    comment:
      "Simple, fast, and the dark mode is genuinely easy on the eyes during late-night cooking sessions.",
    recipe: "Beef Bhuna Khichuri",
    time: "1 week ago",
  },
];

function ReviewCard({ review }) {
  return (
    <div className="w-85 shrink-0 rounded-3xl border border-[#EAE0D3] bg-[#FBF1E6] p-8 dark:border-[#3A332A] dark:bg-[#252019]">
      <div className="mb-6 flex items-center gap-4">
        <div className="relative h-12 w-12 overflow-hidden rounded-full">
          <Image
            src={review.avatar}
            alt={review.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-semibold text-[#2B2420] dark:text-white">
            {review.name}
          </p>
          <p className="text-sm text-[#9C9388]">{review.time}</p>
        </div>
      </div>

      <div className="mb-4 flex">
        {[...Array(5)].map((_, i) => (
          <StarFill
            key={i}
            width={22}
            height={22}
            className={
              i < review.rating
                ? "text-yellow-500"
                : "text-gray-300 dark:text-gray-600"
            }
          />
        ))}
      </div>

      <p className="mb-4 leading-relaxed text-[#2B2420] dark:text-[#F4EDE4]">
        &ldquo;{review.comment}&rdquo;
      </p>

      <p className="text-sm font-medium text-[#E85D3D]">— {review.recipe}</p>
    </div>
  );
}

const ReviewSection = () => {
  // Duplicate the list once so the marquee can loop seamlessly — the
  // CSS animation moves the track exactly -50% of its total width,
  // which lines the end of the first copy up with the start of the
  // second, so the loop reset is invisible.
  const marqueeReviews = [...reviews, ...reviews];

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* Real Motion usage: this heading fades + slides in once it
            scrolls into view (whileInView), unlike the earlier
            <motion.div> with no animation props, which did nothing. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold text-[#2B2420] dark:text-white">
            What Our Users Say
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[#6B6155] dark:text-[#B8AFA2]">
            Real stories from real home cooks who love RecipeHub
          </p>
        </motion.div>

        {/* Marquee track stays plain CSS (see globals.css) — Motion's
            JS-driven transforms don't support reliable infinite-loop
            + hover-pause the way native CSS animations do. */}
        <div className="marquee-wrapper relative overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-linear-to-r from-[#FFF9F2] to-transparent dark:from-[#1A1714] sm:w-32" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-linear-to-l from-[#FFF9F2] to-transparent dark:from-[#1A1714] sm:w-32" />

          <div className="marquee-track flex w-max animate-marquee gap-6">
            {marqueeReviews.map((review, i) => (
              <ReviewCard key={`${review.id}-${i}`} review={review} />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 border-t border-[#EAE0D3] pt-8 text-center dark:border-[#3A332A]"
        >
          <p className="text-sm text-[#6B6155] dark:text-[#B8AFA2]">
            Join{" "}
            <span className="font-semibold text-[#2B2420] dark:text-white">
              10,000+
            </span>{" "}
            happy home cooks
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewSection;