"use client"

import { DialogHeader, DialogTitle, DialogBody } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Pencil, Check, X, Trash2, AlertTriangle, Sun, Moon, Monitor } from "lucide-react"
import { useRouter } from "next/navigation"
import { useDeleteCurrentUserMutation, useUpdateCurrentUserMutation } from "@/lib/api/_gen/gql"
import { useTheme } from "next-themes"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface UserSettingsDialogContentProps {
  user?: {
    name: string
    email: string
  }
  onClose?: () => void
  onDismiss?: () => void
}

export function UserSettingsDialogContent({ user, onClose }: UserSettingsDialogContentProps) {
  const router = useRouter()
  const [displayName, setDisplayName] = useState(user?.name || "")
  const [savedDisplayName, setSavedDisplayName] = useState(user?.name || "")
  const [isEditingName, setIsEditingName] = useState(false)
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  const [deleteCurrentUser, { loading: deleteLoading }] = useDeleteCurrentUserMutation()
  const [updateCurrentUser] = useUpdateCurrentUserMutation()
  const { theme, setTheme } = useTheme()

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleUpdateUserName = async () => {
    if (!displayName.trim()) {
      toast.error("Display name cannot be empty")
      return
    }

    if (displayName === savedDisplayName) {
      setIsEditingName(false)
      return
    }

    setLoading(true)

    try {
      await updateCurrentUser({
        variables: {
          input: {
            displayName: displayName.trim(),
          },
        },
      })

      toast.success("Profile updated successfully")
      setSavedDisplayName(displayName.trim())
      setIsEditingName(false)
    } catch {
      toast.error("Failed to update profile")
      // Revert
      setDisplayName(savedDisplayName)
    } finally {
      setLoading(false)
    }
  }

  const handleCancelNameEdit = () => {
    setDisplayName(savedDisplayName)
    setIsEditingName(false)
  }

  const handleDeleteAccount = async () => {
    try {
      await deleteCurrentUser()

      toast.success("Account deleted successfully")
      onClose?.()

      // Sign out to clear all authentication data and navigate to home
      const { signOut } = await import("@/lib/auth")
      await signOut()
    } catch (error) {
      console.error("Failed to delete account:", error)
      toast.error("Failed to delete account. Please try again.")
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>User Settings</DialogTitle>
      </DialogHeader>

      <DialogBody className="gap-6">
        {/* Display Name Section */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Display Name</label>
            {isEditingName ? (
              <div className="flex items-center gap-2 mt-2">
                <Input
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleUpdateUserName()
                    if (e.key === 'Escape') handleCancelNameEdit()
                  }}
                  disabled={loading}
                  autoFocus
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 flex-shrink-0"
                  onClick={handleUpdateUserName}
                  disabled={loading}
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 flex-shrink-0"
                  onClick={handleCancelNameEdit}
                  disabled={loading}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2 mt-2">
                <p className="text-sm flex-1">{savedDisplayName}</p>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6 flex-shrink-0"
                  onClick={() => setIsEditingName(true)}
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Email Section (Read-only) */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <div className="flex items-center gap-2 mt-2">
              <p className="text-sm text-muted-foreground flex-1">{user?.email || ""}</p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Email cannot be changed
            </p>
          </div>
        </div>

        <Separator />

        {/* Appearance Section */}
        <div className="space-y-4">
          <div>
            <h4 className="text-base font-semibold">Appearance</h4>
            <p className="text-sm text-muted-foreground">
              Customize how the application looks on your device
            </p>
          </div>

          {mounted && (
            <RadioGroup
              value={theme}
              onValueChange={setTheme}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="light" id="light" />
                <Label
                  htmlFor="light"
                  className="flex items-center gap-2 cursor-pointer font-normal"
                >
                  <Sun className="h-4 w-4" />
                  Light
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dark" id="dark" />
                <Label
                  htmlFor="dark"
                  className="flex items-center gap-2 cursor-pointer font-normal"
                >
                  <Moon className="h-4 w-4" />
                  Dark
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="system" id="system" />
                <Label
                  htmlFor="system"
                  className="flex items-center gap-2 cursor-pointer font-normal"
                >
                  <Monitor className="h-4 w-4" />
                  System
                </Label>
              </div>
            </RadioGroup>
          )}
        </div>

        <Separator />

        {/* Danger Zone */}
        <div className="space-y-4">
          <div>
            <h4 className="text-base font-semibold">Danger Zone</h4>
            <p className="text-sm text-muted-foreground">
              Deleting your account is permanent and cannot be undone.
            </p>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                variant="destructive"
                className="w-full gap-2"
                disabled={deleteLoading}
              >
                <Trash2 className="h-4 w-4" />
                Delete Account...
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Delete Account
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete your account? This action cannot be undone and will permanently delete your profile, remove you from all teams, and delete all your data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  disabled={deleteLoading}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {deleteLoading ? "Deleting..." : "Delete Account"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </DialogBody>
    </>
  )
}
