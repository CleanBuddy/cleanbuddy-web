import { Check, Loader2, Lock, Filter } from "lucide-react"
import { Badge } from "./badge"
import { Button } from "./button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "./command"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Separator } from "./separator"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

interface MultiSelectFilterProps {
  title?: string
  options: {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
    count?: number
    disabled?: boolean
  }[]
  selectedValues?: string[]
  onSelectionChange?: (selectedValues: string[]) => void
  loading?: boolean
  disabled?: boolean
  icon?: React.ComponentType<{ className?: string }>
  showIndividualLabels?: boolean // New prop to control display behavior
  size?: "default" | "sm" // Size prop for the button
  showSearch?: boolean // New prop to control whether to show search input
}

export function MultiSelectFilter({
  title,
  options,
  selectedValues: externalSelectedValues,
  onSelectionChange,
  loading = false,
  disabled = false,
  icon: Icon,
  showIndividualLabels = false,
  size = "default",
  showSearch = true,
}: MultiSelectFilterProps) {
  const [internalSelectedValues, setInternalSelectedValues] = useState<string[]>([])
  const [open, setOpen] = useState(false)

  // Use external state if provided, otherwise use internal state
  const selectedValues = externalSelectedValues !== undefined
    ? new Set(externalSelectedValues)
    : new Set(internalSelectedValues)

  // Sync internal state when external state changes
  useEffect(() => {
    if (externalSelectedValues !== undefined) {
      setInternalSelectedValues(externalSelectedValues)
    }
  }, [externalSelectedValues])

  const handleSelectionChange = (newSelectedValues: string[]) => {
    if (onSelectionChange && !loading && !disabled) {
      onSelectionChange(newSelectedValues)
    } else if (!loading && !disabled) {
      setInternalSelectedValues(newSelectedValues)
    }
  }

  const handleOptionToggle = (optionValue: string) => {
    if (loading || disabled) return

    const newSelectedValues = new Set(selectedValues)
    if (newSelectedValues.has(optionValue)) {
      newSelectedValues.delete(optionValue)
    } else {
      newSelectedValues.add(optionValue)
    }
    handleSelectionChange(Array.from(newSelectedValues))
  }

  const handleClearFilters = () => {
    if (loading || disabled) return
    handleSelectionChange([])
  }

  // Determine which icon to show
  const getButtonIcon = () => {
    if (loading) {
      return <Loader2 className="h-4 w-4 animate-spin" />
    }
    if (Icon) {
      return <Icon className="h-4 w-4" />
    }
    if (disabled) {
      return <Lock className="h-4 w-4" />
    }
    // Don't show default filter icon if icon is explicitly undefined
    if (Icon === undefined) {
      return null
    }
    return <Filter className="h-4 w-4" />
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size={size}
          className={cn(size === "sm" ? "h-6" : "h-8", "border-dashed")}
          disabled={loading || disabled}
        >
          {getButtonIcon()}
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="ml-2 h-4" />
              <Badge
                variant="secondary"
                size={size}
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {showIndividualLabels ?
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => option.label)
                    .join(", ") || selectedValues.size
                  : selectedValues.size
                }
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {showIndividualLabels || selectedValues.size <= 2 ? (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        size={size}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                ) : (
                  <Badge
                    variant="secondary"
                    size={size}
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.size} selected
                  </Badge>
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          {showSearch && <CommandInput placeholder={title} disabled={loading || disabled} />}
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (!option.disabled && !loading && !disabled) {
                        handleOptionToggle(option.value)
                      }
                    }}
                    className={cn(
                      "cursor-pointer",
                      (option.disabled || loading || disabled) && "opacity-50 cursor-not-allowed text-muted-foreground"
                    )}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded border-2 transition-colors",
                        isSelected
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "border-muted-foreground/30 hover:border-muted-foreground/50"
                      )}
                    >
                      {isSelected && <Check className="h-3 w-3 text-white" />}
                    </div>
                    {option.icon && (
                      <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{option.label}</span>
                    {option.count !== undefined && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {option.count}
                      </span>
                    )}
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      if (!loading && !disabled) {
                        handleClearFilters()
                      }
                    }}
                    className="justify-center text-center cursor-pointer"
                    disabled={loading || disabled}
                  >
                    Remove all
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
