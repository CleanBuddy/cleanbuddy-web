"use client"

import React, { createContext, useContext, useState, ReactNode, ReactElement } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

// Base interface for dialog props that includes dismiss methods
export interface IDialogBaseProps<TOutput> {
  onClose?: (data: TOutput) => void
  onDismiss?: () => void
}

// Dialog context interface
interface DialogContextType {
  openDialog: <TOutput, T extends IDialogBaseProps<TOutput>>(
    dialogElement: ReactElement<T>,
    props?: Omit<T, keyof IDialogBaseProps<TOutput>> & {
      size?: 'sm' | 'md' | 'lg' | 'xl' | 'wide'
    }
  ) => Promise<TOutput>
  closeDialog: () => void
  isOpen: boolean
}

// Create context
const DialogContext = createContext<DialogContextType | undefined>(undefined)

// Provider props
interface DialogProviderProps {
  children: ReactNode
}

// Dialog stack item
interface DialogStackItem {
  id: string
  element: ReactElement
  size: 'sm' | 'md' | 'lg' | 'xl' | 'wide'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolve: (value: any) => void
  reject: () => void
}

// Dialog provider component
export function DialogProvider({ children }: DialogProviderProps) {
  const [dialogStack, setDialogStack] = useState<DialogStackItem[]>([])

  const openDialog = <TOutput, T extends IDialogBaseProps<TOutput>>(
    dialogElement: ReactElement<T>,
    props: Omit<T, keyof IDialogBaseProps<unknown>> & {
      size?: 'sm' | 'md' | 'lg' | 'xl' | 'wide'
    } = {} as Omit<T, keyof IDialogBaseProps<unknown>> & {
      size?: 'sm' | 'md' | 'lg' | 'xl' | 'wide'
    }
  ): Promise<TOutput> => {
    return new Promise((resolve, reject) => {
      const dialogId = `dialog-${Date.now()}-${Math.random()}`

      const closeDialog = (output: TOutput) => {
        // Remove this dialog from the stack
        setDialogStack(prev => prev.filter(d => d.id !== dialogId))
        resolve(output)
      }

      const dismissDialog = () => {
        // Remove this dialog from the stack
        setDialogStack(prev => prev.filter(d => d.id !== dialogId))
        resolve(undefined as TOutput)
      }

      const size = props.size || 'sm'

      // Clone the dialog element and inject the dismiss methods
      const dialogWithProps = React.cloneElement(dialogElement, {
        onClose: closeDialog,
        onDismiss: dismissDialog,
        ...props,
      } as T)

      // Add new dialog to the stack
      setDialogStack(prev => [...prev, {
        id: dialogId,
        element: dialogWithProps,
        size,
        resolve,
        reject
      }])
    })
  }

  const closeDialog = () => {
    // Close the top-most dialog
    if (dialogStack.length > 0) {
      const topDialog = dialogStack[dialogStack.length - 1]
      topDialog.resolve(undefined)
      setDialogStack(prev => prev.slice(0, -1))
    }
  }

  const isOpen = dialogStack.length > 0

  return (
    <DialogContext.Provider
      value={{
        openDialog,
        closeDialog,
        isOpen,
      }}
    >
      {children}
      {dialogStack.map((dialog, index) => (
        <Dialog
          key={dialog.id}
          open={true}
          onOpenChange={(open) => {
            if (!open) {
              dialog.resolve(undefined)
              setDialogStack(prev => prev.filter(d => d.id !== dialog.id))
            }
          }}
        >
          <DialogContent
            className={`
              ${dialog.size === 'sm' ? 'sm:max-w-[425px]' :
                dialog.size === 'md' ? 'sm:max-w-[600px]' :
                dialog.size === 'lg' ? 'sm:max-w-[800px]' :
                dialog.size === 'xl' ? 'sm:max-w-[1600px]' :
                dialog.size === 'wide' ? 'max-w-6xl' :
                'sm:max-w-[1000px]'}
            `}
            style={{ zIndex: 50 + index }}
          >
            {dialog.element}
          </DialogContent>
        </Dialog>
      ))}
    </DialogContext.Provider>
  )
}

// Hook to use dialog context
export function useDialog() {
  const context = useContext(DialogContext)
  if (context === undefined) {
    console.error("DialogContext is undefined - DialogProvider may not be available") // Debug log
    throw new Error("useDialog must be used within a DialogProvider")
  }
  return context
}
