'use client';

import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MajorSection from './major/MajorSection'
import { fetchMajorClasses, fetchMinorClasses } from '@/app/actions/anteaterapi/actions'
import { Skeleton } from '@/components/ui/skeleton';
import GERequirementsDropdown from '../sidebar_courses/GeSection';


interface Props {
  addCourse: (yearId: string, quarterId: string, newCourse: string) => void;
  removeCourse: (yearId: string, quarterId: string, courseId: string) => void;
}


const Sidebar = ({ addCourse, removeCourse }: Props) => {
  const [majors, setMajors] = useState([]);
  const [minors, setMinors] = useState([]);


  useEffect(() => {
    const fetchMajors = async () => {
      const res = await fetch('https://anteaterapi.com/v2/rest/programs/majors');
      const data = await res.json();
      setMajors(data.data);
    };

    fetchMajors();
  }, []);

  useEffect(() => {
    const fetchMinors = async () => {
      const res = await fetch('https://anteaterapi.com/v2/rest/programs/minors');
      const data = await res.json();
      setMinors(data.data);
    };

    fetchMinors();
  }, []);

  return (
    <Tabs defaultValue="Major" className="w-full">
      <TabsList className='w-full !bg-dark-secondary rounded-none rounded-b-lg relative flex items-center gap-x-1'>
        <div className='w-full flex justify-center'>
          <TabsTrigger value="Major" className='px-5 w-full'>Major</TabsTrigger>
          <TabsTrigger value="Minor" className='px-5 w-full'>Minor</TabsTrigger>
          <TabsTrigger value="GEs" className='px-5 w-full'>GEs</TabsTrigger>
        </div>


      </TabsList>


      <TabsContent value="Major">
        {majors.length > 0 ? (
          <MajorSection
            majors={majors}
            fetchMajorClasses={fetchMajorClasses}
            addCourse={addCourse}
            removeCourse={removeCourse}
          />
        ) : (
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-4 w-full mt-2 ml-6" />
          </div>
        )}
      </TabsContent>
      <TabsContent value="Minor">
        {minors.length > 0 ? (
          <MajorSection
            majors={minors}
            fetchMajorClasses={fetchMinorClasses}
            addCourse={addCourse}
            removeCourse={removeCourse}
            minor={true}
          />
        ) : (
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-4 w-full mt-2 ml-6" />
          </div>
        )}
      </TabsContent>

      <TabsContent value="GEs">
        <div className='mt-4 w-full flex justify-center text-lg'>
          <GERequirementsDropdown addCourse={addCourse} removeCourse={removeCourse} />
        </div>
      </TabsContent>
    </Tabs>
  )
}

export default Sidebar