import React from 'react'
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import CourseHistoryGrid from './CourseHistoryGrid'
import { CourseData } from '@/app/types';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
    courseName: string;
    courseData: CourseData | null;
    isLoading: boolean;
    error: string | null;
}

const CourseDetails = ({courseName, courseData, isLoading, error} : Props) => {
  return (
    <DialogContent>
          <DialogHeader>
            <DialogTitle>Course: {courseName}</DialogTitle>
            {isLoading ? (
                <div className="flex flex-col space-y-3">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-10/12 mt-2" />
                    <Skeleton className="h-4 w-11/12"/>
                    <Skeleton className="h-4 w-11/12"/>
                  </div>
                  <Skeleton className="h-[175px] w-11/12 rounded-xl mt-2" />
                </div>
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
  )
}

export default CourseDetails