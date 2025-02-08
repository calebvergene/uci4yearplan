import React from 'react'
import { Requirement } from "../../types"
import Course from './Course';

interface Props {
    Requirements: Requirement[];
}

const ClassSelection = ({Requirements}: Props) => {
  return (
    <div className="h-[77vh] overflow-y-auto">
      <h1 className='font-semibold text-4xl mb-2'>Major Requirements</h1>
      {Requirements.map((requirement: Requirement, index) => {
        const normalizedLabel = requirement.label.toUpperCase().replace(/\s+/g, '');
        const isMatch = requirement.courses && requirement.courses.some(course => 
          normalizedLabel === course
        );

        return (
          <div key={index} className=''>
            {!isMatch && <h3 className="font-semibold text-xl pt-8">{requirement.label}</h3>}
            {requirement.courses && requirement.courses.length > 1 && 
                <h3 className="font-medium pt-2"><span className='font-semibold'>({requirement.courses.length})</span> Choose from the following options:</h3>
              }
            {requirement.courses && requirement.courses.length === 1 && 
                <h3 className="font-medium pt-2"><span className='font-semibold'>({requirement.courses.length})</span> Required:</h3>
              }
            <div className='flex flex-row gap-x-2 flex-wrap'>
              {requirement.courses && requirement.courses.map((course, index) => (
                <div key={index} className="py-1"><Course course={course}/></div>
              ))}
            </div>
            {requirement.courses && requirement.courses.length > 1 && 
                <div className="h-4"></div>
              }
          </div>
        );
      })}
    </div>
  )
}

export default ClassSelection