'use client';

import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MajorSection from './major/MajorSection'
import { fetchMajorClasses } from '@/app/actions/anteaterapi/actions'
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Command } from 'lucide-react';
import SearchModal from '../SearchModal';

interface Props {
  addCourse: (yearId: string, quarterId: string, newCourse: string) => void;
  removeCourse: (yearId: string, quarterId: string, courseId: string) => void;
}


const Sidebar = ({ addCourse, removeCourse }: Props) => {
  const [majors, setMajors] = useState([]);
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    const fetchMajors = async () => {
      const res = await fetch('https://anteaterapi.com/v2/rest/programs/majors');
      const data = await res.json();
      setMajors(data.data);
    };

    fetchMajors();
  }, []);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const onSearchClick = () => {
    setOpen((open) => !open)
  }

  return (
    <Tabs defaultValue="Major" className="w-full">
      <TabsList className='w-full !bg-dark-secondary rounded-none rounded-b-lg relative flex items-center gap-x-1'>

        <div className='w-8/12 flex justify-center'>
          <TabsTrigger value="Major" className='px-5 w-full'>Major</TabsTrigger>
          <TabsTrigger value="Minor" className='px-5 w-full'>Minor</TabsTrigger>
          <TabsTrigger value="GEs" className='px-5 w-full'>GEs</TabsTrigger>
        </div>
        <div className='w-1/12'></div>
        <div className='w-3/12 mr-3 h-full flex items-center justify-center'>

          <button onClick={onSearchClick} className='flex my-1 items-center mx-1 gap-2 py-1 px-3 bg-dark-secondary hover:bg-dark-accent rounded-md border border-dark-accent text-neutral-400 hover:text-white duration-150'>
            <Search size={16} className="text-neutral-500" />
            <span className='text-sm'>Search</span>
            <div className='flex items-center ml-1 bg-dark-accent px-1.5 py-0.5 rounded text-xs'>
              <Command size={10} className='mr-0.5' />
              <span>K</span>
            </div>
          </button>
          <SearchModal open={open} setOpen={setOpen} />
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