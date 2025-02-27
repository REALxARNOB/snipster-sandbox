
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Copy, 
  DownloadIcon, 
  ClipboardCheck,
  Maximize2,
  Minimize2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CodeEditorProps {
  code: string;
  language: string;
  onChange?: (code: string) => void;
  readOnly?: boolean;
}

export default function CodeEditor({ 
  code: initialCode, 
  language, 
  onChange,
  readOnly = false
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);
  
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    onChange?.(newCode);
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    
    toast({
      title: "Copied to clipboard",
      description: "The code snippet has been copied to your clipboard.",
      duration: 3000,
    });
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  const downloadAsFile = () => {
    const fileExtension = language === 'javascript' ? 'js' : language;
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `snippet.${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "File downloaded",
      description: `snippet.${fileExtension} has been downloaded to your device.`,
      duration: 3000,
    });
  };
  
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`code-editor relative rounded-lg overflow-hidden transition-all duration-300 ${
      isFullscreen ? 'fixed inset-4 z-50' : ''
    }`}>
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
        <div className="flex items-center">
          <span className="text-gray-400 text-sm font-mono uppercase">{language}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-700"
            onClick={copyToClipboard}
          >
            {copied ? <ClipboardCheck className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-700"
            onClick={downloadAsFile}
          >
            <DownloadIcon className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-700"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      <textarea
        value={code}
        onChange={handleCodeChange}
        className="font-mono text-sm w-full h-[300px] bg-gray-900 text-gray-100 p-4 outline-none resize-none"
        spellCheck="false"
        readOnly={readOnly}
        style={{ tabSize: 2 }}
      />
    </div>
  );
}
