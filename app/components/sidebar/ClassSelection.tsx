import React from 'react'
import { Requirement, GroupRequirement } from "../../types"
import ClassSelectionChunk from './ClassChunk';

interface Props {
    Requirements: Requirement[];
    addCourse: (yearId: string, quarterId: string, newCourse: string) => void;
    removeCourse: (yearId: string, quarterId: string, courseId: string) => void;
}

const ClassSelection = ({Requirements, addCourse, removeCourse}: Props) => {
  return (
    <div className="h-[79vh] overflow-y-auto ml-2">
      {/* Parse through each first layer Requirement*/}
      {Requirements.map((requirement: Requirement, index) => {
        const normalizedLabel = requirement.label.toUpperCase().replace(/\s+/g, '');
        const isMatch = requirement.courses && requirement.courses.some(course => 
          normalizedLabel === course
        );

        {/* Group Requirement, need to recursive */}
        if (requirement.requirementType === 'Group') {
          const groupRequirement = requirement as unknown as GroupRequirement;
          return (
            <div key={index} className='py-2'>
              {!isMatch && <h3 className="font-semibold text-2xl mb-1">{groupRequirement.label}</h3>}
              <div className='bg-dark-secondary rounded-lg'>
              {groupRequirement.requirements.map((requirement, index) => (
                <div key={index} className='ml-4 py-2'>
                  <ClassSelectionChunk requirement={requirement} groupRequirement={true} addCourse={addCourse} removeCourse={removeCourse}/>
              </div>
              ))}
              </div>
            </div>
          );
        }

        {/* Normal Requirement*/}
        return (
          <div key={index} className=''>
            <ClassSelectionChunk requirement={requirement} groupRequirement={false} addCourse={addCourse} removeCourse={removeCourse}/>
          </div>
        );
      })}

    </div>
  )
}

export default ClassSelection