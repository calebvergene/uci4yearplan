import React, { useState } from 'react'
import { GroupRequirement, Requirement } from "../../types"
import CourseButton from '../sidebar/coursebutton/CourseButton';
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
  const processedRequirements: Requirement[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let currentGroup: any = null;

  // Process each requirement
  Requirements.forEach((requirement) => {
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
        currentGroup = {
          label: `Complete all of the following`,
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

  // Helper function to render a consistent course button view
  const renderCourseButtons = (requirement: Requirement) => {
    if (!requirement.courses || requirement.courses.length === 0) return null;

    return (
      <div className='duration-200 hover:bg-neutral-700/20 rounded-md py-1 ml-4'>
        <div className=" border-l-2 border-neutral-600 pl-3 pt-1 m-2 mb-3 ml-3">
          {requirement.courses.length > 1 ? (
            <h3 className="font-medium text-sm text-gray-300">
              <span className="inline-block bg-emerald-600 text-white px-2 py-0.5 rounded-full mr-2 text-xs">
                {requirement.courses.length}
              </span>
              Choose from the following options:
            </h3>
          ) : (
            <h3 className="font-medium text-sm text-gray-300">
              <span className="inline-block bg-emerald-600 text-white px-2 py-0.5 rounded-full mr-2 text-xs">
                1
              </span>
              Required:
            </h3>
          )}

          <div className="flex flex-row gap-x-2 flex-wrap mt-2 ">
            {requirement.courses.map((course: string, idx: number) => (
              <div key={idx} className="py-1">
                <CourseButton course={course} addCourse={addCourse} removeCourse={removeCourse} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-[79vh] overflow-y-auto ml-2">
      {processedRequirements.map((requirement: Requirement, index) => {
        const isOpen = openSections[index] ?? false;

        // For all requirements, use a consistent container style
        return (
          <div key={index} className="py-2">
            <div className="border-[2px] border-dark-accent rounded-md">
              {/* All requirement types get the same header styling */}
              <button
                onClick={() => toggleSection(index)}
                className="flex justify-between items-center w-full text-left rounded-md p-3 transition-colors duration-150 px-4"
              >
                <h3 className="font-semibold text-xl">{requirement.label}</h3>
                <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${!isOpen ? 'transform -rotate-90' : ''}`} />
              </button>

              {isOpen && (
                <div className="rounded-lg overflow-hidden transition-all duration-200 pb-3">
                  {/* For group requirements, render child requirements */}
                  {requirement.requirementType === 'Group' && requirement.requirements ? (
                    requirement.requirements.map((childReq: Requirement, childIdx: number) => (
                      <div key={childIdx} className="">
                        <div className="transition-all duration-200 rounded-md overflow-hidden">
                          {childReq.courses.length > 1 && (
                            <h3 className="font-semibold text-md pl-5 text-neutral-100 py-1 ml-1">
                              {childReq.label}
                            </h3>
                          )}
                          {renderCourseButtons(childReq)}
                        </div>
                      </div>
                    ))
                  ) : (
                    // For non-group requirements, directly render course buttons
                    renderCourseButtons(requirement)
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ClassSelection;