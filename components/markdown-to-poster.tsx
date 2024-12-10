'use client'

import React from 'react'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Download, Copy, Settings, Palette } from 'lucide-react'
import { Button } from './ui/button'
import CodeMirror from '@uiw/react-codemirror'
import { markdown as markdownLang } from '@codemirror/lang-markdown'
import { oneDark } from '@codemirror/theme-one-dark'
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

const fontPresets = ['Inter', 'Roboto', 'Merriweather', 'Playfair Display']

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
  const [scale, setScale] = useState(1)
  const [selectedFont, setSelectedFont] = useState(fontPresets[0])

  const handleCopy = async () => {
    const preview = document.getElementById('preview')
    if (preview) {
      const dataUrl = await toPng(preview)
      const img = new Image()
      img.src = dataUrl
      img.crossOrigin = 'anonymous'
      const blob = await (await fetch(dataUrl)).blob()
      navigator.clipboard.write([
        new ClipboardItem({
          'image/png': blob
        })
      ])
    }
  }

  const handleDownload = async () => {
    const preview = document.getElementById('preview')
    if (preview) {
      const dataUrl = await toPng(preview)
      const link = document.createElement('a')
      link.download = 'markdown-poster.png'
      link.href = dataUrl
      link.click()
    }
  }

  return (
    <div className="h-screen flex">
      {/* Editor */}
      <div className="w-1/2 h-full p-8">
        <div className="flex items-center gap-2 mb-4">
          <Button variant="ghost" size="sm" onClick={() => setMarkdown(markdown + '\n![Image](url)')}>Insert Image</Button>
          <Button variant="ghost" size="sm" onClick={() => setMarkdown(markdown + '\n> Quote')}>Insert Quote</Button>
          <Button variant="ghost" size="sm" onClick={() => setMarkdown(markdown + '\n# Title')}>Insert Title</Button>
        </div>
        <CodeMirror
          value={markdown}
          height="100vh"
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
          style={{ 
            fontSize: '16px',
            fontFamily: 'Inter, sans-serif'
          }}
        />
      </div>

      {/* Preview */}
      <div className="w-1/2 h-full bg-gray-50 p-4 relative">
        <div className="flex items-center gap-2 p-2 border-b">
          <input 
            type="range" 
            min="0.5" 
            max="2" 
            step="0.1" 
            value={scale} 
            onChange={(e) => setScale(Number(e.target.value))} 
            className="w-24"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Palette className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white p-2 shadow-xl">
              <div className="grid grid-cols-3 gap-2 w-[180px]">
                {gradientPresets.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setGradient(preset)}
                    className={`w-14 h-14 rounded-lg bg-gradient-to-r ${preset} hover:scale-105 transition-transform`}
                  />
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <div className="flex-1" />
          
          <Button variant="ghost" size="icon" onClick={handleDownload}>
            <Download className="h-4 w-4" />
          </Button>
          
          <Button 
            aria-label="复制到剪贴板"
            title="复制到剪贴板 (Ctrl+C)"
            onClick={handleCopy}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <div 
          id="preview"
          className={`w-full h-full overflow-auto rounded-lg bg-gradient-to-r ${gradient} p-8`}
        >
          <div className="bg-white rounded-3xl p-12 shadow-xl">
            <ReactMarkdown
              className="prose prose-lg max-w-none
                prose-headings:font-bold prose-headings:text-gray-900 
                prose-h1:text-4xl prose-h1:mb-8
                prose-p:text-gray-600 prose-p:text-lg prose-p:leading-relaxed
                prose-blockquote:border-l-4 prose-blockquote:border-gray-200 
                prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600
                prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-8
                prose-strong:text-gray-900
                prose-ul:my-6 prose-li:my-2"
              components={{
                img: ({ node, ...props }) => (
                  <img 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto rounded-2xl shadow-lg" 
                    {...props} 
                    alt={props.alt || ''} 
                  />
                ),
                blockquote: ({node, ...props}) => (
                  <div className="bg-gray-50 rounded-xl p-4 my-6">
                    <blockquote {...props} className="border-l-4 border-gray-200 pl-4 italic text-gray-600" />
                  </div>
                ),
              }}
            >
              {markdown}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  )
}

