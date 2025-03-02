import React from 'react'
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { CourseGrade } from '@/app/types';
import { Skeleton } from '@/components/ui/skeleton';
import { ZotisticsAreaGraph } from './ZotisticsAreaGraph';

interface Props {
    courseName: string;
    courseGrades: CourseGrade[] | null;
    isLoading: boolean;
    error: string | null;
}

const ZotisticsModal = ({courseName, courseGrades, isLoading, error} : Props) => {
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
            ) : courseGrades ? (
              <div>
                <ZotisticsAreaGraph data={courseGrades}/>
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

export default ZotisticsModal