
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Code } from "lucide-react";
import Navbar from "@/components/Navbar";
import SnippetCard from "@/components/SnippetCard";
import CategoryFilter from "@/components/CategoryFilter";
import CodeEditor from "@/components/CodeEditor";
import CodePreview from "@/components/CodePreview";
import ExportOptions from "@/components/ExportOptions";
import { useSnippets } from "@/hooks/use-snippets";
import { Snippet, SnippetCategory } from "@/lib/snippets";

const Index = () => {
  const { 
    snippets, 
    popularSnippets,
    recentSnippets,
    totalCount,
    activeCategory, 
    setActiveCategory, 
    searchQuery, 
    setSearchQuery,
    isLoading
  } = useSnippets();
  
  const [selectedSnippet, setSelectedSnippet] = useState<Snippet | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("preview");
  
  const handleCategoryChange = (category: SnippetCategory | "all") => {
    setActiveCategory(category);
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const openSnippetDialog = (snippet: Snippet) => {
    setSelectedSnippet(snippet);
    setDialogOpen(true);
  };
  
  const closeSnippetDialog = () => {
    setDialogOpen(false);
    // Reset to preview tab when dialog closes
    setTimeout(() => setActiveTab("preview"), 300);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-secondary/40 to-background">
        <div className="container mx-auto text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-muted px-3 py-1 rounded-full text-sm font-medium mb-6 animate-fade-in">
            <Code className="h-4 w-4" />
            <span>Discover, Edit, and Share HTML Snippets</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in opacity-0" style={{ animationDelay: "0.1s" }}>
            CodeSnipVault
          </h1>
          
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto animate-fade-in opacity-0" style={{ animationDelay: "0.2s" }}>
            A collection of customizable, interactive, and categorized HTML code snippets to enhance your web development workflow.
          </p>
          
          <div className="relative max-w-xl mx-auto animate-fade-in opacity-0" style={{ animationDelay: "0.3s" }}>
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for snippets, components, or code..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10 h-12 rounded-full bg-background border-muted shadow-sm"
            />
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="flex-grow py-12 px-4">
        <div className="container mx-auto">
          {/* Categories */}
          <div className="mb-12 animate-fade-in">
            <h2 className="text-2xl font-semibold mb-4">Categories</h2>
            <CategoryFilter 
              activeCategory={activeCategory} 
              onCategoryChange={handleCategoryChange} 
            />
          </div>
          
          {/* Results Info */}
          <div className="mb-8 flex items-center justify-between animate-fade-in">
            <h2 className="text-2xl font-semibold">
              {activeCategory === "all" ? "All Snippets" : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Snippets`}
              <span className="text-sm font-normal text-muted-foreground ml-2">
                ({totalCount} results)
              </span>
            </h2>
            
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              <span>New Snippet</span>
            </Button>
          </div>
          
          {/* Snippets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 6 }).map((_, index) => (
                <div 
                  key={index} 
                  className="h-80 rounded-lg bg-muted shimmer animate-fade-in"
                  style={{ animationDelay: `${0.05 * index}s` }}
                />
              ))
            ) : snippets.length === 0 ? (
              // No results
              <div className="col-span-3 py-12 text-center">
                <h3 className="text-xl font-medium mb-2">No snippets found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              // Snippets
              snippets.map((snippet, index) => (
                <SnippetCard 
                  key={snippet.id} 
                  snippet={snippet} 
                  onClick={openSnippetDialog}
                />
              ))
            )}
          </div>
          
          {/* Popular Snippets */}
          {popularSnippets.length > 0 && (
            <div className="mb-12 animate-fade-in">
              <h2 className="text-2xl font-semibold mb-6">Popular Snippets</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {popularSnippets.map(snippet => (
                  <SnippetCard 
                    key={snippet.id} 
                    snippet={snippet} 
                    onClick={openSnippetDialog}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Selected Snippet Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl w-[90vw] max-h-[90vh] overflow-hidden flex flex-col">
          {selectedSnippet && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{selectedSnippet.title}</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  {selectedSnippet.description}
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-4 flex-grow overflow-hidden">
                <Tabs 
                  value={activeTab} 
                  onValueChange={setActiveTab}
                  className="h-full flex flex-col"
                >
                  <div className="flex justify-between items-center mb-4">
                    <TabsList>
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                      <TabsTrigger value="html">HTML</TabsTrigger>
                      <TabsTrigger value="css">CSS</TabsTrigger>
                      <TabsTrigger value="js">JavaScript</TabsTrigger>
                    </TabsList>
                    
                    <ExportOptions 
                      htmlCode={selectedSnippet.code.split('<style>')[0].split('</style>')[1] || selectedSnippet.code}
                      cssCode={selectedSnippet.code.includes('<style>') ? 
                        selectedSnippet.code.split('<style>')[1].split('</style>')[0] : ''}
                      jsCode={selectedSnippet.code.includes('<script>') ? 
                        selectedSnippet.code.split('<script>')[1].split('</script>')[0] : ''}
                    />
                  </div>
                  
                  <div className="flex-grow overflow-hidden min-h-[400px]">
                    <TabsContent value="preview" className="h-full m-0">
                      <CodePreview 
                        htmlCode={selectedSnippet.code.split('<style>')[0].split('</style>')[1] || selectedSnippet.code}
                        cssCode={selectedSnippet.code.includes('<style>') ? 
                          selectedSnippet.code.split('<style>')[1].split('</style>')[0] : ''}
                        jsCode={selectedSnippet.code.includes('<script>') ? 
                          selectedSnippet.code.split('<script>')[1].split('</script>')[0] : ''}
                      />
                    </TabsContent>
                    
                    <TabsContent value="html" className="h-full m-0">
                      <CodeEditor 
                        code={selectedSnippet.code.split('<style>')[0].split('</style>')[1] || selectedSnippet.code}
                        language="html"
                        readOnly
                      />
                    </TabsContent>
                    
                    <TabsContent value="css" className="h-full m-0">
                      <CodeEditor 
                        code={selectedSnippet.code.includes('<style>') ? 
                          selectedSnippet.code.split('<style>')[1].split('</style>')[0] : ''}
                        language="css"
                        readOnly
                      />
                    </TabsContent>
                    
                    <TabsContent value="js" className="h-full m-0">
                      <CodeEditor 
                        code={selectedSnippet.code.includes('<script>') ? 
                          selectedSnippet.code.split('<script>')[1].split('</script>')[0] : ''}
                        language="javascript"
                        readOnly
                      />
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
              
              <DialogFooter className="flex items-center justify-between gap-2 mt-4">
                <div className="text-sm text-muted-foreground">
                  Created by {selectedSnippet.authorName}
                </div>
                <Button onClick={closeSnippetDialog}>Close</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
