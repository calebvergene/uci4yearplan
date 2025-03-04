import React from 'react'
import { Requirement, GroupRequirement } from "../../types"
import CourseButton from './CourseButton';

interface Props {
    requirement: Requirement;
    groupRequirement?: boolean;
    addCourse: (yearId: string, quarterId: string, newCourse: string) => void;
    removeCourse: (yearId: string, quarterId: string, courseId: string) => void;
    depth?: number;
}

const ClassSelectionChunk = ({
  requirement, 
  groupRequirement, 
  addCourse, 
  removeCourse, 
  depth = 0
}: Props) => {
  const normalizedLabel = requirement.label.toUpperCase().replace(/\s+/g, '');
  const isMatch = requirement.courses && requirement.courses.some(course => 
    normalizedLabel === course
  );

  // recursive
  if (requirement.requirementType === 'Group') {
    const groupReq = requirement as unknown as GroupRequirement;
      const getBgColor = () => {
      if (depth % 3 === 0) return 'bg-dark-secondary';
      if (depth % 3 === 1) return 'bg-dark-secondary/70';
      return 'bg-dark-secondary/40';
    };
    
    return (
      <div className={`${groupRequirement ? 'rounded-none border-l-4 border-emerald-500' : 'py-3'} rounded-lg overflow-hidden`}>
        {!isMatch && (
          <div className=" pl-2">
            <h3 className="font-semibold text-xl pt-2 pb-2">{groupReq.label}</h3>
          </div>
        )}
        <div className={`${getBgColor()} rounded-lg`}>
          {groupReq.requirements.map((subRequirement, index) => (
            <div 
              key={index} 
              className={`pl-4 py-2`}
            >
              <ClassSelectionChunk 
                requirement={subRequirement} 
                groupRequirement={true}
                addCourse={addCourse} 
                removeCourse={removeCourse}
                depth={depth + 1}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  // Regular requirement rendering with improved visual hierarchy
  return (
    <div className="transition-all duration-200 hover:bg-neutral-700/20 p-2 rounded-md">
      {!isMatch && (
        <h3 className={`font-semibold text-lg ${!groupRequirement ? 'pl-2' : ''} text-neutral-100`}>
          {requirement.label}
        </h3>
      )}
      
      {requirement.courses && requirement.courses.length > 0 && (
        <div className="ml-2 border-l-2 border-neutral-600 pl-3 mt-2">
          {requirement.courses.length > 1 && (
            <h3 className="font-medium text-sm text-gray-300">
              <span className="inline-block bg-emerald-600 text-white px-2 py-0.5 rounded-full mr-2 text-xs">
                {requirement.courses.length}
              </span> 
              Choose from the following options:
            </h3>
          )}
          
          {requirement.courses.length === 1 && (
            <h3 className="font-medium text-sm text-gray-300">
              <span className="inline-block bg-emerald-600 text-white px-2 py-0.5 rounded-full mr-2 text-xs">
                1
              </span> 
              Required:
            </h3>
          )}
          
          <div className="flex flex-row gap-x-2 flex-wrap mt-2">
            {requirement.courses.map((course, index) => (
              <div key={index} className="py-1">
                <CourseButton course={course} addCourse={addCourse} removeCourse={removeCourse}/>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ClassSelectionChunk