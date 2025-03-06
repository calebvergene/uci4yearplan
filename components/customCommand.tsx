"use client"

import React, { createContext, forwardRef, HTMLAttributes, ReactNode, ChangeEvent } from 'react'
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

export const CommandContext = createContext<{ open?: boolean }>({});

interface CommandDialogProps extends React.ComponentPropsWithoutRef<typeof Dialog> {
  children?: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CustomCommandDialog = ({ children, open, onOpenChange, ...props }: CommandDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden shadow-lg">
        <DialogTitle></DialogTitle>
        <CommandContext.Provider value={{ open }}>
          <div className="flex flex-col h-full max-h-[80vh]" {...props}>
            {children}
          </div>
        </CommandContext.Provider>
      </DialogContent>
    </Dialog>
  );
};

interface CommandInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value: string;
  onValueChange: (value: string) => void;
}

export const CustomCommandInput = forwardRef<HTMLInputElement, CommandInputProps>(
  ({ className, value, onValueChange, ...props }, ref) => {
    return (
      <div className="flex items-center px-3 border-b">
        <SearchIcon className="w-4 h-4 mr-2 opacity-50 shrink-0" />
        <input
          ref={ref}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onValueChange(e.target.value)}
          className={cn(
            "flex-1 h-11 bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
CustomCommandInput.displayName = "CustomCommandInput";

interface CommandListProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const CustomCommandList = forwardRef<HTMLDivElement, CommandListProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CustomCommandList.displayName = "CustomCommandList";

interface CommandEmptyProps extends HTMLAttributes<HTMLDivElement> {}

export const CustomCommandEmpty = forwardRef<HTMLDivElement, CommandEmptyProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("py-6 text-center text-sm", className)}
        {...props}
      />
    );
  }
);
CustomCommandEmpty.displayName = "CustomCommandEmpty";

interface CommandGroupProps extends HTMLAttributes<HTMLDivElement> {
  heading: string;
  children?: ReactNode;
}

export const CustomCommandGroup = forwardRef<HTMLDivElement, CommandGroupProps>(
  ({ className, heading, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("overflow-hidden p-1 px-2", className)}
        {...props}
      >
        <div className="text-xs font-medium text-muted-foreground py-1.5">
          {heading}
        </div>
        <div className="space-y-1">{children}</div>
      </div>
    );
  }
);
CustomCommandGroup.displayName = "CustomCommandGroup";

interface CommandItemProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const CustomCommandItem = forwardRef<HTMLDivElement, CommandItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CustomCommandItem.displayName = "CustomCommandItem";

interface CommandSeparatorProps extends HTMLAttributes<HTMLDivElement> {}

export const CustomCommandSeparator = forwardRef<HTMLDivElement, CommandSeparatorProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("-mx-1 h-px bg-border", className)}
        {...props}
      />
    );
  }
);
CustomCommandSeparator.displayName = "CustomCommandSeparator";

interface SearchIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const SearchIcon = ({ className }: SearchIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);