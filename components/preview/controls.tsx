import { Button } from "../../components/ui/button"
import { Palette, Download, Copy } from "lucide-react"

export function PreviewControls() {
  return (
    <div className="flex items-center gap-2 p-2 border-b">
      <Button variant="ghost" size="icon">
        <Palette className="h-4 w-4" />
      </Button>
      <div className="flex-1" />
      <Button variant="ghost" size="icon">
        <Download className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  )
} 