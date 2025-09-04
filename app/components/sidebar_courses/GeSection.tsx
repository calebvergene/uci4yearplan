import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { geReqsData } from '../../../scripts/generated/geData';
import CourseButton from '../sidebar/coursebutton/CourseButton';

// custom types for ges because they are all weird and nested
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

  // helper function to render course buttons
  const renderCourseButtons = (requirement: Requirement) => {
    if (!requirement.courses || requirement.courses.length === 0) return null;

    return (
      <div className='duration-200 hover:bg-neutral-700/20 rounded-md py-1 mx-4'>
        <div className={`${requirement.courses.length < 7 ? 'border-l-2 border-neutral-600' : ''} pl-3 pt-1 m-2 mb-3 ml-3`}>
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
                {requirement.courseCount}
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

  // render nested requirements recursively
  const renderNestedRequirements = (requirements: Requirement[], parentIndex: number) => {
    return requirements.map((childReq: Requirement, childIdx: number) => {
      const key = `${parentIndex}-${childIdx}`;
      const isSubsectionOpen = openSubsections[key] ?? false;

      // for Group type requirements, render expandable subsection
      if (childReq.requirementType === 'Group' && childReq.requirements) {
        return (
          <div key={childIdx} className="mx-4 border-[1px] border-dark-highlight bg-dark-accent/40 rounded-md mb-2">
            <button
              onClick={() => toggleSubsection(parentIndex, childIdx)}
              className="flex justify-between items-center w-full text-left rounded-md p-2 transition-colors duration-150 bg-dark-tertiary/40"
            >
              <h3 className="font-semibold text-sm items-center px-2">
                {childReq.label}
              </h3>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${!isSubsectionOpen ? 'transform -rotate-90' : ''}`} />
            </button>

            {isSubsectionOpen && (
              <div className="pl-2 mb-4">
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
              <h4 className="font-medium text-sm pl-6 text-neutral-100 pt-1">{childReq.label}</h4>
            )}
            {renderCourseButtons(childReq)}
          </div>
        );
      }
    });
  };

  return (
    <div className="h-[79vh] overflow-y-auto mx-4 w-full scrollbar-hide">
      {geReqsData.map((category: GroupGroupRequirement, index: number) => {
        const isOpen = openSections[index] ?? false;

        return (
            <div key={index} className="py-2">
            <div className="border border-dark-highlight rounded-md bg-dark-secondary">
              <button
                onClick={() => toggleSection(index)}
                className="flex justify-between items-center w-full text-left rounded-md p-4 transition-colors duration-150"
              >
                <div className="flex flex-row flex-nowrap items-center min-w-0">
                  
                  <h3 className="font-semibold text-md truncate">{category.label}</h3>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform duration-200 ml-2 flex-shrink-0 ${!isOpen ? 'transform -rotate-90' : ''}`} />
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