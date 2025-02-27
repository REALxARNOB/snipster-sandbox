
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, Copy, DownloadIcon, ExternalLink, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ExportOptionsProps {
  htmlCode: string;
  cssCode?: string;
  jsCode?: string;
}

export default function ExportOptions({ 
  htmlCode, 
  cssCode = "", 
  jsCode = "" 
}: ExportOptionsProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  // Generate a single HTML file with embedded CSS and JS
  const getFullHtml = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CodeSnipVault Snippet</title>
  <style>
${cssCode}
  </style>
</head>
<body>
${htmlCode}
  <script>
${jsCode}
  </script>
</body>
</html>`;
  };
  
  const copyFullHtml = () => {
    navigator.clipboard.writeText(getFullHtml());
    setCopied(true);
    
    toast({
      title: "Copied to clipboard",
      description: "The full HTML code has been copied to your clipboard.",
      duration: 3000,
    });
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  const downloadAsHtml = () => {
    const blob = new Blob([getFullHtml()], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'snippet.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "File downloaded",
      description: "snippet.html has been downloaded to your device.",
      duration: 3000,
    });
  };
  
  const getEmbedCode = () => {
    // Create a simplified version for embedding
    return `<div style="position: relative; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
  ${htmlCode}
  <style>${cssCode}</style>
  <script>${jsCode}</script>
  <div style="position: absolute; bottom: 5px; right: 10px; font-size: 12px; opacity: 0.7;">
    <a href="https://codesnipvault.com" target="_blank" style="text-decoration: none; color: #888;">
      Powered by CodeSnipVault
    </a>
  </div>
</div>`;
  };
  
  const copyEmbedCode = () => {
    navigator.clipboard.writeText(getEmbedCode());
    
    toast({
      title: "Embed code copied",
      description: "The embed code has been copied to your clipboard.",
      duration: 3000,
    });
  };
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
        >
          <Share2 className="h-4 w-4" />
          <span>Export</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="end">
        <div className="flex flex-col p-1">
          <h3 className="text-sm font-medium p-2 border-b">Export Options</h3>
          
          <Button 
            variant="ghost" 
            className="flex items-center justify-start gap-2 h-10 px-2 text-sm"
            onClick={copyFullHtml}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span>Copy Full HTML</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="flex items-center justify-start gap-2 h-10 px-2 text-sm"
            onClick={downloadAsHtml}
          >
            <DownloadIcon className="h-4 w-4" />
            <span>Download as HTML</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="flex items-center justify-start gap-2 h-10 px-2 text-sm"
            onClick={copyEmbedCode}
          >
            <ExternalLink className="h-4 w-4" />
            <span>Copy Embed Code</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
