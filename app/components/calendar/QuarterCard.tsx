import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Quarter } from "../../types/index";


const QuarterCard = ({ quarter }: { quarter: Quarter }) => {
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