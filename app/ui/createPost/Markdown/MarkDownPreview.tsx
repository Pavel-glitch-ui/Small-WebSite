'use client';

import { useState, useEffect } from "react";
import { compile } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import type { MDXContent } from "mdx/types";
import remarkGfm from 'remark-gfm';

interface MDXPreviewProps {
  MDXText: string;
}

export function MDXPreview({ MDXText }: MDXPreviewProps) {
  const [Content, setContent] = useState<MDXContent | null>(null);
  const [error, setError] = useState<string | null>(null);

  
  useEffect(() => {
    let isActive = true;


    const compileMDX = async () => {
      try {
       
        const compiled = await compile(MDXText, {
          outputFormat: 'function-body',
          remarkPlugins: [remarkGfm],
          development: process.env.NODE_ENV === 'development',
          jsxRuntime: 'automatic',
          jsxImportSource: 'react',
        });

        
        const fullRuntime = {
          ...runtime,
          jsxDEV: runtime.jsx,
          jsxsDEV: runtime.jsxs
        };

        
        const { default: MDXComponent } = await new Function(
          'runtime',
          `${compiled.value}\nreturn { default: MDXContent };`
        )(fullRuntime);

        if (isActive) {
          setContent(() => MDXComponent);
          setError(null);
        }
      } catch (err) {
        if (isActive) {
          setError(err instanceof Error ? err.message : 'Invalid MDX');
          setContent(null);
        }
      }
    };

    compileMDX();

    return () => {
      isActive = false;
    };
  }, [MDXText]);

  return (
    <div className="prose dark:prose-invert max-w-none">
      {error ? (
        <div className="text-red-500 p-4 bg-red-50 rounded">
          MDX Error: {error}
        </div>
      ) : Content ? (
        <Content key={MDXText.length}/>
      ) : (
        <div>Loading MDX...</div>
      )}
    </div>
  );
}