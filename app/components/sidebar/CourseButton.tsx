import React, { useState, useEffect } from 'react'
import { fetchCourseData } from '@/app/actions/actions';
import { CourseData } from '../../types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
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
}

const CourseButton = ({ course: courseName, addCourse, removeCourse }: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [courseData, setCourseData] = useState<CourseData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onAddClick = (yearId: string, quarterId: string, Course: string) => {
    addCourse(yearId, quarterId, Course);
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
  
  return (
    <div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="bg-dark-highlight px-3 py-1 rounded-lg min-w-40 hover:bg-dark-highlight/85">
              {courseName}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
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
              <DropdownMenuItem 
                onSelect={(event) => {
                  event.preventDefault()
                  setDialogOpen(true)
                }}
              >
                View Course Details
              </DropdownMenuItem>
            </DropdownMenuGroup>
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