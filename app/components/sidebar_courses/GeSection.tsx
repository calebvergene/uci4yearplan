import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { geReqsData } from '../../../scripts/generated/geData'; // Import your GE requirements data
import CourseButton from '../sidebar/coursebutton/CourseButton'; // Assuming this component exists

// Define types based on your data structure
interface Requirement {
  label: string;
  requirementType: string;
  requirementCount?: number;
  courseCount?: number;
  courses?: string[];
  requirements?: Requirement[];
}

interface GroupGroupRequirement {
  label: string;
  requirementType: string;
  requirementCount: number;
  requirements: Requirement[];
}

interface Props {
  addCourse: (yearId: string, quarterId: string, newCourse: string) => void;
  removeCourse: (yearId: string, quarterId: string, courseId: string) => void;
}

const GERequirementsDropdown: React.FC<Props> = ({ addCourse, removeCourse }) => {
  // Initialize all sections to be closed by default
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [openSubsections, setOpenSubsections] = useState<Record<string, boolean>>({});

  const toggleSection = (index: number) => {
    setOpenSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const toggleSubsection = (sectionIndex: number, subsectionIndex: number) => {
    const key = `${sectionIndex}-${subsectionIndex}`;
    setOpenSubsections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Helper function to render course buttons
  const renderCourseButtons = (requirement: Requirement) => {
    if (!requirement.courses || requirement.courses.length === 0) return null;

    return (
      <div className='duration-200 hover:bg-neutral-700/20 rounded-md py-1 mx-4'>
        <div className="border-l-2 border-neutral-600 pl-3 pt-1 m-2 mb-3 ml-3">
          {requirement.courses.length > 1 ? (
            <h3 className="font-medium text-sm text-gray-300">
              <span className="inline-block bg-emerald-600 text-white px-2 py-0.5 rounded-full mr-2 text-xs">
                {requirement.courseCount || requirement.courses.length}
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

          <div className="flex flex-row gap-x-2 flex-wrap mt-2">
            {requirement.courses.map((course: string, idx: number) => (
              <div key={idx} className="py-1 text-base">
                <CourseButton course={course} addCourse={addCourse} removeCourse={removeCourse} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Render nested requirements recursively
  const renderNestedRequirements = (requirements: Requirement[], parentIndex: number) => {
    return requirements.map((childReq: Requirement, childIdx: number) => {
      const key = `${parentIndex}-${childIdx}`;
      const isSubsectionOpen = openSubsections[key] ?? false;

      // For Group type requirements, render expandable subsection
      if (childReq.requirementType === 'Group' && childReq.requirements) {
        return (
          <div key={childIdx} className="ml-4 mt-2">
            <button
              onClick={() => toggleSubsection(parentIndex, childIdx)}
              className="flex justify-between items-center w-full text-left rounded-md p-2 transition-colors duration-150 bg-dark-tertiary/40"
            >
              <h3 className="font-medium text-md">
                {childReq.requirementCount && childReq.requirementType === 'Group' && (
                  <span className="inline-block bg-blue-600 text-white px-2 py-0.5 rounded-full mr-2 text-xs">
                    {childReq.requirementCount}
                  </span>
                )}
                {childReq.label}
              </h3>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${!isSubsectionOpen ? 'transform -rotate-90' : ''}`} />
            </button>

            {isSubsectionOpen && (
              <div className="pl-2 pt-2">
                {childReq.requirements && renderNestedRequirements(childReq.requirements, childIdx)}
                {!childReq.requirements && renderCourseButtons(childReq)}
              </div>
            )}
          </div>
        );
      } else {
        // For Course type requirements, render course buttons directly
        return (
          <div key={childIdx} className="mt-1">
            {childReq.label && childReq.courses && childReq.courses.length > 0 && (
              <h4 className="font-medium text-sm pl-6 text-neutral-100 py-1">{childReq.label}</h4>
            )}
            {renderCourseButtons(childReq)}
          </div>
        );
      }
    });
  };

  return (
    <div className="h-[79vh] overflow-y-auto ml-2">
      {geReqsData.map((category: GroupGroupRequirement, index: number) => {
        const isOpen = openSections[index] ?? false;

        return (
          <div key={index} className="py-2">
            <div className="border-[1px] border-dark-highlight rounded-md bg-dark-secondary">
              <button
                onClick={() => toggleSection(index)}
                className="flex justify-between items-center w-full text-left rounded-md p-3 transition-colors duration-150 px-4"
              >
                <h3 className="font-semibold text-md">
                  {category.requirementCount > 0 && (
                    <span className="inline-block bg-indigo-600 text-white px-2 py-0.5 rounded-full mr-2 text-xs">
                      {category.requirementCount}
                    </span>
                  )}
                  {category.label}
                </h3>
                <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${!isOpen ? 'transform -rotate-90' : ''}`} />
              </button>

              {isOpen && (
                <div className="rounded-lg overflow-hidden transition-all duration-200 pb-3">
                  {category.requirements && renderNestedRequirements(category.requirements, index)}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GERequirementsDropdown;