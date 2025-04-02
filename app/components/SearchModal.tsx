"use client"

import React, { useEffect, useState } from 'react'
import { courses, departments, CourseSearchResult, DepartmentSearchResult } from '../../scripts/generated/searchData';
import {
  CustomCommandDialog,
  CustomCommandInput,
  CustomCommandList,
  CustomCommandEmpty,
  CustomCommandGroup,
  CustomCommandItem,
  CustomCommandSeparator
} from '../../components/customCommand';
import CourseDropdown from './CourseDropdown';

const MAX_DISPLAY_ITEMS = 10;

// ********* department shortcuts mapping - SIMPLE direct mappings
const DEPARTMENT_SHORTCUTS: Record<string, string> = {
  "ICS": "I&C SCI",
  "CS": "COMPSCI",
  "BIO": "BIO SCI",
  "ESS": "EARTHSS",
  "INF": "IN4MATX",
};

interface SearchModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  addCourse: (yearId: string, quarterId: string, newCourse: string) => void;
  removeCourse: (yearId: string, quarterId: string, courseId: string) => void;
}

const SearchModal = ({ open, setOpen, addCourse, removeCourse }: SearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchNoSpaceQuery, setSearchNoSpaceQuery] = useState<string>('');
  const [filteredDepartments, setFilteredDepartments] = useState<DepartmentSearchResult[]>(departments.slice(0, MAX_DISPLAY_ITEMS));
  const [filteredCourses, setFilteredCourses] = useState<CourseSearchResult[]>(courses.slice(0, MAX_DISPLAY_ITEMS));
  const [tag, setTag] = useState<string>('');
  const [minSearchChars, setMinSearchCars] = useState<number>(1)

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setSearchNoSpaceQuery(value.replace(/\s+/g, ""));
  };

  // Expand a search query to include department shortcuts
  const expandSearchQuery = (query: string): string[] => {
    const result = [query.toLowerCase()];
    
    // Check if the query matches any shortcut
    Object.entries(DEPARTMENT_SHORTCUTS).forEach(([shortcut, deptId]) => {
      // If query is or starts with a shortcut, add the expanded form
      if (query.toLowerCase() === shortcut.toLowerCase() || 
          query.toLowerCase().startsWith(shortcut.toLowerCase())) {
        
        // Replace the shortcut part with the full department ID
        const expanded = query.toLowerCase().replace(
          shortcut.toLowerCase(), 
          deptId.toLowerCase()
        );
        result.push(expanded);
      }
      
      // If query is or starts with a department ID, add the shortcut form
      if (query.toLowerCase() === deptId.toLowerCase() || 
          query.toLowerCase().startsWith(deptId.toLowerCase())) {
        
        // Replace the department ID part with the shortcut
        const shortened = query.toLowerCase().replace(
          deptId.toLowerCase(), 
          shortcut.toLowerCase()
        );
        result.push(shortened);
      }
    });
    
    return result;
  };

  // search function
  const getFilteredResults = () => {
    // if search query is empty or too short, return all departments
    if (!searchNoSpaceQuery || searchNoSpaceQuery.length < minSearchChars) {
      return {
        filteredDepartments: departments.slice(0, MAX_DISPLAY_ITEMS),
        filteredCourses: [] as CourseSearchResult[]
      };
    }

    const query = searchNoSpaceQuery.toLowerCase();
    const expandedQueries = expandSearchQuery(query);

    // Filter departments
    let filteredDepartments: DepartmentSearchResult[] = []

    if (tag === "" && query.length > 0) {
      filteredDepartments = departments
        .filter(dept => {
          // Convert department ID to lowercase and remove all spaces
          const deptIdNoSpaces = dept.id.toLowerCase().replace(/\s+/g, '');
          
          // Check if department matches any of the expanded queries
          return expandedQueries.some(expandedQuery => 
            deptIdNoSpaces.includes(expandedQuery.replace(/\s+/g, ''))
          );
        })
        .slice(0, MAX_DISPLAY_ITEMS);
    }

    // Track if we have an exact match to a department or shortcut
    let exactDeptMatch: string | null = null;
    
    // Check if query exactly matches a department ID or shortcut
    if (query.length > 0) {
      // Direct department match
      const directMatch = departments.find(dept => 
        dept.id.toLowerCase().replace(/\s+/g, '') === query
      );
      
      if (directMatch) {
        exactDeptMatch = directMatch.id;
      } else {
        // Shortcut match
        Object.entries(DEPARTMENT_SHORTCUTS).forEach(([shortcut, deptId]) => {
          if (shortcut.toLowerCase() === query) {
            exactDeptMatch = deptId;
          }
        });
      }
    }

    // Filter courses
    const filteredCourses = courses
      .filter(course => {
        // Convert course ID to lowercase and remove all spaces
        const courseIdNoSpaces = course.id.toLowerCase().replace(/\s+/g, '');
        
        // If a tag is selected, only show courses from that department
        if (tag) {
          const expandedTags = expandSearchQuery(tag);
          const tagMatch = expandedTags.some(expandedTag => 
            courseIdNoSpaces.startsWith(expandedTag.replace(/\s+/g, ''))
          );
          
          // If query is empty, return all courses from the department
          if (query.length === 0) {
            return tagMatch;
          }
          
          // Otherwise, filter by both tag and query
          return tagMatch && courseIdNoSpaces.includes(query);
        }
        
        // If no tag is selected but we have an exact department match,
        // show all courses from that department
        if (exactDeptMatch) {
          const exactMatchNoSpaces = exactDeptMatch.toLowerCase().replace(/\s+/g, '');
          return courseIdNoSpaces.startsWith(exactMatchNoSpaces);
        }
        
        // Otherwise, match courses that contain any expanded query
        return expandedQueries.some(expandedQuery => {
          const expandedQueryNoSpaces = expandedQuery.replace(/\s+/g, '');
          return courseIdNoSpaces.includes(expandedQueryNoSpaces);
        });
      })
      .slice(0, MAX_DISPLAY_ITEMS);

    return { filteredDepartments, filteredCourses };
  };

  useEffect(() => {
    const { filteredDepartments: newDepartments, filteredCourses: newCourses } = getFilteredResults();
    setFilteredDepartments(newDepartments);
    setFilteredCourses(newCourses);
    console.log(filteredCourses)
  }, [searchNoSpaceQuery, tag]);

  const onDepartmentClick = (departmentId: string) => {
    setTag(departmentId);
    setSearchQuery('');
    setMinSearchCars(0);
    setFilteredDepartments([]);
  }

  return (
    <CustomCommandDialog open={open} onOpenChange={setOpen}>
      <CustomCommandInput
        placeholder={!tag ? ("Search for any course or school...") : ("")}
        value={searchQuery}
        onValueChange={handleSearchChange}
        tag={tag}
        setTag={setTag}
        setMinSearchCars={setMinSearchCars}
      />
      <CustomCommandList>
        {(() => {
          if (filteredDepartments.length === 0 && filteredCourses.length === 0) {
            return <CustomCommandEmpty>No results found.</CustomCommandEmpty>;
          } else if (searchQuery.length < minSearchChars && tag === "") {
            return;
          } else {
            return (
              <>
                {filteredDepartments.length > 0 && searchQuery.length > 0 && (
                  <div>
                    <CustomCommandGroup heading="Departments">
                      {filteredDepartments.map(department => {
                          const shortcuts = Object.entries(DEPARTMENT_SHORTCUTS)
                          .filter(([, deptId]) => deptId === department.id)
                          .map(([shortcut]) => shortcut);
                          
                        return (
                          <div key={department.id} className="item" onClick={() => onDepartmentClick(department.id)}>
                            <CustomCommandItem>
                              <span className="text-xl mr-1">📂</span>
                              {department.id}: {department.name}
                              {shortcuts.length > 0 && (
                                <span className="text-neutral-500 text-sm ml-2">
                                  (Shortcut: {shortcuts.join(", ")})
                                </span>
                              )}
                            </CustomCommandItem>
                          </div>
                        );
                      })}
                    </CustomCommandGroup>
                  </div>
                )}
                {filteredDepartments.length > 0 && filteredCourses.length > 0 && (
                  <CustomCommandSeparator />
                )}

                {filteredCourses.length > 0 && (
                  <>
                    <CustomCommandGroup heading="Courses">
                      {filteredCourses.map(course => (
                        <div key={course.id} className="item">
                          <CourseDropdown
                            courseName={course.id}
                            formattedCourseName={course.id}
                            addCourse={addCourse}
                            removeCourse={removeCourse}
                            customTrigger={
                              <CustomCommandItem>
                                <span className="text-xl mr-1">📚</span>
                                {course.id}: {course.name}
                              </CustomCommandItem>
                            }
                          />
                        </div>
                      ))}
                    </CustomCommandGroup>
                  </>
                )}
              </>
            );
          }
        })()}
      </CustomCommandList>
    </CustomCommandDialog>
  );
};

export default SearchModal;