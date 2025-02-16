import React from 'react'
import { Requirement, GroupRequirement } from "../../types"
import ClassSelectionChunk from './ClassChunk';

interface Props {
    Requirements: Requirement[];
}

const ClassSelection = ({Requirements}: Props) => {
  return (
    <div className="h-[77vh] overflow-y-auto">
      <h1 className='font-semibold text-4xl mb-2 text-decoration-line: underline'>Major Requirements</h1>

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
            <div key={index} className='py-6'>
              {!isMatch && <h3 className="font-semibold text-2xl mb-1">{groupRequirement.label}</h3>}
              {groupRequirement.requirements.map((requirement, index) => (
                <div key={index} className='pl-4 border-l'>
                  <ClassSelectionChunk requirement={requirement} groupRequirement={true}/>
              </div>
              ))}
            </div>
          );
        }

        {/* Normal Requirement*/}
        return (
          <div key={index} className=''>
            <ClassSelectionChunk requirement={requirement} groupRequirement={false} />
          </div>
        );
      })}

    </div>
  )
}

export default ClassSelection