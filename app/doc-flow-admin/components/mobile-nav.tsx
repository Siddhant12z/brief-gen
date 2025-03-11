'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface SectionItem {
  title: string;
  href: string;
}

interface Section {
  title: string;
  items: SectionItem[];
}

export function MobileNav() {
  const [open, setOpen] = useState(false);

  const sections: Section[] = [
    {
      title: 'DOCUMENTATION',
      items: [
        { title: 'Introduction', href: '/doc-flow-admin' },
        { title: 'How it works', href: '/doc-flow-admin/how-it-works' },
        { title: 'Future Goals', href: '/doc-flow-admin/future-goals' },
      ],
    },
    {
      title: 'INSTALLATION GUIDES',
      items: [
        { title: 'MacOS', href: '/doc-flow-admin/macos' },
        { title: 'Windows', href: '/doc-flow-admin/windows' },
        { title: 'Linux', href: '/doc-flow-admin/linux' },
      ],
    },
    {
      title: 'GETTING STARTED',
      items: [
        { title: 'Creating your first project', href: '/doc-flow-admin/creating-project' },
        { title: 'Components', href: '/doc-flow-admin/components' },
        { title: 'Rendering', href: '/doc-flow-admin/rendering' },
        { title: 'Plugins', href: '/doc-flow-admin/plugins' },
      ],
    },
    {
      title: 'ADDITIONAL RESOURCES',
      items: [
        { title: 'Community', href: '/doc-flow-admin/community' },
        { title: 'Free templates', href: '/doc-flow-admin/templates' },
      ],
    },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Documentation</h2>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <span>Version:</span>
              <button className="flex items-center hover:text-foreground">
                Latest (1.0)
                <ChevronDown className="h-3 w-3 ml-1" />
              </button>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-6">
            {sections.map((section, i) => (
              <div key={i} className="space-y-3">
                <h3 className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">
                  {section.title}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item, j) => (
                    <Link
                      key={j}
                      href={item.href}
                      className="block py-2 text-sm hover:text-primary"
                      onClick={() => setOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
} 