'use client'

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Major } from "../../../types"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface Props {
  majors: Major[]
  handleMajorChange?: (value: string) => void
  isMinor?: boolean
}

export default function MajorSelect({ majors, handleMajorChange, isMinor = false }: Props) {
  const [open, setOpen] = React.useState(false)
  const [id, setId] = React.useState("")

  const validMajors = Array.isArray(majors) ? majors : [];

  const handleSelect = (currentValue: string) => {
    if (!currentValue) return;
    
    const selectedMajor = validMajors.find(major => major && major.name === currentValue);
    
    if (selectedMajor && selectedMajor.id) {
      const newId = selectedMajor.id === id ? "" : selectedMajor.id;
      setId(newId);
      handleMajorChange?.(newId);
    }
    setOpen(false);
  };

  const selectedMajor = validMajors.find(major => major && major.id === id);
  
  const formatName = (name: string | undefined): string => {
    if (!name) return ""; 
    
    if (isMinor) {
      return name.replace(/^Minor in\s+/i, '');
    } else {
      return name.includes('in') ? name.split(/in\s+/)[1] : name;
    }
  };

  const safeItems = validMajors
    .filter(item => {
      if (!(item && typeof item === 'object' && item.name && item.id)) {
        return false;
      }
      
      if (!isMinor && item.division !== 'Undergraduate') {
        return false;
      }
      
      return true;
    })
    .map(item => ({
      id: item.id,
      name: item.name,
      division: item.division
    }));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="mx-4 mt-2">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between !border-transparent !bg-dark-secondary hover:!bg-dark-accent !text-white"
        >
          {selectedMajor && selectedMajor.name
            ? formatName(selectedMajor.name)
            : isMinor ? "Choose minor..." : "Choose major..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={isMinor ? "Search minor..." : "Search major..."} />
          <CommandList>
            <CommandEmpty>{isMinor ? "No minor found." : "No major found."}</CommandEmpty>
            <CommandGroup>
              {safeItems.length > 0 ? (
                // only attempt sorting if we have items
                safeItems
                  .sort((a, b) => {
                    if (!a || !b) return 0;
                    const aName = formatName(a.name);
                    const bName = formatName(b.name);
                    if (typeof aName === 'string' && typeof bName === 'string') {
                      return aName.localeCompare(bName);
                    }
                    return 0;
                  })
                  .map((major) => (
                    <CommandItem
                      key={major.id}
                      value={major.name}
                      onSelect={handleSelect}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          id === major.id ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {formatName(major.name)}
                    </CommandItem>
                  ))
              ) : (
                <div className="py-6 text-center text-sm">
                  {isMinor ? "No minors available" : "No majors available"}
                </div>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}