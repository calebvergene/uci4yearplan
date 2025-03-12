import React, { useState } from 'react'
import { Requirement, GroupRequirement } from "../../types"
import CourseButton from '../sidebar/coursebutton/CourseButton';
import { ChevronDown } from 'lucide-react';

interface Props {
  requirement: Requirement;
  groupRequirement?: boolean;
  addCourse: (yearId: string, quarterId: string, newCourse: string) => void;
  removeCourse: (yearId: string, quarterId: string, courseId: string) => void;
  depth?: number;
  parentKey?: string;
}

const ClassSelectionChunk = ({
  requirement,
  groupRequirement,
  addCourse,
  removeCourse,
  depth = 0,
  parentKey = ''
}: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const normalizedLabel = requirement.label.toUpperCase().replace(/\s+/g, '');
  const isMatch = requirement.courses && requirement.courses.some(course =>
    normalizedLabel === course
  );

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

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
          <div>
            <button 
              onClick={toggleOpen}
              className="flex justify-between items-center w-full text-left pl-2 pr-2 hover:bg-neutral-700/10 rounded-md transition-colors duration-150"
            >
              <h3 className="font-medium text-xl pt-2 pb-2">{groupReq.label}</h3>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
            </button>
            
            {isOpen && (
              <div className={`${getBgColor()} rounded-lg mt-1 transition-all duration-200`}>
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
                      parentKey={`${parentKey}-${index}`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Regular requirement
  return (
    <div className="transition-all duration-200 hover:bg-neutral-700/20 rounded-md overflow-hidden">
      {!isMatch && (
        <button 
          onClick={toggleOpen}
          className="flex justify-between items-center w-full text-left p-2"
        >
          <h3 className={`font-semibold text-lg pl-1 text-neutral-100`}>
            {requirement.label}
          </h3>
          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
        </button>
      )}

      {isOpen && requirement.courses && requirement.courses.length > 0 && (
        <div className="ml-2 border-l-2 border-neutral-600 pl-3 py-1 m-2">
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
                <CourseButton course={course} addCourse={addCourse} removeCourse={removeCourse} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ClassSelectionChunk