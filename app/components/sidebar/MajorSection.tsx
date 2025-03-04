'use client'

import React from 'react'
import MajorSelect from './MajorSelect'
import { Major, ApiResponse } from "../../types"
import { useSearchParams } from 'next/navigation'
import ClassSelection from './ClassSelection'

interface Props {
  majors: Major[];
  initialMajorData?: ApiResponse | null;
  fetchMajorClasses: (id: string) => Promise<ApiResponse>;
  addCourse: (yearId: string, quarterId: string, newCourse: string) => void;
  removeCourse: (yearId: string, quarterId: string, courseId: string) => void;
}

const MajorSection = ({ majors, initialMajorData, fetchMajorClasses, addCourse, removeCourse }: Props) => {
  const [majorClasses, setMajorClasses] = React.useState<ApiResponse | null>(initialMajorData || null);
  const searchParams = useSearchParams();

  const currentMajorId = searchParams.get('majorId') || "";

  const handleMajorChange = async (newId: string) => {
    // if the same major is selected, clear it
    const actualId = newId === currentMajorId ? "" : newId;

    if (!actualId) {
      setMajorClasses(null);
      return;
    }

    try {
      // fetch data for the new selection
      const data = await fetchMajorClasses(actualId);
      setMajorClasses(data);
    } catch (error) {
      console.error('Error fetching major classes:', error);
      setMajorClasses(null);
    }
  }

  return (
    <div>
      <MajorSelect 
        majors={majors} 
        handleMajorChange={handleMajorChange}
      />
      {majorClasses && (
        <div className=" px-1 pt-3">
          <ClassSelection Requirements={majorClasses.data.requirements} addCourse={addCourse} removeCourse={removeCourse} />
        </div>
      )}
    </div>
  )
}

export default MajorSection