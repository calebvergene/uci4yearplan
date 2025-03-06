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

const MAX_DISPLAY_ITEMS = 10;
const MIN_SEARCH_CHARS = 2;

interface SearchModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SearchModal = ({ open, setOpen }: SearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredDepartments, setFilteredDepartments] = useState<DepartmentSearchResult[]>(departments.slice(0, MAX_DISPLAY_ITEMS));
  const [filteredCourses, setFilteredCourses] = useState<CourseSearchResult[]>(courses.slice(0, MAX_DISPLAY_ITEMS));

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  // Basic search function
  const getFilteredResults = () => {
    // If search query is empty or too short, return all departments
    if (!searchQuery || searchQuery.length < MIN_SEARCH_CHARS) {
      return {
        filteredDepartments: departments.slice(0, MAX_DISPLAY_ITEMS),
        filteredCourses: [] as CourseSearchResult[]
      };
    }

    const query = searchQuery.toLowerCase();

    // Filter departments - match on ID or name containing the query
    const filteredDepartments = departments
      .filter(dept => 
        dept.id.toLowerCase().includes(query)
      )
      .slice(0, MAX_DISPLAY_ITEMS);

    // Filter courses - match on ID or name containing the query
    const filteredCourses = courses
      .filter(course => 
        course.id.toLowerCase().includes(query)
      )
      .slice(0, MAX_DISPLAY_ITEMS);

    return { filteredDepartments, filteredCourses };
  };
  
  useEffect(() => {
    const { filteredDepartments: newDepartments, filteredCourses: newCourses } = getFilteredResults();
    setFilteredDepartments(newDepartments);
    setFilteredCourses(newCourses);
    console.log("Search query changed:", searchQuery);
    console.log("Filtered results:", newCourses);
  }, [searchQuery]);
  
  return (
    <CustomCommandDialog open={open} onOpenChange={setOpen}>
      <CustomCommandInput
        placeholder="Search for any course or school..."
        value={searchQuery}
        onValueChange={handleSearchChange}
      />
      <CustomCommandList>
        {filteredDepartments.length === 0 && filteredCourses.length === 0 ? (
          <CustomCommandEmpty>No results found.</CustomCommandEmpty>
        ) : (
          <>
            <CustomCommandGroup heading="Departments">
              {filteredDepartments.map(department => (
                <div key={department.id} className="item">
                  <CustomCommandItem>
                    <span className="text-xl mr-1">📂</span>
                    {department.id}: {department.name}
                  </CustomCommandItem>
                </div>
              ))}
            </CustomCommandGroup>
          
            {filteredCourses.length > 0 && (
              <>
                <CustomCommandSeparator />
                <CustomCommandGroup heading="Courses">
                  {filteredCourses.map(course => (
                    <div key={course.id} className="item">
                      <CustomCommandItem>
                        <span className="text-xl mr-1">📚</span>
                        {course.id}: {course.name}
                      </CustomCommandItem>
                    </div>
                  ))}
                </CustomCommandGroup>
              </>
            )}
          </>
        )}
      </CustomCommandList>
    </CustomCommandDialog>
  );
};

export default SearchModal;