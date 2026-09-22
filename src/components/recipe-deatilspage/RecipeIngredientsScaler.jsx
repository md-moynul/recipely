"use client";

import { useState } from "react";
import { Plus, Minus, ArrowRotateLeft, Check, Person } from "@gravity-ui/icons";

// Helper: Convert decimal to a clean cooking fraction string
function formatCookingFraction(val) {
  if (val <= 0) return "0";
  
  // If whole number
  if (Math.abs(val - Math.round(val)) < 0.05) {
    return Math.round(val).toString();
  }

  const whole = Math.floor(val);
  const frac = val - whole;

  const fractionMap = [
    { dec: 0.125, str: "1/8" },
    { dec: 0.25, str: "1/4" },
    { dec: 0.333, str: "1/3" },
    { dec: 0.375, str: "3/8" },
    { dec: 0.5, str: "1/2" },
    { dec: 0.625, str: "5/8" },
    { dec: 0.666, str: "2/3" },
    { dec: 0.75, str: "3/4" },
    { dec: 0.875, str: "7/8" },
  ];

  let closestFrac = fractionMap[0];
  let minDiff = Math.abs(frac - fractionMap[0].dec);

  for (const item of fractionMap) {
    const diff = Math.abs(frac - item.dec);
    if (diff < minDiff) {
      minDiff = diff;
      closestFrac = item;
    }
  }

  if (minDiff < 0.07) {
    return whole > 0 ? `${whole} ${closestFrac.str}` : closestFrac.str;
  }

  return (Math.round(val * 10) / 10).toString();
}

// Helper: Scale an ingredient line text
function scaleIngredient(text, scaleFactor) {
  if (!text || scaleFactor === 1) return text;

  // Regex 1: Mixed fractions like "1 1/2" or "2 1/4"
  const mixedRegex = /^(\d+)\s+(\d+)\/(\d+)(.*)$/;
  const mixedMatch = text.match(mixedRegex);
  if (mixedMatch) {
    const whole = parseFloat(mixedMatch[1]);
    const num = parseFloat(mixedMatch[2]);
    const den = parseFloat(mixedMatch[3]);
    const originalVal = whole + num / den;
    const scaledVal = originalVal * scaleFactor;
    return `${formatCookingFraction(scaledVal)}${mixedMatch[4]}`;
  }

  // Regex 2: Simple fractions like "1/2" or "3/4"
  const fracRegex = /^(\d+)\/(\d+)(.*)$/;
  const fracMatch = text.match(fracRegex);
  if (fracMatch) {
    const num = parseFloat(fracMatch[1]);
    const den = parseFloat(fracMatch[2]);
    const originalVal = num / den;
    const scaledVal = originalVal * scaleFactor;
    return `${formatCookingFraction(scaledVal)}${fracMatch[3]}`;
  }

  // Regex 3: Ranges like "10-12" or "2-3"
  const rangeRegex = /^(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)(.*)$/;
  const rangeMatch = text.match(rangeRegex);
  if (rangeMatch) {
    const start = parseFloat(rangeMatch[1]) * scaleFactor;
    const end = parseFloat(rangeMatch[2]) * scaleFactor;
    return `${formatCookingFraction(start)}-${formatCookingFraction(end)}${rangeMatch[3]}`;
  }

  // Regex 4: Leading decimal or whole number like "2 cups" or "1.5 tbsp" or "50g"
  const numRegex = /^(\d+(?:\.\d+)?)([a-zA-Z]*)(.*)$/;
  const numMatch = text.match(numRegex);
  if (numMatch) {
    const val = parseFloat(numMatch[1]);
    const unit = numMatch[2];
    const rest = numMatch[3];
    const scaledVal = val * scaleFactor;

    if (unit === "g" || unit === "ml" || val >= 20) {
      return `${Math.round(scaledVal)}${unit}${rest}`;
    }
    return `${formatCookingFraction(scaledVal)}${unit}${rest}`;
  }

  return text;
}

export default function RecipeIngredientsScaler({
  ingredients = [],
  baseServings = 4,
}) {
  const [servings, setServings] = useState(baseServings);
  const [checkedItems, setCheckedItems] = useState({});

  const scaleFactor = servings / baseServings;

  const handleToggleCheck = (index) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleIncrement = () => {
    setServings((prev) => Math.min(24, prev + 1));
  };

  const handleDecrement = () => {
    setServings((prev) => Math.max(1, prev - 1));
  };

  const handlePreset = (multiplier) => {
    setServings(Math.max(1, Math.round(baseServings * multiplier)));
  };

  const handleReset = () => {
    setServings(baseServings);
    setCheckedItems({});
  };

  return (
    <div className="space-y-4">
      {/* Header & Clear Serving Scaler Bar */}
      <div className="flex flex-col gap-3 rounded-2xl bg-[#FFF9F2] p-4 border border-[#EAE0D3] sm:flex-row sm:items-center sm:justify-between dark:bg-[#1A1714] dark:border-[#3A332A]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-[#2B2420] dark:text-[#F4EDE4]">
              Ingredients
            </h2>
            <span className="rounded-full bg-[#E85D3D]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#E85D3D] dark:bg-[#E85D3D]/20">
              {ingredients?.length || 0} items
            </span>
          </div>
          <p className="mt-0.5 text-xs text-[#8C8276] dark:text-[#A89F93]">
            Adjust servings to automatically calculate ingredient amounts
          </p>
        </div>

        {/* Clear and Explicit Serving Adjustment Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Servings Stepper */}
          <div className="flex items-center gap-1.5 rounded-xl border border-[#EAE0D3] bg-white p-1 shadow-2xs dark:border-[#3A332A] dark:bg-[#252019]">
            <span className="pl-2 text-xs font-semibold text-[#6B6155] dark:text-[#B8AFA2] flex items-center gap-1">
              <Person width={13} height={13} className="text-[#E85D3D]" />
              Servings:
            </span>

            <button
              type="button"
              onClick={handleDecrement}
              disabled={servings <= 1}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-stone-600 hover:bg-[#FBF1E6] hover:text-[#E85D3D] disabled:opacity-30 dark:text-stone-300 dark:hover:bg-[#1A1714] cursor-pointer transition-colors"
              title="Decrease servings"
              aria-label="Decrease servings"
            >
              <Minus width={12} height={12} />
            </button>

            <span className="min-w-[2rem] text-center text-xs font-bold text-[#2B2420] dark:text-[#F4EDE4]">
              {servings}
            </span>

            <button
              type="button"
              onClick={handleIncrement}
              disabled={servings >= 24}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-stone-600 hover:bg-[#FBF1E6] hover:text-[#E85D3D] disabled:opacity-30 dark:text-stone-300 dark:hover:bg-[#1A1714] cursor-pointer transition-colors"
              title="Increase servings"
              aria-label="Increase servings"
            >
              <Plus width={12} height={12} />
            </button>
          </div>

          {/* Quick Multiply Scale Options */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => handlePreset(0.5)}
              className={`rounded-xl px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                scaleFactor === 0.5
                  ? "bg-[#E85D3D] text-white shadow-2xs"
                  : "border border-[#EAE0D3] bg-white text-[#6B6155] hover:border-[#E85D3D] hover:text-[#E85D3D] dark:border-[#3A332A] dark:bg-[#252019] dark:text-[#B8AFA2]"
              }`}
              title="Scale to Half (0.5x)"
            >
              0.5x (Half)
            </button>
            <button
              type="button"
              onClick={() => handlePreset(1)}
              className={`rounded-xl px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                scaleFactor === 1
                  ? "bg-[#E85D3D] text-white shadow-2xs"
                  : "border border-[#EAE0D3] bg-white text-[#6B6155] hover:border-[#E85D3D] hover:text-[#E85D3D] dark:border-[#3A332A] dark:bg-[#252019] dark:text-[#B8AFA2]"
              }`}
              title="Reset to Original (1x)"
            >
              1x (Original)
            </button>
            <button
              type="button"
              onClick={() => handlePreset(2)}
              className={`rounded-xl px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                scaleFactor === 2
                  ? "bg-[#E85D3D] text-white shadow-2xs"
                  : "border border-[#EAE0D3] bg-white text-[#6B6155] hover:border-[#E85D3D] hover:text-[#E85D3D] dark:border-[#3A332A] dark:bg-[#252019] dark:text-[#B8AFA2]"
              }`}
              title="Scale to Double (2x)"
            >
              2x (Double)
            </button>

            {servings !== baseServings && (
              <button
                type="button"
                onClick={handleReset}
                title="Reset back to default servings"
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#EAE0D3] bg-white text-[#8C8276] hover:text-[#E85D3D] hover:border-[#E85D3D] dark:border-[#3A332A] dark:bg-[#252019] cursor-pointer transition-colors"
              >
                <ArrowRotateLeft width={13} height={13} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Checklist Note */}
      <div className="flex items-center justify-between px-1 text-xs text-[#9C9388]">
        <span>Tap an ingredient to check it off as you cook</span>
        {scaleFactor !== 1 && (
          <span className="font-semibold text-[#E85D3D]">
            Scaled to {servings} servings ({scaleFactor}x)
          </span>
        )}
      </div>

      {/* Interactive Ingredients Checklist */}
      <ul className="space-y-2 pt-1">
        {ingredients?.map((ingredient, idx) => {
          const isChecked = !!checkedItems[idx];
          const scaledText = scaleIngredient(ingredient, scaleFactor);

          return (
            <li
              key={idx}
              onClick={() => handleToggleCheck(idx)}
              className={`group flex items-center gap-3 rounded-2xl border p-3 text-sm transition-all cursor-pointer select-none ${
                isChecked
                  ? "border-transparent bg-stone-100/60 text-stone-400 line-through dark:bg-stone-900/30 dark:text-stone-500"
                  : "border-[#EAE0D3]/60 bg-white hover:border-[#E85D3D]/50 hover:bg-[#FFF9F2] text-[#2B2420] dark:border-[#3A332A]/60 dark:bg-[#252019] dark:text-[#F4EDE4] dark:hover:bg-[#1A1714]"
              }`}
            >
              {/* Checkbox */}
              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border transition-all ${
                  isChecked
                    ? "border-emerald-500 bg-emerald-500 text-white"
                    : "border-stone-300 group-hover:border-[#E85D3D] dark:border-stone-600 bg-white dark:bg-[#1A1714]"
                }`}
              >
                {isChecked && <Check width={12} height={12} />}
              </div>

              {/* Scaled Ingredient Text */}
              <span className="flex-1 font-medium leading-snug">
                {scaledText}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
