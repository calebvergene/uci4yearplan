"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

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

interface Major {
    id: string,
    name: string,
    type: string,
    division: string,
    specializations: string[],
}

interface Props {
    majors: Major[]
}



export default function MajorSelect({ majors }: Props) {
    const [open, setOpen] = React.useState(false)
    const [id, setId] = React.useState("")
  
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="mx-2">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {id
              ? majors.find((major) => major.name === id)?.name
              : "Select major..."}
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
                                  onSelect={(currentValue) => {
                                      setId(currentValue === id ? "" : currentValue)
                                      setOpen(false)
                                  }}
                              >
                                  <Check
                                      className={cn(
                                          "mr-2 h-4 w-full",
                                          id === major.name ? "opacity-100" : "opacity-0"
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
