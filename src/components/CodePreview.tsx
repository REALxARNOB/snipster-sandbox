
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, RefreshCw } from "lucide-react";

interface CodePreviewProps {
  htmlCode: string;
  cssCode?: string;
  jsCode?: string;
}

export default function CodePreview({ htmlCode, cssCode = "", jsCode = "" }: CodePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const renderPreview = () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const iframe = iframeRef.current;
      if (!iframe) return;
      
      const document = iframe.contentDocument || iframe.contentWindow?.document;
      if (!document) return;
      
      document.open();
      document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <style>${cssCode}</style>
          </head>
          <body>
            ${htmlCode}
            <script>${jsCode}</script>
          </body>
        </html>
      `);
      document.close();
      
      // Handle iframe load event
      iframe.onload = () => {
        setIsLoading(false);
      };
      
      // Safety timeout in case onload doesn't fire
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setError("Error rendering preview. Please check your code.");
      setIsLoading(false);
      console.error("Preview rendering error:", err);
    }
  };
  
  // Initial render and when code changes
  useEffect(() => {
    renderPreview();
  }, [htmlCode, cssCode, jsCode]);
  
  return (
    <div className="flex flex-col h-full rounded-lg overflow-hidden border border-border">
      <div className="flex items-center justify-between bg-muted p-2 border-b border-border">
        <h3 className="text-sm font-medium">Preview</h3>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={renderPreview}
          title="Refresh preview"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="relative flex-grow bg-white dark:bg-gray-800">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
            <div className="animate-spin h-6 w-6 rounded-full border-2 border-primary border-t-transparent"></div>
          </div>
        )}
        
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
            <div className="text-destructive text-center p-4">
              <p>{error}</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={renderPreview}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </div>
          </div>
        )}
        
        <iframe
          ref={iframeRef}
          className="w-full h-full"
          title="Code Preview"
          sandbox="allow-scripts"
        ></iframe>
      </div>
    </div>
  );
}
