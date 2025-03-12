import React, { useState } from 'react'
import { Requirement, GroupRequirement } from "../../types"
import ClassSelectionChunk from './ClassChunk';
import { ChevronDown } from 'lucide-react';

interface Props {
  Requirements: Requirement[];
  addCourse: (yearId: string, quarterId: string, newCourse: string) => void;
  removeCourse: (yearId: string, quarterId: string, courseId: string) => void;
}

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
      // For requirements with multiple options, add any current group first
      if (currentGroup && currentGroup.requirements.length > 0) {
        processedRequirements.push(currentGroup);
        currentGroup = null;
      }
      
      // Add the multi-option requirement as is
      processedRequirements.push(requirement);
    }
  });
  
  // Don't forget to add the last group if it exists
  if (currentGroup && currentGroup.requirements.length > 0) {
    processedRequirements.push(currentGroup);
  }

  return (
    <div className="h-[79vh] overflow-y-auto ml-2">
      {/* Parse through each processed Requirement */}
      {processedRequirements.map((requirement: any, index) => {
        const normalizedLabel = requirement.label.toUpperCase().replace(/\s+/g, '');

        {/* Check if the heading of the course area is the same. if it is, it just deletes it */}
        const isMatch = requirement.courses && requirement.courses.some((course: Requirement) =>
          normalizedLabel === course
        );

        {/* Group Requirement, need to recursive */ }
        if (requirement.requirementType === 'Group') {
          const groupRequirement = requirement;
          const isOpen = openSections[index] ?? false; // Default to closed
          
          return (
            <div key={index} className='py-2'>
              {!isMatch && (
                <div>
                  <button 
                    onClick={() => toggleSection(index)}
                    className="flex justify-between items-center w-full text-left hover:bg-neutral-700/20 rounded-md p-2 transition-colors duration-150"
                  >
                    <h3 className="font-semibold text-2xl">{groupRequirement.label}</h3>
                    <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
                  </button>
                  
                  {isOpen && (
                    <div className='bg-dark-secondary rounded-lg mt-1 overflow-hidden transition-all duration-200'>
                      {groupRequirement.requirements.map((childRequirement:Requirement, childIndex: React.Key | null | undefined) => (
                        <div key={childIndex} className='ml-4 py-2'>
                          <ClassSelectionChunk 
                            requirement={childRequirement} 
                            groupRequirement={true} 
                            addCourse={addCourse} 
                            removeCourse={removeCourse}
                            depth={0}
                            parentKey={`${index}-${childIndex}`}
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

        {/* Normal Requirement*/ }
        return (
          <div key={index} className=''>
            <ClassSelectionChunk 
              requirement={requirement} 
              groupRequirement={false} 
              addCourse={addCourse} 
              removeCourse={removeCourse}
              parentKey={`top-${index}`}
            />
          </div>
        );
      })}
    </div>
  )
}

export default ClassSelection