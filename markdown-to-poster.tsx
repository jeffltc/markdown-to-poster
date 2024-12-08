'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Download, Copy, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toPng } from 'html-to-image'

export default function MarkdownPoster() {
  const [markdown, setMarkdown] = useState<string>(`# Markdown Poster

> Markdown Poster 是一个工具，可以让你用 Markdown 制作优雅的图文海报。✨

![示例图片](https://picsum.photos/600/300)

## 它的主要功能：

1. 将Markdown 转化为 **图文海报**
2. 可以**自定义**文本主题、背景、字体大小
3. 可以复制图片到 剪贴板，或者 下载为PNG图片
4. 所见即所得
5. 免费
6. 支持使用API调用`)

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
      <div className="w-1/2 h-full border-r bg-background">
        <div className="h-full p-4">
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="w-full h-full resize-none border-0 bg-background p-4 font-mono text-sm focus:outline-none"
            placeholder="Enter your markdown here..."
          />
        </div>
      </div>

      {/* Preview */}
      <div className="w-1/2 h-full bg-gray-50 p-4 relative">
        <div className="absolute top-4 right-4 flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>自定义主题</DropdownMenuItem>
              <DropdownMenuItem>自定义字体</DropdownMenuItem>
              <DropdownMenuItem>自定义背景</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="icon" onClick={handleCopy}>
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleDownload}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
        <div 
          id="preview"
          className="w-full h-full overflow-auto rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 p-8"
        >
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <ReactMarkdown
              className="prose prose-slate prose-img:rounded-lg prose-headings:text-gray-800 prose-p:text-gray-600 prose-strong:text-gray-800 prose-strong:font-bold max-w-none"
              components={{
                img: ({ node, ...props }) => (
                  <img className="w-full h-auto rounded-lg shadow-md" {...props} />
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

