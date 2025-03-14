'use client'

import React from 'react'
import MajorSelect from './MajorSelect'
import { Major, ApiResponse } from "../../../types"
import ClassSelection from '../../sidebar_courses/ClassSelection'
import MajorSkeleton from './MajorSkeleton'
import { fetchMinorClasses } from '@/app/actions/anteaterapi/actions'

interface Props {
  majors: Major[];
  initialMajorData?: ApiResponse | null;
  fetchMajorClasses: (id: string) => Promise<ApiResponse>;
  addCourse: (yearId: string, quarterId: string, newCourse: string) => void;
  removeCourse: (yearId: string, quarterId: string, courseId: string) => void;
  minor?: boolean;
}

const MajorSection = ({ majors, initialMajorData, fetchMajorClasses, addCourse, removeCourse, minor = false }: Props) => {
  const [majorClasses, setMajorClasses] = React.useState<ApiResponse | null>(initialMajorData || null);
  const [isLoading, setIsLoading] = React.useState(false);


  const handleMajorChange = async (newId: string) => {
    
    if (!newId) {
      setMajorClasses(null);
      return;
    }

    setIsLoading(true);

    try {
      // fetch data for the new selection
      let data;
      if (minor) {
        data = await fetchMinorClasses(newId);
      } else {
        data = await fetchMajorClasses(newId);
      }
      setMajorClasses(data);
    } catch (error) {
      console.error(`Error fetching ${minor ? 'minor' : 'major'} classes:`, error);
      setMajorClasses(null);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <MajorSelect
        majors={majors}
        handleMajorChange={handleMajorChange}
        isMinor={minor}
      />

      {isLoading ? (
        <MajorSkeleton />
      ) : (
        majorClasses && majorClasses.data?.requirements?.length > 0 && (
          <div className="px-2 pt-3">
            <ClassSelection
              Requirements={majorClasses.data.requirements}
              addCourse={addCourse}
              removeCourse={removeCourse}
            />
          </div>
        )
      )}
    </div>
  )
}

export default MajorSection