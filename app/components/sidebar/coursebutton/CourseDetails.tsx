import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import CourseHistoryGrid from './CourseHistoryGrid'

interface Props {
    courseName: string;
    courseData: any;
    isLoading: boolean;
    error: string | null;
}

const CourseDetails = ({courseName, courseData, isLoading, error} : Props) => {
  return (
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
  )
}

export default CourseDetails