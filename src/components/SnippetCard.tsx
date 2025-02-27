
import { useState } from "react";
import { Snippet } from "@/lib/snippets";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Eye, Clock, Copy, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SnippetCardProps {
  snippet: Snippet;
  onClick: (snippet: Snippet) => void;
}

export default function SnippetCard({ snippet, onClick }: SnippetCardProps) {
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);
  
  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(snippet.code);
    toast({
      title: "Copied to clipboard",
      description: "The code snippet has been copied to your clipboard.",
      duration: 3000,
    });
  };
  
  // Format the date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };
  
  // Get a preview of the code (first few lines)
  const codePreview = snippet.code.split('\n').slice(0, 3).join('\n') + 
    (snippet.code.split('\n').length > 3 ? '\n...' : '');

  return (
    <Card 
      className="overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer h-full flex flex-col glass-card animate-fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(snippet)}
    >
      <CardHeader className="p-4 pb-0 flex flex-col space-y-2">
        <div className="flex justify-between items-start">
          <Badge 
            variant="outline" 
            className="capitalize px-2 py-0 text-xs" 
          >
            {snippet.category}
          </Badge>
          <Badge 
            variant="secondary" 
            className="capitalize px-2 py-0 text-xs"
          >
            {snippet.language}
          </Badge>
        </div>
        <h3 className="font-semibold text-lg leading-tight mt-2">{snippet.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{snippet.description}</p>
      </CardHeader>
      
      <CardContent className="p-4 flex-grow">
        <div className="code-container text-xs h-32 overflow-hidden relative">
          <pre>
            <code>{codePreview}</code>
          </pre>
          
          {isHovered && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
              <Button 
                variant="default" 
                size="sm" 
                className="font-medium"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="flex items-center text-xs text-muted-foreground">
            <Heart className="h-3 w-3 mr-1 text-red-500" />
            {snippet.likes}
          </span>
          <span className="flex items-center text-xs text-muted-foreground">
            <Eye className="h-3 w-3 mr-1" />
            {snippet.views}
          </span>
          <span className="flex items-center text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            {formatDate(snippet.createdAt)}
          </span>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={handleCopyCode}
          title="Copy code"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
