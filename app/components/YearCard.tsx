import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


const YearCard = () => {
  return (
    <div>
        <Card className="m-5 !bg-dark-secondary !border-none">
            <CardHeader>
              <CardTitle> Year</CardTitle>
            </CardHeader>
            <CardContent>
              Test
            </CardContent>
          </Card>
    </div>
  )
}

export default YearCard