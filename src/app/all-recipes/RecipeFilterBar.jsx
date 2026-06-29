"use client";

import { Select, ListBox, Label, InputGroup } from "@heroui/react";
import { Magnifier } from "@gravity-ui/icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = ["All", "Breakfast", "Lunch", "Dinner", "Dessert", "Snack", "Appetizer", "Beverage"];
const CUISINES = ["All", "Bengali", "Indian", "Italian", "Chinese", "Mexican", "Thai", "Continental"];
const DIFFICULTIES = ["All", "Easy", "Medium", "Hard"];

const fieldClass =
  "rounded-xl border-[#EAE0D3] bg-[#FFF9F2] text-[#2B2420] placeholder:text-[#9C9388] focus-visible:border-[#E85D3D] focus-visible:ring-[#E85D3D]/20 dark:border-[#3A332A] dark:bg-[#1A1714] dark:text-[#F4EDE4]";

function MultiSelectFilter({ label, placeholder, options, value, onChange }) {
  return (
    <Select
      placeholder={placeholder}
      defaultValue={value}
      onSelectionChange={(keys) => onChange(keys)}
      className="flex flex-col gap-1.5"
    >
      <Label className="text-sm font-medium text-[#2B2420] dark:text-[#F4EDE4]">
        {label}
      </Label>
      <Select.Trigger >
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover className="bg-white dark:bg-[#252019]">
        <ListBox>
          {options.map((opt) => (
            <ListBox.Item
              key={opt}
              id={opt}
            >
              <Label>{opt}</Label>
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
}

export default function RecipeFilterBar({ paramsObj }) {
  
  const [searchQuery, setSearchQuery] = useState(paramsObj.search);
  const [category, setCategory] = useState(paramsObj.category || "All");
  const [cuisineType, setCuisineType] = useState(paramsObj.cuisineType || "All");
  const [difficultyLevel, setDifficultyLevel] = useState(paramsObj.difficultyLevel || "All");
  const router = useRouter();
  useEffect(() => {
    const sp = new URLSearchParams();
    if (category !== 'All') sp.set("category", category);
    if (cuisineType !== 'All') sp.set("cuisineType", cuisineType);
    if (difficultyLevel !== 'All') sp.set("difficultyLevel", difficultyLevel);
    if (searchQuery) sp.set("search", searchQuery);

    const path = `/all-recipes?${sp.toString()}`;
    router.push(path);
  }, [searchQuery, category, cuisineType, difficultyLevel, router]);

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 rounded-2xl border border-[#EAE0D3] bg-white p-4 dark:border-[#3A332A] dark:bg-[#252019] sm:grid-cols-2 lg:grid-cols-4">
      <div className="flex flex-col gap-1.5 lg:col-span-1">
        <Label className="text-sm font-medium text-[#2B2420] dark:text-[#F4EDE4]">
          Search
        </Label>
        <InputGroup>
          <InputGroup.Prefix className="">
            <Magnifier width={16} height={16} />
          </InputGroup.Prefix>
          <InputGroup.Input
            placeholder="Search recipes…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
      </div>

      <MultiSelectFilter
        label="Category"
        placeholder="All categories"
        options={CATEGORIES}
        value={category}
        onChange={setCategory}
      />

      <MultiSelectFilter
        label="Cuisine"
        placeholder="All cuisines"
        options={CUISINES}
        value={cuisineType}
        onChange={setCuisineType}
      />

      <MultiSelectFilter
        label="Difficulty"
        placeholder="Any difficulty"
        options={DIFFICULTIES}
        value={difficultyLevel}
        onChange={setDifficultyLevel}
      />
    </div>
  );
}