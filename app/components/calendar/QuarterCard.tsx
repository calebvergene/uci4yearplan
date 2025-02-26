import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Quarter } from "../../types/index";
import CourseButton from '../sidebar/CourseButton';

interface Props {
  quarter: Quarter;
  addCourse: (yearId: string, quarterId: string, newCourse: string) => void;
  removeCourse: (yearId: string, quarterId: string, courseId: string) => void;
}

const QuarterCard = ({ quarter, addCourse, removeCourse }: Props) => {

  return (
    <div className='w-full'>
        <Card className="px-1 !bg-dark-accent !border-none min-w-50">
            <CardHeader>
              <CardTitle>{quarter.id}</CardTitle>
            </CardHeader>
            <CardContent className='flex-col justify-center'>
              {quarter.courses.map((courseName: string) => (
                <div key={courseName} className="py-1"><CourseButton course={courseName} addCourse={addCourse} removeCourse={removeCourse}/></div>
              ))}
            </CardContent>
          </Card>
    </div>
  )
}

export default QuarterCard