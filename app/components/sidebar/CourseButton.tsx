import React, { useState, useEffect, useMemo } from 'react'
import { fetchCourseData } from '@/app/actions/actions';
import { CourseData } from '../../types';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import CourseHistoryGrid from './CourseHistoryGrid';
  
interface Props {
  course: string;
  addCourse: (yearId: string, quarterId: string, newCourse: string) => void;
  removeCourse: (yearId: string, quarterId: string, courseId: string) => void;
  inCalendar?: boolean;
  year?: string;
  season?: string;
}

const CourseButton = ({ course: courseName, addCourse, removeCourse, inCalendar, year, season }: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [courseData, setCourseData] = useState<CourseData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Define an array of colorful background colors
  const bgColors = [
    "bg-blue-500/60",
    "bg-green-500/60",
    "bg-purple-500/60",
    "bg-yellow-500/60",
    "bg-orange-500/60",
    "bg-indigo-500/60",
    "bg-emerald-500/60",
    "bg-teal-500/60",
    "bg-cyan-500/60",
  ];

  // Use useMemo to pick a random color that stays consistent for this component instance
  const randomBgColor = useMemo(() => {
    if (inCalendar) {
      const randomIndex = Math.floor(Math.random() * bgColors.length);
      return bgColors[randomIndex];
    }
    return "bg-dark-highlight"; // Default color when not in calendar
  }, [inCalendar]);

  // Also define hover variants for the selected colors
  const getHoverClass = () => {
    if (inCalendar) {
      return randomBgColor.replace("bg-", "hover:bg-") + "/85";
    }
    return "hover:bg-dark-highlight/85";
  };

  const onAddClick = (yearId: string, quarterId: string, Course: string) => {
    addCourse(yearId, quarterId, Course);
  }

  const onRemoveClick = () => {
    // Only execute if we have both year and season
    if (inCalendar && year && season) {
      console.log(`Removing course ${courseName} from Year ${year}, ${season}`);
      removeCourse(year, season, courseName);
    } else {
      console.error('Cannot remove course: missing year or season information');
    }
  }

  useEffect(() => {
    const loadCourseData = async () => {
      if (!dialogOpen) return;
      
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchCourseData(courseName);
        setCourseData(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load course data');
        console.error('Error loading course data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (dialogOpen) {
      loadCourseData();
    }
  }, [dialogOpen, courseName]);
  
  // Check if we can show the remove option (need inCalendar, year, and season)
  const canRemove = inCalendar && year && season;
  
  return (
    <div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className={`${randomBgColor} ${getHoverClass()} px-3 py-1 rounded-lg min-w-40`}>
              {courseName}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              {!inCalendar && (
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Add to Planner</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      {["1", "2", "3", "4"].map((year) => (
                        <DropdownMenuSub key={`year-${year}`}>
                          <DropdownMenuSubTrigger>Year {year}</DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              {['Fall', 'Winter', 'Spring', 'Summer'].map((season) => (
                                <DropdownMenuItem key={`year-${year}-${season.toLowerCase()}`} onClick={() => onAddClick(year, season, courseName)}>
                                  {season}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              )}
              <DropdownMenuItem 
                onSelect={(event) => {
                  event.preventDefault()
                  setDialogOpen(true)
                }}
              >
                View Course Details
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuItem>
              View Zotistics
            </DropdownMenuItem>
            
            {canRemove && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onRemoveClick} className="text-red-500/90 hover:text-red-500 hover:bg-dark-highlight/85">
                  Remove Course
                  <DropdownMenuShortcut>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2">
                      <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>
                    </svg>
                  </DropdownMenuShortcut>
                </DropdownMenuItem> 
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Course: {courseName}</DialogTitle>
            {isLoading ? (
              <DialogDescription>
                Loading course information...
              </DialogDescription>
            ) : error ? (
              <DialogDescription className="text-red-500">
                Error: {error}
              </DialogDescription>
            ) : courseData ? (
              <div>
                {courseData.minUnits && (
                  <div className="mb-2 text-sm">
                     {courseData.minUnits}<span className="font-medium"> Units</span>
                  </div>
                )}
                <DialogDescription>
                  {courseData.description}
                </DialogDescription>
                {courseData.geText && <div className="mt-2 text-sm font-medium">GE: <span className='text-neutral-400'>{courseData.geText}</span></div>}
                <div className='mt-6'>Course Offerings History</div>
                <CourseHistoryGrid terms={courseData.terms} />
              </div>
            ) : (
              <DialogDescription>
                No information available for this course.
              </DialogDescription>
            )}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CourseButton