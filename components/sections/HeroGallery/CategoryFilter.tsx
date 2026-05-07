"use client";

import { Icon } from "@iconify/react";
import { capitalize } from "@/lib/utils";

const CATEGORY_ICONS: Record<string, string> = {
  all: "solar:apps-linear",
  nature: "pajamas:nature",
  abstract: "gg:abstract",
  tech: "solar:cpu-linear",
  enterprise: "mdi:company",
};

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const allCategories = ["all", ...categories];

  return (
    <nav
      className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none"
      aria-label="Filter by category"
    >
      {allCategories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all duration-150 ${
            activeCategory === cat
              ? "bg-white text-black"
              : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
          }`}
        >
          <Icon
            icon={CATEGORY_ICONS[cat] ?? "solar:video-library-linear"}
            width="13"
          />
          {capitalize(cat)}
        </button>
      ))}
    </nav>
  );
}
