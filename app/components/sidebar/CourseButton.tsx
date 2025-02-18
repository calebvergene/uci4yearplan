import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
  
interface Props {
  course: string;
}

const CourseButton = ({ course: courseName }: Props) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="bg-dark-highlight px-3 py-1 rounded-lg min-w-40">
            {courseName}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Add to Planner</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>Year 1</DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuItem>Fall</DropdownMenuItem>
                                            <DropdownMenuItem>Winter</DropdownMenuItem>
                                            <DropdownMenuItem>Spring</DropdownMenuItem>
                                            <DropdownMenuItem>Summer</DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                            </DropdownMenuSub>
                            <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>Year 2</DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuItem>Fall</DropdownMenuItem>
                                            <DropdownMenuItem>Winter</DropdownMenuItem>
                                            <DropdownMenuItem>Spring</DropdownMenuItem>
                                            <DropdownMenuItem>Summer</DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                            </DropdownMenuSub>
                            <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>Year 3</DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuItem>Fall</DropdownMenuItem>
                                            <DropdownMenuItem>Winter</DropdownMenuItem>
                                            <DropdownMenuItem>Spring</DropdownMenuItem>
                                            <DropdownMenuItem>Summer</DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                            </DropdownMenuSub>
                            <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>Year 4</DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuItem>Fall</DropdownMenuItem>
                                            <DropdownMenuItem>Winter</DropdownMenuItem>
                                            <DropdownMenuItem>Spring</DropdownMenuItem>
                                            <DropdownMenuItem>Summer</DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                            </DropdownMenuSub>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem>
              Class Info
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default CourseButton