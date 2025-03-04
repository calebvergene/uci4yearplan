'use client';

import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MajorSection from './major/MajorSection'
import { fetchMajorClasses } from '@/app/actions/anteaterapi/actions'
import { Skeleton } from '@/components/ui/skeleton';
import { Search } from 'lucide-react';

interface Props {
  addCourse: (yearId: string, quarterId: string, newCourse: string) => void;
  removeCourse: (yearId: string, quarterId: string, courseId: string) => void;
}


const Sidebar = ({ addCourse, removeCourse }: Props) => {
  const [majors, setMajors] = useState([]);

  useEffect(() => {
    const fetchMajors = async () => {
      const res = await fetch('https://anteaterapi.com/v2/rest/programs/majors');
      const data = await res.json();
      setMajors(data.data);
    };

    fetchMajors();
  }, []);

  return (
    <Tabs defaultValue="Major" className="w-full">
      <TabsList className='w-full !bg-dark-secondary mx-2 relative flex items-center'>
        {/* Centered tabs div taking full width */}
        <div className='w-11/12 flex justify-center'>
          <TabsTrigger value="Major" className='px-10 w-full'>Major</TabsTrigger>
          <TabsTrigger value="Minor" className='px-10 w-full'>Minor</TabsTrigger>
          <TabsTrigger value="GEs" className='px-10 w-full'>GEs</TabsTrigger>
        </div>

        <div className='w-1/12 ml-2 h-full flex items-center'>
          <button className='p-1.5 px-2 hover:bg-dark-accent rounded-md duration-150'>
            <Search size={16} />
          </button>
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
        <div className='mt-4 w-full flex justify-center'>
          <h1>Minors Feature Coming Soon...</h1>
        </div>
      </TabsContent>
      <TabsContent value="GEs">
        <div className='mt-4 w-full flex justify-center'>
          <h1>GEs Feature Coming Soon...</h1>
        </div>
      </TabsContent>
    </Tabs>
  )
}

export default Sidebar