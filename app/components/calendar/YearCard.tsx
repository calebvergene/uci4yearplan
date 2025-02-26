import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Year, Quarter } from "../../types/index";
import QuarterCard from './QuarterCard';

interface Props {
  year: Year;
  addCourse: (yearId: string, quarterId: string, newCourse: string) => void;
  removeCourse: (yearId: string, quarterId: string, courseId: string) => void;
}

const YearCard = ({ year, addCourse, removeCourse }: Props) => {
  return (
    <div>
        <Card className="m-5 !bg-dark-secondary !border-none">
            <CardHeader>
              <CardTitle className='text-xl'>Year {year.id}</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="flex row gap-x-2">
              {year.quarters.map((quarter: Quarter) => (
                <QuarterCard key={quarter.id} quarter={quarter} addCourse={addCourse} removeCourse={removeCourse}/>
              ))}
            </div>
            </CardContent>
          </Card>
    </div>
  )
}

export default YearCard