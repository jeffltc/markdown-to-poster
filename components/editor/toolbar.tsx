import { Button } from "../../components/ui/button"

export function EditorToolbar() {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Button variant="ghost" size="sm">插入图片</Button>
      <Button variant="ghost" size="sm">插入引用</Button>
      <Button variant="ghost" size="sm">插入标题</Button>
    </div>
  )
} 