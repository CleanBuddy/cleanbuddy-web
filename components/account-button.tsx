"use client"

import {
  BadgeCheck,
  LogOut,
  MoreVertical,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { signOut } from "@/lib/auth"
import { UserAvatar } from "@/components/ui/customer-and-user-avatar"
import { UserSettingsDialogContent } from "./dialogs/user-settings-dialog"
import { useDialog } from "./providers/dialog-provider"

interface AccountButtonProps {
  user: {
    name: string
    email: string
    avatar?: string
  }
  className?: string
}

export function AccountButton({ user, className }: AccountButtonProps) {
  const { openDialog } = useDialog()

  const handleLogout = async () => {
    await signOut()
  }

  const handleAccountSettings = () => {
    openDialog(<UserSettingsDialogContent user={user} />)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`flex items-center gap-2 px-2 ${className}`}
        >
          <UserAvatar author={user} size="sm" showTooltip={false} />
          <span className="hidden sm:inline text-sm font-medium truncate max-w-[120px]">
            {user.name}
          </span>
          <MoreVertical className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 rounded-lg"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <UserAvatar author={user} />
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.name}</span>
              <span className="text-muted-foreground truncate text-xs">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleAccountSettings}>
            <BadgeCheck className="mr-2 h-4 w-4" />
            Account Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
