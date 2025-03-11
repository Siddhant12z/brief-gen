"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function DocFlowAdmin() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [documentationContent, setDocumentationContent] = useState<string>("");

  // Check if authenticated in local storage on component mount
  useEffect(() => {
    const authStatus = localStorage.getItem("doc-flow-admin-auth");
    if (authStatus === "authenticated") {
      setAuthenticated(true);
    }
  }, []);

  // Handle password verification
  const handleAuthentication = () => {
    if (password === "Fineill123!()") {
      setAuthenticated(true);
      localStorage.setItem("doc-flow-admin-auth", "authenticated");
    } else {
      alert("Incorrect password");
    }
  };

  // Load documentation content
  useEffect(() => {
    if (authenticated) {
      fetch('/api/documentation')
        .then(response => response.json())
        .then(data => {
          setDocumentationContent(data.content);
        })
        .catch(error => {
          console.error('Error loading documentation:', error);
        });
    }
  }, [authenticated]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAuthentication();
    }
  };

  const formatMarkdown = (markdown: string) => {
    if (!markdown) return '';

    // Format headers
    let formatted = markdown
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-8 mb-4 text-white">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-6 mb-3 text-white">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mt-5 mb-2 text-primary">$1</h3>')
      
      // Format lists
      .replace(/^\s*[-*] (.*$)/gm, '<li class="ml-6 list-disc text-white mb-1">$1</li>')
      .replace(/^\s*\d+\. (.*$)/gm, '<li class="ml-6 list-decimal text-white mb-1">$1</li>')
      
      // Format code blocks
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-800 p-4 rounded-md overflow-x-auto my-4 text-sm font-mono text-gray-300">$1</pre>')
      
      // Format inline code
      .replace(/`([^`]+)`/g, '<code class="bg-gray-800 px-1 rounded text-primary font-mono">$1</code>')
      
      // Format paragraphs
      .replace(/^(?!<h|<li|<pre|<code)(.*$)/gm, function(match) {
        if (match.trim() === '') return '<br>';
        return '<p class="text-gray-300 mb-4">' + match + '</p>';
      })
      
      // Format links
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:underline" target="_blank">$1</a>');

    // Add container divs for lists
    formatted = formatted
      .replace(/<li class="ml-6 list-disc[^>]*>/g, (match, index, original) => {
        // If this is the first list item or the previous character isn't the end of a list item
        if (index === 0 || original.substring(index - 5, index) !== '</li>') {
          return '<ul class="my-3">' + match;
        }
        return match;
      })
      .replace(/<li class="ml-6 list-decimal[^>]*>/g, (match, index, original) => {
        // If this is the first list item or the previous character isn't the end of a list item
        if (index === 0 || original.substring(index - 5, index) !== '</li>') {
          return '<ol class="my-3">' + match;
        }
        return match;
      })
      .replace(/<\/li>(\s*?)(?!<li)/g, '</li></ul>$1')
      .replace(/<\/li>(\s*?)(?!<li)/g, '</li></ol>$1');

    return formatted;
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-4">
        <Card className="w-full max-w-md bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Documentation Access</CardTitle>
            <CardDescription>Please enter the password to access the documentation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleAuthentication} className="w-full">Access Documentation</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-black">
      <div className="container mx-auto max-w-4xl">
        <div dangerouslySetInnerHTML={{ __html: formatMarkdown(documentationContent) }} />
        <div className="mt-10 border-t border-gray-800 pt-4 text-center text-sm text-gray-500">
          <Button 
            variant="ghost" 
            className="text-gray-500 hover:text-white"
            onClick={() => {
              localStorage.removeItem("doc-flow-admin-auth");
              setAuthenticated(false);
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
} 