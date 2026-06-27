"use client";

import { motion } from "motion/react";
import {
  Magnifier,
  Heart,
  GraduationCap,
  ShieldCheck,
  Layers,
  Thunderbolt,
} from "@gravity-ui/icons";

const STEPS = [
  {
    icon: Magnifier,
    title: "Discover",
    description:
      "Browse recipes from home cooks around the world, filtered by category, cuisine, or what's in your fridge.",
  },
  {
    icon: Heart,
    title: "Save & Like",
    description:
      "Favorite the recipes you love, like the ones that inspire you, and build a collection that's truly yours.",
  },
  {
    icon: GraduationCap,
    title: "Share Your Own",
    description:
      "Publish your own recipes with photos and step-by-step instructions for the community to enjoy.",
  },
];

const REASONS = [
  {
    icon: Layers,
    title: "One place for everything",
    description: "No more scattered bookmarks or screenshots — every recipe lives in one organized space.",
  },
  {
    icon: ShieldCheck,
    title: "Built on trust",
    description: "Community reporting and moderation keep the platform genuine and spam-free.",
  },
  {
    icon: Thunderbolt,
    title: "Fast, simple, focused",
    description: "No clutter, no ads competing for attention — just recipes, clearly presented.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className=" px-6 py-20 ">
      <div className="mx-auto max-w-6xl">
        {/* How to use */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-wide text-[#E85D3D]">
            How it works
          </span>
          <h2 className="mt-2 text-2xl font-semibold text-[#2B2420] sm:text-3xl dark:text-[#F4EDE4]">
            Cooking inspiration, in three steps
          </h2>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl border border-[#EAE0D3] bg-white p-6 dark:border-[#3A332A] dark:bg-[#252019]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E85D3D]/10">
                  <Icon width={20} height={20} className="text-[#E85D3D]" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
                  {i + 1}. {step.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#6B6155] dark:text-[#B8AFA2]">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Why RecipeHub */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mt-20 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-wide text-[#E85D3D]">
            Why RecipeHub
          </span>
          <h2 className="mt-2 text-2xl font-semibold text-[#2B2420] sm:text-3xl dark:text-[#F4EDE4]">
            Made for people who actually cook
          </h2>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {REASONS.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FBF1E6] dark:bg-[#2A251E]">
                  <Icon width={20} height={20} className="text-[#2B2420] dark:text-[#F4EDE4]" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
                  {reason.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#6B6155] dark:text-[#B8AFA2]">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}