"use client"

import { useState, useRef, type KeyboardEvent } from "react"
import { Send, Paperclip, Smile, Wand2 } from "lucide-react"
import { Button } from "@/components/ui/button"

type MessageComposerProps = {
  onSend: (content: string) => void
  disabled?: boolean
}

export function MessageComposer({ onSend, disabled }: MessageComposerProps) {
  const [value, setValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  function handleSend() {
    if (!value.trim()) return
    onSend(value.trim())
    setValue("")
    inputRef.current?.focus()
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex items-center gap-2 border-t border-border bg-card px-4 py-3">
      <button className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" aria-label="Attach file">
        <Paperclip className="size-4" />
      </button>
      <button className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" aria-label="Add emoji">
        <Smile className="size-4" />
      </button>
      <div className="relative flex-1">
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          disabled={disabled}
          className="h-10 w-full rounded-xl border border-border bg-muted/50 px-4 pr-10 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/30 focus:ring-1 focus:ring-primary/20 disabled:opacity-50"
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 flex size-6 items-center justify-center rounded-md text-muted-foreground hover:text-foreground transition-colors" aria-label="AI rewrite">
          <Wand2 className="size-3.5" />
        </button>
      </div>
      <Button size="icon" onClick={handleSend} disabled={!value.trim() || disabled} aria-label="Send message">
        <Send className="size-4" />
      </Button>
    </div>
  )
}
