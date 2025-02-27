
import { useState, useEffect } from "react";
import { 
  Snippet, 
  SnippetCategory, 
  mockSnippets, 
  getSnippetsByCategory, 
  searchSnippets 
} from "@/lib/snippets";

export function useSnippets() {
  const [snippets, setSnippets] = useState<Snippet[]>(mockSnippets);
  const [activeCategory, setActiveCategory] = useState<SnippetCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Filter snippets when category or search query changes
  useEffect(() => {
    setLoading(true);
    
    // Small delay to simulate loading for better UX
    const timer = setTimeout(() => {
      let filteredSnippets: Snippet[];
      
      // First filter by search term if present
      if (searchQuery.trim()) {
        filteredSnippets = searchSnippets(searchQuery);
      } else {
        filteredSnippets = [...mockSnippets];
      }
      
      // Then filter by category if not 'all'
      if (activeCategory !== "all") {
        filteredSnippets = filteredSnippets.filter(
          snippet => snippet.category === activeCategory
        );
      }
      
      setSnippets(filteredSnippets);
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [activeCategory, searchQuery]);

  // Sort snippets by likes (most popular first)
  const sortedByPopularity = [...snippets].sort((a, b) => b.likes - a.likes);
  
  // Sort snippets by date (newest first)
  const sortedByDate = [...snippets].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return {
    snippets,
    popularSnippets: sortedByPopularity.slice(0, 5),
    recentSnippets: sortedByDate.slice(0, 5),
    totalCount: snippets.length,
    isLoading: loading,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
  };
}
