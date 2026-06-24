"use client";

import { useState } from "react";
import { ToggleButton } from "@heroui/react";
import { Heart } from "@gravity-ui/icons";

export default function LikeButton({ initialLikes = 0, recipeId }) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleChange = (selected) => {
    setIsLiked(selected);
    setLikes((prev) => (selected ? prev + 1 : prev - 1));

    // TODO: call your like/unlike API/server action here, e.g.
    // selected ? await likeRecipe(recipeId) : await unlikeRecipe(recipeId);
  };

  return (
    <ToggleButton
      isSelected={isLiked}
      onChange={handleChange}
      className="flex items-center gap-1.5 rounded-full border border-[#EAE0D3] px-4 py-2 text-sm font-medium text-[#6B6155] transition-all data-[selected=true]:border-[#D64545]/30 data-[selected=true]:bg-[#D64545]/10 data-[selected=true]:text-[#D64545] dark:border-[#3A332A] dark:text-[#B8AFA2]"
    >
      <Heart width={16} height={16} className={isLiked ? "fill-current" : ""} />
      <span>{likes}</span>
    </ToggleButton>
  );
}