import React, { useMemo } from 'react';
import { CourseDropdown } from '../../CourseDropdown';

interface CourseButtonProps {
  course: string;
  addCourse: (yearId: string, quarterId: string, newCourse: string) => void;
  removeCourse: (yearId: string, quarterId: string, courseId: string) => void;
  inCalendar?: boolean;
  year?: string;
  season?: string;
}

const bgColors = [
  "bg-blue-500/60",
  "bg-green-500/60",
  "bg-purple-500/60",
  "bg-indigo-500/60",
  "bg-emerald-500/60",
  "bg-teal-500/60",
  "bg-cyan-500/60",
];

const CourseButton = ({ 
  course: courseName, 
  addCourse, 
  removeCourse, 
  inCalendar, 
  year, 
  season 
}: CourseButtonProps) => {
  const formattedCourseName = formatCourseName(courseName);

  function formatCourseName(courseName: string) {
    const lastDigitIndex = courseName.search(/\d[^\d]*$/);
    if (lastDigitIndex === -1) {
      return courseName;
    }
    let firstDigitOfLastSequence = lastDigitIndex;
    while (
      firstDigitOfLastSequence > 0 &&
      /\d/.test(courseName[firstDigitOfLastSequence - 1])
    ) {
      firstDigitOfLastSequence--;
    }
    if (firstDigitOfLastSequence > 0) {
      return (
        courseName.substring(0, firstDigitOfLastSequence) +
        " " +
        courseName.substring(firstDigitOfLastSequence)
      );
    }
    return courseName;
  }

  const randomBgColor = useMemo(() => {
    if (inCalendar) {
      const randomIndex = Math.floor(Math.random() * bgColors.length);
      return bgColors[randomIndex];
    }
    return "bg-dark-highlight";
  }, [inCalendar]);

  const getHoverClass = () => {
    if (inCalendar) {
      return randomBgColor.replace("bg-", "hover:bg-") + "/35";
    }
    return "hover:bg-dark-highlight/85";
  };

  return (
    <CourseDropdown 
      courseName={courseName}
      formattedCourseName={formattedCourseName}
      addCourse={addCourse}
      removeCourse={removeCourse}
      inCalendar={inCalendar}
      year={year}
      season={season}
      buttonClassName={`${randomBgColor} ${getHoverClass()} px-3 py-1 rounded-md min-w-40`}
    />
  );
};

export default CourseButton;