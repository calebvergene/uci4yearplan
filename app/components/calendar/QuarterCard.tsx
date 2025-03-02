import React from 'react'
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Quarter, Year } from "../../types/index";
import CourseButton from '../sidebar/CourseButton';

interface Props {
  year: Year;
  quarter: Quarter;
  addCourse: (yearId: string, quarterId: string, newCourse: string) => void;
  removeCourse: (yearId: string, quarterId: string, courseId: string) => void;
}

const QuarterCard = ({ year, quarter, addCourse, removeCourse }: Props) => {

  return (
    <div className='w-full'>
        <Card className="px-1 !bg-dark-accent !border-none min-w-50 rounded-md">
            <CardTitle className='font-medium py-1 mb-5 pl-4 mx-1 text-sm border-b border-dark-highlight flex row justify-between'>
              <div className='py-1'>{quarter.id}</div>
              <div className='flex row'>
                <button className='hover:bg-dark-highlight duration-100 rounded-md px-2 p-1'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-notebook"><path d="M2 6h4"/><path d="M2 10h4"/><path d="M2 14h4"/><path d="M2 18h4"/><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M16 2v20"/></svg>
                </button>
                <button className='hover:bg-dark-highlight duration-100 rounded-md px-2 p-1'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                </button>
              </div>
            </CardTitle>
            <div className='justify-center items-center'>
            <CardContent>
              <div className='flex flex-col items-center'>
                {quarter.courses.map((courseName: string) => (
                  <div key={courseName} className="py-1 w-full flex justify-center">
                    <CourseButton 
                      course={courseName} 
                      addCourse={addCourse} 
                      removeCourse={removeCourse} 
                      inCalendar={true}
                      year={year.id}
                      season={quarter.id}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
            </div>
          </Card>
    </div>
  )
}

export default QuarterCard