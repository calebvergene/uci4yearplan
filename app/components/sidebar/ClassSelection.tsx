import React from 'react'
import { Requirement, GroupRequirement } from "../../types"
import ClassSelectionChunk from './ClassChunk';

interface Props {
    Requirements: Requirement[];
}

const ClassSelection = ({Requirements}: Props) => {
  return (
    <div className="h-[77vh] overflow-y-auto">
      <h1 className='font-semibold text-4xl mb-2'>Major Requirements</h1>

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
            <div key={index} className=''>
              {!isMatch && <h3 className="font-semibold text-xl pt-8">{groupRequirement.label}</h3>}
              {groupRequirement.requirements.map((requirement, index) => (
                <div key={index}>
                  <ClassSelectionChunk {...requirement} />
              </div>
              ))}
            </div>
          );
        }

        {/* Normal Requirement*/}
        return (
          <div key={index} className=''>
            <ClassSelectionChunk {...requirement} />
          </div>
        );
      })}

    </div>
  )
}

export default ClassSelection