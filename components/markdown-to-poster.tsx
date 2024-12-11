'use client'

import React, { useEffect, lazy, Suspense } from 'react'
import { useState } from 'react'
import { Download, Copy, Settings, Palette, LayoutGrid } from 'lucide-react'
import { Button } from './ui/button'
import { markdown as markdownLang } from '@codemirror/lang-markdown'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { toPng } from 'html-to-image'

const gradientPresets = [
  'from-violet-500 to-blue-500',
  'from-orange-500 to-pink-500',
  'from-cyan-400 to-blue-600',
  'from-green-400 to-emerald-600',
  'from-amber-300 to-orange-500',
  'from-green-300 to-purple-400',
  'from-pink-300 to-rose-400',
  'from-indigo-400 to-purple-500',
  'from-teal-300 to-blue-400',
  'from-yellow-300 to-red-400'
]

const sizePresets = {
  compact: {
    prose: 'prose-sm',
    heading: 'prose-h1:text-3xl',
    spacing: 'space-y-2'
  },
  default: {
    prose: 'prose-base',
    heading: 'prose-h1:text-4xl',
    spacing: 'space-y-4'
  },
  comfortable: {
    prose: 'prose-lg',
    heading: 'prose-h1:text-5xl',
    spacing: 'space-y-6'
  }
}

const CodeMirror = lazy(() => import('@uiw/react-codemirror'))
const ReactMarkdown = lazy(() => import('react-markdown'))

export default function MarkdownPoster() {
  const [markdown, setMarkdown] = useState<string>(`# Markdown Poster

> Markdown Poster is a tool that allows you to create elegant graphic posters using Markdown.✨

![Sample Image](https://picsum.photos/600/300)

## Its main features:

1. Converts Markdown into **graphic posters**
2. Allows **customization** of text themes, backgrounds, and font sizes
3. Can copy images to the clipboard or download as PNG images
4. WYSIWYG (What You See Is What You Get)
5. Free`)
  const [gradient, setGradient] = useState(gradientPresets[0])
  const [size, setSize] = useState<keyof typeof sizePresets>('default')
  const [isCopying, setIsCopying] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  useEffect(() => {
    // 监控组件加载时间
    const startTime = performance.now()
    
    return () => {
      const endTime = performance.now()
      console.log(`Component render time: ${endTime - startTime}ms`)
    }
  }, [])
  
  useEffect(() => {
    // 监控资源加载
    const resources = performance.getEntriesByType('resource')
    resources.forEach(resource => {
      if (resource.duration > 100) { // 只记录加载超过100ms的资源
        console.log(`Slow resource: ${resource.name} - ${resource.duration}ms`)
      }
    })
  }, [])

  const handleCopy = async () => {
    setIsCopying(true)
    const preview = document.getElementById('preview')
    if (preview) {
      const dataUrl = await toPng(preview, {
        quality: 0.95,
        cacheBust: true,
        pixelRatio: 2,
        height: preview.scrollHeight,
        width: preview.scrollWidth,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
          width: `${preview.scrollWidth}px`,
          height: `${preview.scrollHeight}px`
        }
      })
      const img = new Image()
      img.src = dataUrl
      img.crossOrigin = 'anonymous'
      const blob = await (await fetch(dataUrl)).blob()
      await navigator.clipboard.write([
        new ClipboardItem({
          'image/png': blob
        })
      ])
    }
    setIsCopying(false)
  }

  const handleDownload = async () => {
    setIsDownloading(true)
    const preview = document.getElementById('preview')
    if (preview) {
      const dataUrl = await toPng(preview, {
        quality: 0.95,
        cacheBust: true,
        pixelRatio: 2,
        height: preview.scrollHeight,
        width: preview.scrollWidth,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
          width: `${preview.scrollWidth}px`,
          height: `${preview.scrollHeight}px`
        }
      })
      const link = document.createElement('a')
      link.download = 'markdown-poster.png'
      link.href = dataUrl
      link.click()
    }
    setIsDownloading(false)
  }

  return (
    <div className="min-h-screen flex">
      {/* Editor */}
      <div className="w-1/2 h-full p-8">
        <div className="flex items-center gap-2 mb-4">
          <Button variant="ghost" size="sm" onClick={() => setMarkdown(markdown + '\n![Image](url)')}>Insert Image</Button>
          <Button variant="ghost" size="sm" onClick={() => setMarkdown(markdown + '\n> Quote')}>Insert Quote</Button>
          <Button variant="ghost" size="sm" onClick={() => setMarkdown(markdown + '\n# Title')}>Insert Title</Button>
        </div>
        <Suspense fallback={<div>Loading editor...</div>}>
          <CodeMirror
            value={markdown}
            height="calc(100vh - 200px)"
            extensions={[markdownLang()]}
            onChange={(value) => setMarkdown(value)}
            className="h-full font-sans"
            basicSetup={{
              lineNumbers: false,
              foldGutter: false,
              dropCursor: false,
              allowMultipleSelections: false,
              indentOnInput: false
            }}
          />
        </Suspense>
      </div>

      {/* Preview */}
      <div className="w-1/2 h-full bg-gray-50 p-4 relative">
        <div className="flex items-center gap-2 p-2 border-b">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Palette className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white shadow-lg">
              <div className="p-2">
                <h3 className="font-medium mb-2">Background</h3>
                <div className="grid grid-cols-5 gap-1">
                  {gradientPresets.map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setGradient(preset)}
                      className={`w-8 h-8 rounded bg-gradient-to-r ${preset} hover:scale-105 transition-transform`}
                    />
                  ))}
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white shadow-lg">
              <div className="p-2">
                <h3 className="font-medium mb-2">Layout</h3>
                <div className="space-y-1">
                  <button
                    onClick={() => setSize('compact')}
                    className={`w-full px-2 py-1 text-left rounded hover:bg-gray-100 ${
                      size === 'compact' ? 'bg-gray-100' : ''
                    }`}
                  >
                    Compact
                  </button>
                  <button
                    onClick={() => setSize('default')}
                    className={`w-full px-2 py-1 text-left rounded hover:bg-gray-100 ${
                      size === 'default' ? 'bg-gray-100' : ''
                    }`}
                  >
                    Default
                  </button>
                  <button
                    onClick={() => setSize('comfortable')}
                    className={`w-full px-2 py-1 text-left rounded hover:bg-gray-100 ${
                      size === 'comfortable' ? 'bg-gray-100' : ''
                    }`}
                  >
                    Comfortable
                  </button>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <div className="flex-1" />
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleDownload}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
            ) : (
              <Download className="h-4 w-4" />
            )}
          </Button>
          
          <Button 
            aria-label="Copy to clipboard"
            title="Copy to clipboard (Ctrl+C)"
            onClick={handleCopy}
            disabled={isCopying}
          >
            {isCopying ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div 
          id="preview"
          className={`w-full h-full overflow-auto rounded-lg bg-gradient-to-r ${gradient} p-8`}
        >
          <div className="bg-white rounded-3xl p-12 shadow-xl">
            <Suspense fallback={<div>Loading preview...</div>}>
              <ReactMarkdown
                className={`prose max-w-none ${sizePresets[size].prose} ${sizePresets[size].spacing}
                  prose-headings:font-bold prose-headings:text-gray-900 
                  ${sizePresets[size].heading} prose-h1:mb-8
                  prose-p:text-gray-600 prose-p:leading-relaxed
                  prose-blockquote:border-l-4 prose-blockquote:border-gray-200 
                  prose-blockquote:pl-6 prose-blockquote:italic
                  prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-8
                  prose-strong:text-gray-900`}
              >
                {markdown}
              </ReactMarkdown>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

