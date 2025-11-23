"use client"

import { DialogDescription, DialogHeader, DialogTitle, DialogBody, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { toast } from "sonner"

interface FeedbackDialogContentProps {
  onClose?: () => void
  onDismiss?: () => void
}

export function FeedbackDialogContent({ onClose, onDismiss }: FeedbackDialogContentProps) {
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!message.trim() || loading) return

    setLoading(true)

    try {
      // TODO: Implement feedback submission mutation or API call
      toast.success("Thank you for your feedback!")
      onClose?.()
    } catch (error) {
      toast.error("Failed to submit feedback")
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Send Feedback</DialogTitle>
        <DialogDescription>
          Share your thoughts, suggestions, or report issues
        </DialogDescription>
      </DialogHeader>

      <DialogBody className="gap-6">
        <div className="grid gap-2">
          <Label htmlFor="feedback-message">Message</Label>
          <Textarea
            id="feedback-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tell us what's on your mind..."
            className="min-h-[120px] resize-none"
            disabled={loading}
          />
          <p className="text-xs text-muted-foreground">
            Press Cmd/Ctrl + Enter to submit
          </p>
        </div>
      </DialogBody>

      <DialogFooter>
        <Button variant="outline" onClick={() => onDismiss?.()} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={!message.trim() || loading}>
          {loading ? "Sending..." : "Send Feedback"}
        </Button>
      </DialogFooter>
    </>
  )
}
