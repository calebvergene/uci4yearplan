"use client"

import { DialogTitle } from "@/components/ui/dialog"
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import React from 'react'

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const SearchModal = ({open, setOpen}: Props) => {
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
            <DialogTitle></DialogTitle>
            <CommandInput placeholder="Search for any course or school..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>Calendar</CommandItem>
                <CommandItem>Search Emoji</CommandItem>
                <CommandItem>Calculator</CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandDialog>
  )
}

export default SearchModal