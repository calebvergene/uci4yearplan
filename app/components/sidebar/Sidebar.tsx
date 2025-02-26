'use client';

import React, { useEffect, useState, Suspense } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MajorSection from './MajorSection'
import { fetchMajorClasses } from '@/app/actions/actions'

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
      <TabsList className='w-full !bg-dark-secondary mx-2'>
        <TabsTrigger value="Major" className='px-10'>Major</TabsTrigger>
        <TabsTrigger value="Minor" className='px-10'>Minor</TabsTrigger>
        <TabsTrigger value="GEs" className='px-10'>GEs</TabsTrigger>
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
          <div>Loading major section...</div>
        )}
      </TabsContent>
      <TabsContent value="Minor">Change your password here.</TabsContent>
      <TabsContent value="GEs">GEs</TabsContent>
    </Tabs>
  )
}

export default Sidebar