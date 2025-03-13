"use client"

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
}

export default function MajorSelect({ majors, handleMajorChange }: Props) {
  const [open, setOpen] = React.useState(false)
  const [id, setId] = React.useState("")

  const handleSelect = (currentValue: string) => {
    const selectedMajor = majors.find(major => major.name === currentValue);
    if (selectedMajor) {
      setId(selectedMajor.id === id ? "" : selectedMajor.id);
      handleMajorChange?.(selectedMajor.id);
    }
    setOpen(false);
  };

  const selectedMajor = majors.find(major => major.id === id);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="mx-4 mt-2">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between  !border-transparent !bg-dark-secondary hover:!bg-dark-accent !text-white"
        >

          {selectedMajor ? selectedMajor.name.includes('in') ? selectedMajor.name.split(/in\s+/)[1] :
            selectedMajor.name : "Choose major..."}

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search major..." />
          <CommandList>
            <CommandEmpty>No major found.</CommandEmpty>
            <CommandGroup>
              {majors
                .filter(major => major.division === 'Undergraduate')
                .sort((a, b) => {
                  const aName = a.name.includes('in') ? a.name.split(/in\s+/)[1] : a.name;
                  const bName = b.name.includes('in') ? b.name.split(/in\s+/)[1] : b.name;
                  return aName.localeCompare(bName);
                })
                .map((major) => {
                  const afterIn = major.name.includes('in') ?
                    major.name.split(/in\s+/)[1] :
                    major.name;

                  return (
                    <CommandItem
                      key={major.id}
                      value={major.name}
                      onSelect={handleSelect}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-full",
                          id === major.id ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {afterIn}
                    </CommandItem>
                  );
                })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}