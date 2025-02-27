
import React from "react";
import { Button } from "@/components/ui/button";
import { SnippetCategory } from "@/lib/snippets";
import { getCategoriesWithCount } from "@/lib/snippets";

interface CategoryFilterProps {
  activeCategory: SnippetCategory | "all";
  onCategoryChange: (category: SnippetCategory | "all") => void;
}

export default function CategoryFilter({
  activeCategory,
  onCategoryChange
}: CategoryFilterProps) {
  const categories = getCategoriesWithCount();
  
  // Add "all" category with total count
  const allCategories = [
    { 
      category: "all" as const, 
      count: categories.reduce((sum, cat) => sum + cat.count, 0) 
    },
    ...categories
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {allCategories.map(({ category, count }) => (
        <Button
          key={category}
          onClick={() => onCategoryChange(category)}
          variant={activeCategory === category ? "default" : "outline"}
          className={`
            flex items-center gap-2 py-1 px-3 h-auto text-sm font-medium 
            transition-all duration-200 hover:shadow-sm
            ${activeCategory === category ? 'shadow-sm' : ''}
          `}
        >
          <span className="capitalize">{category}</span>
          <span className="inline-flex items-center justify-center rounded-full bg-muted px-2 py-0.5 text-xs">
            {count}
          </span>
        </Button>
      ))}
    </div>
  );
}
