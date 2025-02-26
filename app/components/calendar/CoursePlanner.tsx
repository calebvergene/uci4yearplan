"use client";

import { Year } from "../../types/index";
import YearCard from "./YearCard";

interface Props {
  years: Year[];
  addCourse: (yearId: string, quarterId: string, newCourse: string) => void;
  removeCourse: (yearId: string, quarterId: string, courseId: string) => void;
}

const CoursePlanner = ( {years, addCourse, removeCourse}: Props) => {

  return (
      <div className="p-4 h-[90vh] overflow-y-scroll">
        {years.map((year: Year) => (
          <YearCard key={year.id} year={year} addCourse={addCourse} removeCourse={removeCourse}/>
        ))}
      </div>
  );
};

export default CoursePlanner;