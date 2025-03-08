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
  const [minSearchChars, setMinSearchCars] = useState<number>(2)


  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setSearchNoSpaceQuery(value.replace(/\s+/g, ""));
  };

  // Basic search function
  const getFilteredResults = () => {
    // If search query is empty or too short, return all departments
    if (!searchNoSpaceQuery || searchNoSpaceQuery.length < minSearchChars) {
      return {
        filteredDepartments: departments.slice(0, MAX_DISPLAY_ITEMS),
        filteredCourses: [] as CourseSearchResult[]
      };
    }

    const query = searchNoSpaceQuery.toLowerCase();

    // Filter departments - match on ID or name containing the query
    let filteredDepartments: DepartmentSearchResult[] = []

    if (tag === "" && query.length > 0) {
      filteredDepartments = departments
        .filter(dept =>
          dept.id.toLowerCase().includes(query)
        )
        .slice(0, MAX_DISPLAY_ITEMS);
    }

    // Filter courses - match on ID or name containing the query
    const filteredCourses = courses
      .filter(course => {
        const courseId = course.id.toLowerCase();
        return courseId.includes(tag.toLowerCase()) && courseId.includes(query.toLowerCase());
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
        setMinSearchCars = {setMinSearchCars}
      />
      <CustomCommandList>
        {(() => {
          if (filteredDepartments.length === 0 && filteredCourses.length === 0) {
            return <CustomCommandEmpty>No results found.</CustomCommandEmpty>;
          } else if (searchQuery.length < minSearchChars) {
            return;
          } else {
            return (
              <>
                {filteredDepartments.length > 0 && searchQuery.length > 0 && (
                  <div>
                    <CustomCommandGroup heading="Departments">
                      {filteredDepartments.map(department => (
                        <div key={department.id} className="item" onClick={() => onDepartmentClick(department.id)}>
                          <CustomCommandItem>
                            <span className="text-xl mr-1">📂</span>
                            {department.id}: {department.name}
                          </CustomCommandItem>
                        </div>
                      ))}
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