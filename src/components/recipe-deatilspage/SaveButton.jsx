"use client";

import { useState } from "react";
import { ToggleButton } from "@heroui/react";
import { Bookmark } from "@gravity-ui/icons";
import { addFavorite } from "@/lib/action/recipe";

export default function SaveButton({ initialIsSaved = false, recipeId,userId ,userEmail}) {
  const [isSaved, setIsSaved] = useState(initialIsSaved);

  const handleChange = async(selected) => {
    setIsSaved(selected);
    const purseData = {
      recipeId,
      userId,
      userEmail,
      addedAt: new Date()

    }
    const result = selected && await addFavorite(purseData) ;
    console.log(result);
    
    // TODO: call your save/unsave API/server action here, e.g.
    // selected ? await addFavorite(recipeId) : await removeFavorite(recipeId);
  };

  return (
    <ToggleButton
      isSelected={isSaved}
      onChange={handleChange}
      className="flex items-center gap-1.5 rounded-full border border-[#EAE0D3] px-4 py-2 text-sm font-medium text-[#6B6155] transition-all data-[selected=true]:border-[#F4A340]/40 data-[selected=true]:bg-[#F4A340]/10 data-[selected=true]:text-[#B5781F] dark:border-[#3A332A] dark:text-[#B8AFA2]"
    >
      <Bookmark width={16} height={16} className={isSaved ? "fill-current" : ""} />
      <span>{isSaved ? "Saved" : "Save Recipe"}</span>
    </ToggleButton>
  );
}