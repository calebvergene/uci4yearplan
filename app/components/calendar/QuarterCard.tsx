import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Quarter, Course } from "../../types/index";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";

interface Props {
    quarter: Quarter;
    addCourse: (yearId: string, quarterId: string, newCourse: Course) => void;
    removeCourse: (yearId: string, quarterId: string, courseId: string) => void;
}

const QuarterCard = ({ quarter, addCourse, removeCourse }: Props) => {

  return (
    <div className='w-full'>
        <Card className="px-1 !bg-dark-accent !border-none min-w-50">
            <CardHeader>
              <CardTitle>{quarter.id}</CardTitle>
            </CardHeader>
            <CardContent className='flex justify-center'>
              Test
            </CardContent>
          </Card>
    </div>
  )
}

export default QuarterCard