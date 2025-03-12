import React, { useState } from 'react'
import { Requirement, GroupRequirement } from "../../types"
import CourseButton from '../sidebar/coursebutton/CourseButton';
import { ChevronDown } from 'lucide-react';

interface Props {
  Requirements: Requirement[];
  addCourse: (yearId: string, quarterId: string, newCourse: string) => void;
  removeCourse: (yearId: string, quarterId: string, courseId: string) => void;
}

// Create a modified version of ClassSelectionChunk that's directly embedded
// to prevent the double nesting issue
const ClassSelection = ({ Requirements, addCourse, removeCourse }: Props) => {
  // Initialize all sections to be closed by default
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (index: number) => {
    setOpenSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Process requirements to group consecutive single-course requirements
  const processedRequirements: any[] = [];
  
  let currentGroup: any = null;
  let groupCount = 0;
  
  // Process each requirement
  Requirements.forEach((requirement, index) => {
    // Check if this is a single-course requirement
    const isSingleCourse = requirement.requirementType === 'Course' && 
                           requirement.courses && 
                           requirement.courses.length === 1;
    
    if (requirement.requirementType === 'Group') {
      // If we have an active group, add it to processed requirements
      if (currentGroup && currentGroup.requirements.length > 0) {
        processedRequirements.push(currentGroup);
        currentGroup = null;
      }
      
      // Add the group requirement as is
      processedRequirements.push(requirement);
    } 
    else if (isSingleCourse) {
      // Create a new group if needed
      if (!currentGroup) {
        groupCount++;
        currentGroup = {
          label: `Required Courses Group ${groupCount}`,
          requirementType: "Group",
          requirementCount: 0,
          requirements: []
        };
      }
      
      // Add the requirement to the current group
      currentGroup.requirements.push(requirement);
      currentGroup.requirementCount++;
    } 
    else {
      // For any other type of requirement, add any current group first
      if (currentGroup && currentGroup.requirements.length > 0) {
        processedRequirements.push(currentGroup);
        currentGroup = null;
      }
      
      // Add the requirement as is (including multi-option courses)
      processedRequirements.push(requirement);
    }
  });
  
  // Don't forget to add the last group if it exists
  if (currentGroup && currentGroup.requirements.length > 0) {
    processedRequirements.push(currentGroup);
  }

  // Helper function to render a direct course button view
  const renderCourseButtons = (requirement: any) => {
    if (!requirement.courses || requirement.courses.length === 0) return null;
    
    return (
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
          {requirement.courses.map((course: string, idx: number) => (
            <div key={idx} className="py-1">
              <CourseButton course={course} addCourse={addCourse} removeCourse={removeCourse} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="h-[79vh] overflow-y-auto ml-2">
      {processedRequirements.map((requirement: any, index) => {
        const normalizedLabel = requirement.label.toUpperCase().replace(/\s+/g, '');
        const isMatch = requirement.courses && requirement.courses.some((course: string) =>
          normalizedLabel === course
        );

        // Group requirements
        if (requirement.requirementType === 'Group') {
          const isOpen = openSections[index] ?? false;
          
          return (
            <div key={index} className='py-2'>
              {!isMatch && (
                <div>
                  <button 
                    onClick={() => toggleSection(index)}
                    className="flex justify-between items-center w-full text-left hover:bg-neutral-700/20 rounded-md p-2 transition-colors duration-150"
                  >
                    <h3 className="font-semibold text-2xl">{requirement.label}</h3>
                    <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
                  </button>
                  
                  {isOpen && (
                    <div className='bg-dark-secondary rounded-lg mt-1 overflow-hidden transition-all duration-200'>
                      {requirement.requirements.map((childReq: any, childIdx: number) => (
                        <div key={childIdx} className='ml-4 py-2'>
                          <div className="transition-all duration-200 hover:bg-neutral-700/20 rounded-md overflow-hidden">
                          {childReq.courses.length > 1 && (
                            <h3 className={`font-semibold text-lg pl-3 text-neutral-100 py-2`}>
                              {childReq.label}
                            </h3> )}
                            {renderCourseButtons(childReq)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        }
        
        // Course requirements (including multi-option ones)
        else if (requirement.requirementType === 'Course') {
          const isOpen = openSections[index] ?? true; // Default to open for individual courses
          
          return (
            <div key={index} className='py-2'>
              {!isMatch && (
                <div>
                  <button 
                    onClick={() => toggleSection(index)}
                    className="flex justify-between items-center w-full text-left hover:bg-neutral-700/20 rounded-md p-2 transition-colors duration-150"
                  >
                    <h3 className="font-semibold text-2xl">{requirement.label}</h3>
                    <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
                  </button>
                  
                  {isOpen && renderCourseButtons(requirement)}
                </div>
              )}
            </div>
          );
        }
        
        // Any other type of requirement
        else {
          return (
            <div key={index} className='py-2'>
              <div className="transition-all duration-200 hover:bg-neutral-700/20 rounded-md overflow-hidden">
                <h3 className={`font-semibold text-lg pl-3 text-neutral-100 py-2`}>
                  {requirement.label}
                </h3>
                {renderCourseButtons(requirement)}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default ClassSelection;