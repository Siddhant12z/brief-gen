import { ReactNode } from 'react';
import Link from 'next/link';
import { Search, Book, Settings, Globe, TrendingUp } from 'lucide-react';
import { MobileNav } from './components/mobile-nav';

interface DocsLayoutProps {
  children: ReactNode;
}

export default function DocFlowAdminLayout({ children }: DocsLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen overflow-hidden">
        {/* Documentation Sidebar */}
        <aside className="hidden md:flex w-64 flex-col border-r border-border">
          <div className="p-4 border-b border-border flex items-center space-x-2">
            <Book className="h-5 w-5 text-primary" />
            <span className="font-medium text-lg">Brief Gen Docs</span>
          </div>
          
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-1">
              <span className="text-xs text-muted-foreground">Version:</span>
              <button className="text-xs flex items-center text-muted-foreground hover:text-foreground">
                Latest (1.0)
                <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            <div className="mt-2">
              <span className="text-xs font-medium text-muted-foreground">Developer documentation</span>
            </div>
          </div>
          
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-2">
                DOCUMENTATION
              </h3>
              <ul className="space-y-1">
                <li>
                  <Link 
                    href="/doc-flow-admin" 
                    className="block px-2 py-1 text-sm text-foreground hover:text-primary rounded-md"
                  >
                    Introduction
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/doc-flow-admin/how-it-works" 
                    className="block px-2 py-1 text-sm text-foreground hover:text-primary rounded-md"
                  >
                    How it works
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/doc-flow-admin/future-goals" 
                    className="block px-2 py-1 text-sm text-foreground hover:text-primary rounded-md flex items-center"
                  >
                    Future Goals & Monetization
                    <TrendingUp className="h-3 w-3 ml-1" />
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-2">
                CODEBASE
              </h3>
              <ul className="space-y-1">
                <li>
                  <Link 
                    href="/doc-flow-admin#codebase-structure" 
                    className="block px-2 py-1 text-sm text-foreground hover:text-primary rounded-md"
                  >
                    Structure
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/doc-flow-admin#technology-stack" 
                    className="block px-2 py-1 text-sm text-foreground hover:text-primary rounded-md"
                  >
                    Technology Stack
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/doc-flow-admin#implementation-details" 
                    className="block px-2 py-1 text-sm text-foreground hover:text-primary rounded-md"
                  >
                    Implementation Details
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-2">
                APPLICATION FLOW
              </h3>
              <ul className="space-y-1">
                <li>
                  <Link 
                    href="/doc-flow-admin#page-flows" 
                    className="block px-2 py-1 text-sm text-foreground hover:text-primary rounded-md"
                  >
                    Page Flows
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/doc-flow-admin#implementation-details" 
                    className="block px-2 py-1 text-sm text-foreground hover:text-primary rounded-md"
                  >
                    Component Architecture
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/doc-flow-admin#ai-integration-architecture" 
                    className="block px-2 py-1 text-sm text-foreground hover:text-primary rounded-md"
                  >
                    AI Integration
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-2">
                RESOURCES
              </h3>
              <ul className="space-y-1">
                <li>
                  <Link 
                    href="/doc-flow-admin#implementation-notes" 
                    className="block px-2 py-1 text-sm text-foreground hover:text-primary rounded-md"
                  >
                    Implementation Notes
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/doc-flow-admin/future-goals#monetization-strategy" 
                    className="block px-2 py-1 text-sm text-foreground hover:text-primary rounded-md"
                  >
                    Monetization Strategy
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="border-b border-border p-4 flex justify-between items-center">
            <div className="flex items-center">
              <MobileNav />
              <div className="relative ml-4 w-full max-w-sm hidden md:block">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-muted-foreground" />
                </div>
                <input
                  type="search"
                  className="bg-secondary/50 block w-full pl-10 pr-4 py-2 text-sm rounded-md border-0 focus:ring-2 focus:ring-primary focus:bg-background"
                  placeholder="Search documentation..."
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-muted-foreground hover:text-foreground">
                <Settings className="h-5 w-5" />
              </button>
              <button className="text-muted-foreground hover:text-foreground">
                <Globe className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="p-6 max-w-4xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 