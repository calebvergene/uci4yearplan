import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Quarter } from "../../types/index";

interface Props {
    quarter: Quarter;
}

const QuarterCard = ({ quarter }: Props) => {

  return (
    <div className='w-full'>
        <Card className="px-1 !bg-dark-accent !border-none min-w-50">
            <CardHeader>
              <CardTitle>{quarter.id}</CardTitle>
            </CardHeader>
            <CardContent className='flex justify-center'>
              {quarter.courses.map((courseName: string) => (
                <div key={courseName} className="py-1">{courseName}</div>
              ))}
            </CardContent>
          </Card>
    </div>
  )
}

export default QuarterCard