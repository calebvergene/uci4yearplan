"use client";

import { useState } from "react";
import { Year, Course } from "../../types/index";
import YearCard from "./YearCard";

const CoursePlanner = () => {
  const [years, setYears] = useState<Year[]>([
    {
      id: '1',
      quarters: [
        { id: 'Fall', courses: [] },
        { id: 'Winter', courses: [] },
        { id: 'Spring', courses: [] },
        { id: 'Summer', courses: [] },
      ]
    },
    {
      id: '2',
      quarters: [
        { id: 'Fall', courses: [] },
        { id: 'Winter', courses: [] },
        { id: 'Spring', courses: [] },
        { id: 'Summer', courses: [] },
      ]
    },
    {
      id: '3',
      quarters: [
        { id: 'Fall', courses: [] },
        { id: 'Winter', courses: [] },
        { id: 'Spring', courses: [] },
        { id: 'Summer', courses: [] },
      ]
    },
    {
      id: '4',
      quarters: [
        { id: 'Fall', courses: [] },
        { id: 'Winter', courses: [] },
        { id: 'Spring', courses: [] },
        { id: 'Summer', courses: [] },
      ]
    },
  ]);

  const addCourse = (yearId: string, quarterId: string, newCourse: Course) => {
    setYears(prevYears => 
      prevYears.map(year => {
        if (year.id !== yearId) return year;
        return {
          ...year,
          quarters: year.quarters.map(quarter => {
            if (quarter.id !== quarterId) return quarter;
              return {
              ...quarter,
              courses: [...quarter.courses, newCourse]
            };
          })
        };
      })
    );
  };
  
  const removeCourse = (yearId: string, quarterId: string, courseId: string) => {
    setYears(prevYears =>
      prevYears.map(year => {
        if (year.id !== yearId) return year;
        return {
          ...year,
          quarters: year.quarters.map(quarter => {
            if (quarter.id !== quarterId) return quarter;
            return {
              ...quarter,
              courses: quarter.courses.filter(course => course.id !== courseId)
            };
          })
        };
      })
    );
  };


  return (
      <div className="p-4 h-[90vh] overflow-y-scroll">
        {years.map((year: Year) => (
          <YearCard key={year.id} year={year} addCourse={addCourse} removeCourse={removeCourse}/>
        ))}
      </div>
  );
};

export default CoursePlanner;