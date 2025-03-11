import { Separator } from '@/components/ui/separator';
import { ExternalLink } from 'lucide-react';

export function DocumentationIntro() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Introduction</h1>
      
      <p className="text-muted-foreground">
        The official guide assumes intermediate level knowledge of HTML, CSS, and
        JavaScript. If you are totally new to frontend development, it might not be the
        best idea to jump right into a framework as your first step - grasp the basics then
        come back! Prior experience with other frameworks helps, but is not required.
      </p>
      
      <Separator />
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Quick description</h2>
        
        <p>
          Plain and simple React module boilerplate with TypeScript support. A nice way to
          build and test small React components, with type-checking. Before publishing
          any npm package, you can run it locally and try out with{' '}
          <code className="px-1 py-0.5 bg-secondary/50 rounded font-mono text-sm">npm link</code> command and
          importing it to your project.
        </p>
        
        <p>First, setup typescript compiler with options below:</p>
        
        <div className="rounded-md bg-secondary/50 p-4 overflow-x-auto">
          <pre className="text-sm font-mono text-foreground">
{`{
  "compilerOptions": {
    "sourceMap": true,
    "target": "es5",
    "jsx": "react",
    "declaration": true,
    "outDir": "lib"
  },
  "include": [
    "src"
  ]
}`}
          </pre>
        </div>
        
        <div className="flex items-center space-x-2">
          <a 
            href="https://typescriptlang.org" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-primary hover:text-primary/80 flex items-center"
          >
            typescriptlang.org
            <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
} 