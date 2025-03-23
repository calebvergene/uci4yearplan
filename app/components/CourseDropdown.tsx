import React, { useState, useEffect } from 'react';
import { fetchCourseData, fetchZotisticsData } from '@/app/actions/anteaterapi/actions';
import { CourseData, CourseGrade } from '../types/index';
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
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
} from "@/components/ui/dialog";
import CourseDetails from './sidebar/coursebutton/CourseDetailsModal';
import ZotisticsModal from './sidebar/coursebutton/ZotisticsModal';

interface CourseDropdownProps {
  courseName: string;
  formattedCourseName: string;
  addCourse: (yearId: string, quarterId: string, newCourse: string) => void;
  removeCourse: (yearId: string, quarterId: string, courseId: string) => void;
  inCalendar?: boolean;
  year?: string;
  season?: string;
  buttonClassName?: string;
  customTrigger?: React.ReactNode;
}

export const CourseDropdown = ({ 
  courseName,
  formattedCourseName,
  addCourse,
  removeCourse,
  inCalendar,
  year,
  season,
  buttonClassName,
  customTrigger
}: CourseDropdownProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [gradesDialogOpen, setGradesDialogOpen] = useState(false);
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [courseGrades, setCourseGrades] = useState<CourseGrade[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onAddClick = (yearId: string, quarterId: string, Course: string) => {
    addCourse(yearId, quarterId, Course);
  };

  const onRemoveClick = () => {
    // only execute if we have both year and season
    if (inCalendar && year && season) {
      console.log(`Removing course ${courseName} from Year ${year}, ${season}`);
      removeCourse(year, season, courseName);
    } else {
      console.error('Cannot remove course: missing year or season information');
    }
  };

  // retrieve course data
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

  useEffect(() => {
    const loadCourseGrades = async () => {
      if (!gradesDialogOpen) return;

      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchZotisticsData(courseName);
        console.log(courseName);
        setCourseGrades(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load course grades');
        console.error('Error loading course grades:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (gradesDialogOpen) {
      loadCourseGrades();
    }
  }, [gradesDialogOpen, courseName]);

  // check if we can show the remove option (need inCalendar, year, and season)
  const canRemove = inCalendar && year && season;

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {customTrigger ? (
            customTrigger
          ) : (
            <button className={buttonClassName}>
              {formattedCourseName}
            </button>
          )}
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
                event.preventDefault();
                setDialogOpen(true);
              }}
            >
              View Course Details
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuItem
            onSelect={(event) => {
              event.preventDefault();
              setGradesDialogOpen(true);
            }}
          >
            View Zotistics
          </DropdownMenuItem>

          {canRemove && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onRemoveClick} className="text-red-500/90 hover:text-red-500 hover:bg-dark-highlight/85">
                Remove Course
                <DropdownMenuShortcut>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2">
                    <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" />
                  </svg>
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Separate Dialog for Course Details */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <CourseDetails courseName={courseName} courseData={courseData} isLoading={isLoading} error={error} />
      </Dialog>

      {/* Separate Dialog for Zotistics */}
      <Dialog open={gradesDialogOpen} onOpenChange={setGradesDialogOpen}>
        <ZotisticsModal courseName={courseName} courseGrades={courseGrades} isLoading={isLoading} error={error} />
      </Dialog>
    </div>
  );
};

export default CourseDropdown;