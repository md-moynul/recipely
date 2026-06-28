"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "@gravity-ui/icons";
import { Switch } from "@heroui/react";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // next-themes reads localStorage synchronously on the client, so
  // `theme` can disagree with the server on the very first render —
  // not just be `undefined`. The only reliable fix is to render a
  // static placeholder until after mount, then swap to the real
  // Switch. This is next-themes' own documented pattern.
  useEffect(() => {
    setMounted(true);
    
  }, []);

  if (!mounted) {
    return (
      <div
        suppressHydrationWarning
        className="h-7 w-14 rounded-full bg-[#EAE0D3] dark:bg-[#3A332A]"
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <Switch
      isSelected={isDark}
      onChange={(selected) => setTheme(selected ? "dark" : "light")}
      aria-label="Toggle dark mode"
      size="lg"
    >
      <Switch.Content>
        <Switch.Control className={isDark ? "bg-[#E85D3D]" : "bg-[#EAE0D3]"}>
          <Switch.Thumb>
            <Switch.Icon>
              {isDark ? (
                <Moon className="size-3 text-inherit opacity-100" />
              ) : (
                <Sun className="size-3 text-inherit opacity-90" />
              )}
            </Switch.Icon>
          </Switch.Thumb>
        </Switch.Control>
      </Switch.Content>
    </Switch>
  );
}