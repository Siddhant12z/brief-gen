'use client';

import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HowItWorksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">How it Works</h1>
        <p className="text-muted-foreground mt-2">
          Technical deep dive into the application architecture and implementation details.
        </p>
      </div>
      
      <Separator />
      
      <Tabs defaultValue="architecture">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="architecture">Architecture</TabsTrigger>
          <TabsTrigger value="ai-integration">AI Integration</TabsTrigger>
          <TabsTrigger value="data-flow">Data Flow</TabsTrigger>
        </TabsList>
        
        <TabsContent value="architecture" className="mt-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Next.js App Router Architecture</h2>
            <p className="mb-4">
              Brief Gen is built using the Next.js App Router, which provides a file-system based router
              built on React Server Components. This architecture allows for:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Server Components</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>
                    React components that render on the server, reducing client-side JavaScript and
                    improving performance. Many of our UI components use this approach.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Client Components</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>
                    Components that require client-side interactivity, marked with the 'use client' directive.
                    These enable rich interactions like the practice timer and chat interface.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">API Routes</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>
                    Serverless functions that handle backend logic such as calling AI services and
                    providing data to the frontend.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Layouts</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>
                    Shared UI that wraps multiple pages, providing consistent navigation and structure
                    while preserving state during navigation.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-secondary/30 rounded-md p-4 mb-6">
              <h3 className="font-medium mb-2">Directory Structure Example</h3>
              <pre className="text-sm font-mono text-foreground overflow-x-auto">
{`app/
├── page.tsx                  # Home page
├── layout.tsx                # Root layout
├── practice/
│   └── page.tsx              # Practice page
├── chat/
│   └── page.tsx              # Chat interface
├── briefs/
│   └── page.tsx              # Design briefs page
└── api/
    └── documentation/
        └── route.ts          # Documentation API endpoint`}
              </pre>
            </div>
            
            <h3 className="text-lg font-medium mb-2">Key Architectural Patterns</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <h4 className="font-medium">1. Component Composition</h4>
                <p className="text-sm mb-2">
                  UI is built by composing smaller, reusable components that can be combined to create complex interfaces.
                </p>
                <div className="bg-secondary/30 rounded-md p-3">
                  <pre className="text-sm font-mono text-foreground overflow-x-auto">
{`// Example of component composition
export default function PracticePage() {
  return (
    <div className="container mx-auto">
      <PageHeader title="Practice" description="Improve your design skills" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CategorySelection onSelect={handleCategorySelect} />
        <DurationSelector onSelect={handleDurationSelect} />
      </div>
      
      {challenge && (
        <ChallengeDisplay 
          challenge={challenge}
          remainingTime={timeRemaining}
          onComplete={handleComplete}
        />
      )}
    </div>
  );
}`}
                  </pre>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium">2. Progressive Enhancement</h4>
                <p className="text-sm mb-2">
                  The application works without JavaScript, then enhances functionality when JavaScript is available.
                </p>
                <div className="bg-secondary/30 rounded-md p-3">
                  <pre className="text-sm font-mono text-foreground overflow-x-auto">
{`// Example of form that works with and without JS
export function BriefFilterForm({ defaultValues }) {
  // Works without JS using native form submission
  return (
    <form action="/briefs" method="get">
      <input type="text" name="query" defaultValue={defaultValues.query} />
      <select name="category" defaultValue={defaultValues.category}>
        {/* Options */}
      </select>
      <button type="submit">Filter</button>
    </form>
  );
}

// Enhanced with client-side JS
'use client';

export function BriefFilterFormEnhanced({ defaultValues, onFilter }) {
  const [values, setValues] = useState(defaultValues);
  
  // Client-side filtering without page refresh
  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(values);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Same form elements but with React handlers */}
    </form>
  );
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="ai-integration" className="mt-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">AI Integration Architecture</h2>
            <p className="mb-4">
              Brief Gen leverages multiple AI services to generate design briefs, provide feedback on designs,
              and facilitate design discussions. The AI integration is built with flexibility, reliability, and
              performance in mind.
            </p>
            
            <h3 className="text-lg font-medium mb-3">AI Client Implementation</h3>
            <p className="mb-4">
              The AIClient class in <code>lib/ollama-client.ts</code> serves as the central interface for all AI interactions.
              It provides an abstraction layer over the underlying AI services, handling authentication, error handling,
              and retry logic.
            </p>
            
            <div className="bg-secondary/30 rounded-md p-4 mb-6">
              <h4 className="font-medium mb-2">AI Client Class Structure</h4>
              <pre className="text-sm font-mono text-foreground overflow-x-auto">
{`export class AIClient {
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

  // Core methods for different AI interactions
  async generateBrief(category: string, difficulty: string): Promise<string> {
    // Implementation...
  }

  async provideFeedback(designImage: string, brief: string): Promise<string> {
    // Implementation...
  }

  async streamChatResponse(messages: Message[], onChunk: (chunk: string) => void): Promise<void> {
    // Implementation...
  }

  // Helper methods
  private async sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  private async makeRequest(url: string, options: RequestInit, retryCount: number = 0): Promise<Response> {
    // Implementation with retry logic...
  }
}`}
              </pre>
            </div>
            
            <h3 className="text-lg font-medium mb-3">Prompt Engineering</h3>
            <p className="mb-4">
              The quality of AI-generated content depends heavily on well-crafted prompts. Brief Gen uses structured
              prompt templates to ensure consistent, high-quality outputs.
            </p>
            
            <div className="bg-secondary/30 rounded-md p-4 mb-6">
              <h4 className="font-medium mb-2">Example Brief Generation Prompt</h4>
              <pre className="text-sm font-mono text-foreground overflow-x-auto">
{`const generateBriefPrompt = (category: string, complexity: string) => {
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
};`}
              </pre>
            </div>
            
            <h3 className="text-lg font-medium mb-3">API Route Integration</h3>
            <p className="mb-4">
              The AI client is utilized through API routes that handle authentication, input validation, and response formatting.
            </p>
            
            <div className="bg-secondary/30 rounded-md p-4">
              <h4 className="font-medium mb-2">Example API Route</h4>
              <pre className="text-sm font-mono text-foreground overflow-x-auto">
{`// app/api/generate-brief/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { AIClient } from '@/lib/ollama-client'

export async function POST(req: NextRequest) {
  try {
    // Extract request data
    const { category, complexity } = await req.json()
    
    // Validate inputs
    if (!category || !complexity) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }
    
    // Initialize AI client
    const client = new AIClient(
      process.env.OPENROUTER_KEY!,
      process.env.MISTRAL_KEY!,
      process.env.CHUTES_KEY!
    )
    
    // Generate brief
    const brief = await client.generateBrief(category, complexity)
    
    // Return response
    return NextResponse.json({ brief })
  } catch (error) {
    console.error('Error generating brief:', error)
    return NextResponse.json(
      { error: 'Failed to generate brief' },
      { status: 500 }
    )
  }
}`}
              </pre>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="data-flow" className="mt-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Data Flow Architecture</h2>
            <p className="mb-4">
              Brief Gen uses a combination of server-side and client-side data handling to provide a responsive
              user experience while maintaining security and performance.
            </p>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Server-side Data Flow</h3>
              <p className="mb-4">
                Data that requires authentication, involves sensitive operations, or needs to be pre-rendered
                is handled on the server using:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Server Components</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p>
                      Fetch data directly in React Server Components, which is then rendered on the server
                      and sent to the client as HTML.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">API Routes</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p>
                      Serverless functions that handle data operations such as calling external APIs and
                      processing user inputs.
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-secondary/30 rounded-md p-4 mb-6">
                <h4 className="font-medium mb-2">Server Component Data Fetching Example</h4>
                <pre className="text-sm font-mono text-foreground overflow-x-auto">
{`// app/briefs/page.tsx
import { getBriefs } from '@/lib/data-services'

// This component is a Server Component by default
export default async function BriefsPage({ 
  searchParams 
}: { 
  searchParams: { category?: string; difficulty?: string } 
}) {
  // Data is fetched on the server
  const briefs = await getBriefs({
    category: searchParams.category,
    difficulty: searchParams.difficulty
  })
  
  return (
    <div className="container mx-auto">
      <h1>Design Briefs</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {briefs.map(brief => (
          <BriefCard key={brief.id} brief={brief} />
        ))}
      </div>
    </div>
  )
}`}
                </pre>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Client-side Data Flow</h3>
              <p className="mb-4">
                Interactive features that require immediate feedback, state management, or client-side mutations
                use client components with React hooks.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">React State Hooks</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p>
                      Component-local state using useState and useReducer hooks for UI interactions
                      and form inputs.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Context API</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p>
                      Global state management using React Context for themes, user preferences,
                      and other application-wide state.
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-secondary/30 rounded-md p-4">
                <h4 className="font-medium mb-2">Client Component with State Management</h4>
                <pre className="text-sm font-mono text-foreground overflow-x-auto">
{`// components/practice/practice-session.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function PracticeSession({ initialCategory }) {
  // Local state management
  const [state, setState] = useState({
    stage: 'category',
    category: initialCategory || null,
    duration: null,
    challenge: null,
    timeRemaining: 0,
  });
  
  const router = useRouter();
  
  // Effect for timer countdown
  useEffect(() => {
    if (state.stage !== 'challenge' || state.timeRemaining <= 0) return;
    
    const timer = setInterval(() => {
      setState(prev => ({
        ...prev,
        timeRemaining: prev.timeRemaining - 1
      }));
    }, 1000);
    
    return () => clearInterval(timer);
  }, [state.stage, state.timeRemaining]);
  
  // Effect to check if time is up
  useEffect(() => {
    if (state.timeRemaining === 0 && state.stage === 'challenge') {
      setState(prev => ({ ...prev, stage: 'completed' }));
    }
  }, [state.timeRemaining, state.stage]);
  
  // Handler for category selection
  const handleCategorySelect = (category) => {
    setState(prev => ({ ...prev, stage: 'duration', category }));
  };
  
  // Additional handlers and UI rendering...
}`}
                </pre>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold">Deployment and DevOps</h2>
        
        <p>
          Brief Gen is deployed using Vercel's platform, which provides seamless integration with Next.js
          and a robust CI/CD pipeline.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Continuous Integration</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p>
                Automatic build and test runs on every pull request using GitHub Actions,
                ensuring code quality before merging.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Continuous Deployment</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p>
                Automatic deployment to production when changes are merged to the main branch,
                with preview deployments for pull requests.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Edge Runtime</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p>
                API routes are deployed as edge functions, providing low-latency responses
                by running code closer to users.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-secondary/30 rounded-md p-4 mb-6">
          <h4 className="font-medium mb-2">Vercel Configuration Example</h4>
          <pre className="text-sm font-mono text-foreground overflow-x-auto">
{`// vercel.json
{
  "version": 2,
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}`}
          </pre>
        </div>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Testing Strategy</h2>
        
        <p>
          Brief Gen implements a comprehensive testing strategy to ensure quality and reliability:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Unit Testing</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p>
                Testing individual components and functions in isolation using Jest and React Testing Library.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Integration Testing</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p>
                Testing interactions between components and services to ensure they work together correctly.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">E2E Testing</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p>
                Testing complete user flows from end to end using Playwright to simulate real user interactions.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">TypeScript</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p>
                Using TypeScript for static type checking to catch type-related errors during development.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-secondary/30 rounded-md p-4">
          <h4 className="font-medium mb-2">Unit Test Example</h4>
          <pre className="text-sm font-mono text-foreground overflow-x-auto">
{`// __tests__/components/BriefCard.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BriefCard } from '@/components/BriefCard'

describe('BriefCard', () => {
  const mockBrief = {
    id: '1',
    title: 'Test Brief',
    description: 'This is a test brief',
    category: 'web',
    difficulty: 'beginner'
  }

  it('renders brief details correctly', () => {
    render(<BriefCard brief={mockBrief} />)
    
    expect(screen.getByText('Test Brief')).toBeInTheDocument()
    expect(screen.getByText('This is a test brief')).toBeInTheDocument()
    expect(screen.getByText('web')).toBeInTheDocument()
    expect(screen.getByText('beginner')).toBeInTheDocument()
  })

  it('calls onSelect when clicked', async () => {
    const handleSelect = jest.fn()
    
    render(<BriefCard brief={mockBrief} onSelect={handleSelect} />)
    
    await userEvent.click(screen.getByRole('button', { name: /view brief/i }))
    
    expect(handleSelect).toHaveBeenCalledWith('1')
  })
})`}
          </pre>
        </div>
      </div>
    </div>
  );
} 