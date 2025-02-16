import React from 'react'
import { Requirement } from "../../types"
import CourseButton from './CourseButton';

interface Props {
    requirement: Requirement;
    groupRequirement?: boolean;
}

const ClassSelectionChunk = ( {requirement, groupRequirement}: Props) => {
  const normalizedLabel = requirement.label.toUpperCase().replace(/\s+/g, '');
  const isMatch = requirement.courses && requirement.courses.some(course => 
    normalizedLabel === course
  );
  return (
    <div>
      {!isMatch && <h3 className={`font-semibold text-xl pt-2 ${!groupRequirement ? 'pt-4' : ''}`}>{requirement.label}</h3>}
      {requirement.courses && requirement.courses.length > 1 && 
          <h3 className="font-medium pt-2"><span className='font-semibold'>({requirement.courses.length})</span> Choose from the following options:</h3>
        }
      {requirement.courses && requirement.courses.length === 1 && 
          <h3 className="font-medium pt-2"><span className='font-semibold'>({requirement.courses.length})</span> Required:</h3>
        }
      <div className='flex flex-row gap-x-2 flex-wrap'>
        {requirement.courses && requirement.courses.map((course, index) => (
          <div key={index} className="py-1"><CourseButton course={course}/></div>
        ))}
      </div>
      {requirement.courses && requirement.courses.length > 1 && !isMatch && !groupRequirement &&
          <div className="h-2"></div>
        }
    </div>
  )
}

export default ClassSelectionChunk