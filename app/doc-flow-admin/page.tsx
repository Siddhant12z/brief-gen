"use client";

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { DocumentationIntro } from './components/intro';

export default function DocFlowAdmin() {
  const [activeSection, setActiveSection] = useState('introduction');

  // Static documentation content with detailed codebase information
  const documentationContent = `
# Brief Gen Documentation

## Introduction

Brief Gen is a web application designed to help UI/UX designers improve their skills through practice and briefs. The platform provides design challenges, a chat interface for design discussions, and a timer-based practice system to help designers build skills in a focused manner.

## Codebase Structure

The application follows Next.js 15 app directory structure, which enables modern React features like Server Components, Streaming, and Server Actions.

\`\`\`
/app                    # Main application code (Next.js App Router)
  /api                  # API routes for backend functionality
    /documentation      # Documentation API endpoint
  /chat                 # Chat interface with AI assistant
  /practice             # Practice challenges interface
  /briefs               # Design briefs browsing interface
  /doc-flow-admin       # Admin section for documentation flow
  /page.tsx             # Home page with main navigation
  /layout.tsx           # Root layout with global providers
/components             # Reusable UI components
  /ui                   # UI component library (based on shadcn/ui)
  /brief-card.tsx       # Card component for displaying briefs
  /glassmorphic-card    # Styled card for home page navigation
  /practice             # Components specific to practice functionality
/lib                    # Utility functions and services
  /ollama-client.ts     # AI client for generating briefs and analyzing designs
  /predefined-briefs.ts # Collection of predefined design briefs
  /heatmap-generator.ts # Visualization tool for user activity
  /utils.ts             # General utility functions
/public                 # Static assets and images
/styles                 # Global CSS and styling utilities
/hooks                  # Custom React hooks for state management
/types                  # TypeScript type definitions
/tests                  # Test files and test utilities
/__mocks__              # Mock files for testing
\`\`\`

### Key Files and Their Purpose

#### Root Layout (app/layout.tsx)

The root layout defines the HTML structure that wraps all routes in the application:

\`\`\`tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Brief Gen',
  description: 'Improve your UI/UX design skills through practice and briefs',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
\`\`\`

#### Home Page (app/page.tsx)

The home page serves as the entry point to the application, displaying GlassmorphicCard components for each main feature:

\`\`\`tsx
import { GlassmorphicCard } from "@/components/glassmorphic-card"
import { FileText, MessageSquare, Palette } from "lucide-react"

export default function Home() {
  const cards = [
    {
      title: "Curated Briefs",
      description: "Explore our collection of hand-picked design briefs to inspire your next project.",
      icon: <FileText className="w-10 h-10 text-purple-300" />,
      href: "/briefs",
      cta: "Browse Briefs",
      gradient: "from-purple-900/30 to-purple-800/20",
      glow: "purple" as const,
    },
    // ... other card definitions
  ]

  return (
    <div className="dark" suppressHydrationWarning>
      <main className="min-h-screen bg-black bg-gradient-to-br from-black via-purple-950/10 to-black p-4 md:p-8 relative overflow-hidden">
        {/* Ambient glow effects */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] opacity-60" suppressHydrationWarning></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] opacity-50" suppressHydrationWarning></div>

        <div className="max-w-7xl mx-auto relative z-10" suppressHydrationWarning>
          {/* Page content ... */}
        </div>
      </main>
    </div>
  )
}
\`\`\`

#### AI Client (lib/ollama-client.ts)

The AI client is responsible for communicating with various AI services to generate briefs and provide feedback:

\`\`\`tsx
export class AIClient {
  private textModel: string
  private visionModel: string
  private openRouterKey: string
  private mistralKey: string
  private chutesKey: string
  private maxRetries: number = 3
  private retryDelay: number = 1000 // 1 second

  constructor(openRouterKey: string, mistralKey: string, chutesKey: string) {
    this.textModel = 'meta/llama-2-7b-chat:8e6975e5ed6174911a6ff3d60540dfd4844201974602551e10e9e87ab143d81e'
    this.visionModel = 'salesforce/blip:2e1dddc8621f72155f24cf2e0adbde548458d3cab9f00c0139eea840d0ac4746'
    this.openRouterKey = openRouterKey
    this.mistralKey = mistralKey
    this.chutesKey = chutesKey
  }

  // Methods for calling AI services with retry logic, error handling, etc.
}
\`\`\`

## Technology Stack

The application uses the following technologies:

### Frontend
- **Next.js 15**: For server-side rendering, client-side routing, and API routes
- **React 18**: For building the user interface with functional components and hooks
- **TypeScript**: For type safety, better developer experience, and code documentation
- **Tailwind CSS**: For utility-first styling approach with responsive design
- **Shadcn/UI**: For consistent UI components and design system with full customization

### UI Components and Design
- **Radix UI**: Low-level, accessible UI primitives used by shadcn/ui
- **Lucide React**: Lightweight icon components
- **Recharts**: For data visualization components
- **Embla Carousel**: For responsive, touch-friendly carousels
- **React Markdown**: For rendering markdown content in briefs and documentation

### Backend & APIs
- **Next.js API Routes**: For serverless backend functionality
- **Mistral AI API**: For generating design briefs and challenges
- **OpenRouter API**: For flexible AI model selection
- **Chutes API**: For additional AI services

### State Management
- **React Hooks**: For local component state and effects
- **React Context API**: For global state accessible across components
- **Local Storage**: For persisting user preferences and session data

## Implementation Details

### Component Architecture

#### GlassmorphicCard Component

This component creates stylized cards with a frosted glass effect for the home page:

\`\`\`tsx
interface GlassmorphicCardProps {
  title: string
  description: string
  icon: React.ReactNode
  href: string
  cta: string
  gradient: string
  glow: "purple" | "fuchsia" | "pink"
}

export function GlassmorphicCard({ title, description, icon, href, cta, gradient, glow }: GlassmorphicCardProps) {
  const glowStyles = {
    purple: "group-hover:shadow-[0_0_25px_rgba(147,51,234,0.3)]",
    fuchsia: "group-hover:shadow-[0_0_25px_rgba(217,70,239,0.3)]",
    pink: "group-hover:shadow-[0_0_25px_rgba(236,72,153,0.3)]",
  }

  const buttonGradients = {
    purple: "bg-purple-600 hover:bg-purple-700",
    fuchsia: "bg-fuchsia-600 hover:bg-fuchsia-700",
    pink: "bg-pink-600 hover:bg-pink-700",
  }

  return (
    <div suppressHydrationWarning className={\`group relative rounded-2xl transition-all duration-500 \${glowStyles[glow]}\`}>
      {/* Glassmorphic card */}
      <div
        suppressHydrationWarning
        className={\`h-full backdrop-blur-xl bg-gradient-to-br \${gradient} 
                   border border-purple-500/20 rounded-2xl p-6 flex flex-col
                   shadow-lg transition-all duration-500\`}
      >
        {/* Card content... */}
      </div>
    </div>
  )
}
\`\`\`

### AI Integration Architecture

The application integrates AI capabilities through a dedicated client implementation in \`lib/ollama-client.ts\`. This client provides:

1. **Text Generation**: For creating design briefs, challenges, and responding to user questions
2. **Image Analysis**: For providing feedback on user-uploaded design work

The AI client implements:
- **Multiple Model Support**: Can work with different AI models based on the use case
- **Retry Logic**: Handles rate limiting, network errors, and other API issues with exponential backoff
- **Streaming Responses**: Enables real-time streaming of AI responses for better UX
- **Error Handling**: Graceful degradation when AI services are unavailable

\`\`\`tsx
// Example of retry logic implementation
private async makeRequest(url: string, options: RequestInit, retryCount: number = 0): Promise<Response> {
  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      if (response.status === 429 && retryCount < this.maxRetries) {
        // Rate limit hit, wait and retry
        await this.sleep(this.retryDelay * Math.pow(2, retryCount))
        return this.makeRequest(url, options, retryCount + 1)
      }
      throw new Error(\`AI request failed: \${response.statusText}\`)
    }

    return response
  } catch (error) {
    if (retryCount < this.maxRetries) {
      // Network error or other issue, retry
      await this.sleep(this.retryDelay * Math.pow(2, retryCount))
      return this.makeRequest(url, options, retryCount + 1)
    }
    throw error
  }
}
\`\`\`

### Practice Session Implementation

The practice session is a complex feature that:

1. Allows users to select design categories and time duration
2. Generates appropriate design challenges based on user selections
3. Implements a countdown timer to track practice sessions
4. Provides a structured format for displaying challenge information
5. Uses state management to track session progress

\`\`\`tsx
// Simplified version of practice session state management
const [practiceState, setPracticeState] = useState<{
  stage: 'category' | 'duration' | 'challenge' | 'completed';
  category: string | null;
  duration: number | null;
  challenge: Challenge | null;
  timeRemaining: number;
}>({
  stage: 'category',
  category: null,
  duration: null,
  challenge: null,
  timeRemaining: 0,
});

// Progress through practice stages
const handleCategorySelection = (category: string) => {
  setPracticeState(prev => ({ ...prev, stage: 'duration', category }));
};

const handleDurationSelection = (duration: number) => {
  setPracticeState(prev => ({ 
    ...prev, 
    stage: 'challenge', 
    duration,
    timeRemaining: duration * 60 // Convert to seconds
  }));
  generateChallenge(practiceState.category as string, duration);
};
\`\`\`

## Page Flows

### Home Page Flow
1. User lands on the home page
2. Three main features are presented as interactive cards
3. User selects one of the three paths based on their goals

### Practice Page Flow
1. **Category Selection**: User selects a design category (web, mobile, etc.)
2. **Duration Selection**: User selects a practice duration
3. **Challenge Generation**: System generates challenges based on selection
4. **Practice Session**: 
   - Timer counts down from selected duration
   - Challenge is displayed with specific requirements
   - Resources and tools are suggested to help with the challenge
5. **Session Completion**: User completes the practice session
   - Option to restart or exit
   - Prompt to save or share work (future feature)

### Chat Interface Flow
The chat interface allows users to:
1. Start a new conversation or continue existing one
2. Type questions about design principles or request new briefs
3. Upload designs for feedback (using the file upload button)
4. Receive AI-generated responses with markdown formatting
5. Use the conversation history for context in follow-up questions

### Briefs Browsing Flow
1. User browses available design brief categories
2. Filters briefs by difficulty level, design type, or industry
3. Selects a brief to view detailed requirements
4. Can bookmark briefs for later reference
5. Option to start a practice session based on the selected brief

## Implementation Notes

### Dark Mode Implementation

The application uses a dark mode interface with a custom color palette defined in globals.css:

\`\`\`css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    /* ...other light mode variables... */
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 262.1 83.3% 57.8%;
    --primary-foreground: 210 40% 98%;
    /* ...other dark mode variables... */
  }
}
\`\`\`

### AI Prompt Engineering

The application uses carefully crafted prompts to generate focused design challenges:
- Challenges are specific to a single UI component or interaction
- Resource suggestions include actual tools and inspiration links
- Prompts emphasize clarity and achievable goals
- System messages establish clear context and boundaries for AI responses
- Prompt templates are parameterized to allow for customization

Example prompt pattern for generating briefs:

\`\`\`tsx
const generateBriefPrompt = (category: string, complexity: string) => {
  return \`
    You are a design mentor creating a UI/UX design challenge.
    Create a design brief for a \${category} project with \${complexity} complexity.
    
    The brief should include:
    - A clear title
    - A concise description of the design challenge
    - Specific requirements (3-5 items)
    - Target audience information
    - Design constraints
    - Timeline recommendation
    
    Format your response in markdown.
  \`;
};
\`\`\`
`;

  // Show the content directly since we're using static content now
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none">
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ children }) => <h1 className="text-3xl font-bold mb-6">{children}</h1>,
          h2: ({ children }) => (
            <>
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary">{children}</h2>
              <Separator className="mb-4" />
            </>
          ),
          h3: ({ children }) => <h3 className="text-xl font-medium mt-6 mb-3">{children}</h3>,
          h4: ({ children }) => <h4 className="text-lg font-medium mt-4 mb-2">{children}</h4>,
          a: ({ href, children }) => (
            <a href={href} className="text-primary hover:text-primary/80 underline underline-offset-4">
              {children}
            </a>
          ),
          ul: ({ children }) => <ul className="my-4 ml-6 list-disc">{children}</ul>,
          ol: ({ children }) => <ol className="my-4 ml-6 list-decimal">{children}</ol>,
          li: ({ children }) => <li className="mt-2">{children}</li>,
          p: ({ children }) => <p className="my-4 leading-relaxed">{children}</p>,
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : undefined;
            const codeContent = String(children).replace(/\\n/g, '\n');
            
            if (!className) {
              return <code className="px-1 py-0.5 bg-secondary/50 rounded font-mono text-sm">{children}</code>;
            }
            
            return (
              <div className="rounded-md bg-secondary/50 p-4 overflow-x-auto my-4">
                <pre className="text-sm font-mono text-foreground">
                  <code>{codeContent}</code>
                </pre>
              </div>
            );
          },
          pre: ({ children }) => <>{children}</>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary/30 pl-4 my-4 italic">{children}</blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-border p-2 bg-secondary/50 font-semibold text-left">{children}</th>
          ),
          td: ({ children }) => <td className="border border-border p-2">{children}</td>,
        }}
      >
        {documentationContent}
      </ReactMarkdown>
    </div>
  );
} 