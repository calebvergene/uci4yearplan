'use client';

import Sidebar from './Sidebar';

interface Props {
  addCourse: (yearId: string, quarterId: string, newCourse: string) => void;
  removeCourse: (yearId: string, quarterId: string, courseId: string) => void;
}

export default function ClientSidebar({ addCourse, removeCourse }: Props) {
  return <Sidebar addCourse={addCourse} removeCourse={removeCourse} />;
}