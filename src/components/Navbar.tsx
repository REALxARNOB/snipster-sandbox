
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Code, Plus } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled 
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Code className="h-6 w-6 text-primary" />
          <Link to="/" className="font-medium text-lg">
            CodeSnipVault
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            className="interactive-hover"
            onClick={() => console.log("Community snippets")}
          >
            Community
          </Button>
          
          <Button 
            variant="default" 
            className="interactive-hover flex items-center gap-1"
            onClick={() => console.log("Create new snippet")}
          >
            <Plus className="h-4 w-4" />
            <span>New Snippet</span>
          </Button>
          
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
