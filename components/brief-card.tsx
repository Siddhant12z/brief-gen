"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { ArrowRight, Loader2 } from "lucide-react"
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

interface BriefCardProps {
  category: string
  prompt: string
  isFullBriefVisible: boolean
  onShowFullBrief: () => void
  isSubscriptionRequired?: boolean
  isGenerating?: boolean
  onNextBrief?: () => void
}

// Create a simple container with glassmorphic styling
function GlassmorphicContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="backdrop-blur-xl bg-gradient-to-br from-purple-900/40 to-fuchsia-900/40 
                   border border-purple-500/20 rounded-2xl shadow-lg 
                   transition-all duration-500 group-hover:shadow-[0_0_25px_rgba(147,51,234,0.3)]">
      {children}
    </div>
  );
}

// Custom components for markdown rendering
const MarkdownComponents = {
  h1: ({ node, ...props }: any) => (
    <h1 className="text-2xl font-bold text-purple-300 mt-4 mb-2" {...props} />
  ),
  h2: ({ node, ...props }: any) => (
    <h2 className="text-xl font-semibold text-purple-400 mt-4 mb-2" {...props} />
  ),
  h3: ({ node, ...props }: any) => (
    <h3 className="text-lg font-semibold text-purple-400 mt-3 mb-2" {...props} />
  ),
  p: ({ node, ...props }: any) => (
    <p className="my-2 text-purple-100/80" {...props} />
  ),
  ul: ({ node, ...props }: any) => (
    <ul className="list-disc pl-5 my-2 text-purple-100/80" {...props} />
  ),
  ol: ({ node, ...props }: any) => (
    <ol className="list-decimal pl-5 my-2 text-purple-100/80" {...props} />
  ),
  li: ({ node, ...props }: any) => (
    <li className="my-1" {...props} />
  ),
  a: ({ node, ...props }: any) => (
    <a className="text-purple-400 hover:text-purple-300 underline" {...props} />
  ),
};

// Custom components for short preview with white text
const ShortPreviewComponents = {
  h1: ({ node, ...props }: any) => (
    <h1 className="text-2xl font-bold text-white mb-2" {...props} />
  ),
  p: ({ node, ...props }: any) => (
    <p className="text-white" {...props} />
  ),
};

export default function BriefCard({ 
  category, 
  prompt,
  isFullBriefVisible,
  onShowFullBrief,
  isSubscriptionRequired = false,
  isGenerating = false,
  onNextBrief
}: BriefCardProps) {
  // Extract title and first paragraph for preview
  const getPreviewContent = () => {
    // Get first heading (title) and first paragraph
    const lines = prompt.split('\n');
    
    // Find the title (first h1)
    const titleLine = lines.find(line => line.startsWith('# '));
    const title = titleLine ? titleLine.substring(2) : '';
    
    // Find the Project Vision section
    let visionContent = '';
    let captureVision = false;
    
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('## Project Vision')) {
        captureVision = true;
        continue;
      } else if (captureVision && lines[i].startsWith('## ')) {
        break;
      }
      
      if (captureVision && lines[i].trim() !== '') {
        visionContent += lines[i] + ' ';
      }
    }
    
    // Truncate vision content if needed
    const truncatedVision = visionContent.length > 150 
      ? visionContent.substring(0, 150) + '...' 
      : visionContent;
    
    return `# ${title}\n\n${truncatedVision}`;
  };
  
  return (
    <GlassmorphicContainer>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-purple-300">
            {category.charAt(0).toUpperCase() + category.slice(1)} Design Brief
          </h2>
          
          <span className="bg-purple-500/30 text-purple-200 text-xs px-2.5 py-0.5 rounded-full">
            Free Preview
          </span>
        </div>
        
        <Separator className="mb-4 bg-purple-500/20" />
        
        <div className="mb-6 leading-relaxed max-w-none">
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center py-10">
              <Loader2 className="h-10 w-10 text-purple-400 animate-spin mb-4" />
              <p>Generating new brief...</p>
            </div>
          ) : (
            isFullBriefVisible ? (
              <ReactMarkdown 
                rehypePlugins={[rehypeRaw]}
                components={MarkdownComponents}
              >
                {prompt}
              </ReactMarkdown>
            ) : (
              <ReactMarkdown 
                rehypePlugins={[rehypeRaw]}
                components={ShortPreviewComponents}
              >
                {getPreviewContent()}
              </ReactMarkdown>
            )
          )}
        </div>
        
        {!isGenerating && (
          <div className="flex justify-between items-center">
            <Button
              disabled={isFullBriefVisible || isSubscriptionRequired}
              onClick={onShowFullBrief}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {isSubscriptionRequired ? "Subscribe to View" : "Show Full Brief"}
            </Button>
            
            <Button
              variant="outline"
              onClick={onNextBrief}
              className="border-purple-500/30 text-black hover:bg-purple-500/10"
            >
              Next Brief <ArrowRight className="ml-2 h-4 w-4 text-black" />
            </Button>
          </div>
        )}
      </div>
    </GlassmorphicContainer>
  )
}

