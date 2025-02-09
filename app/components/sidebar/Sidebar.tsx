// app/components/sidebar/Sidebar.tsx
import React, { Suspense } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MajorSection from './MajorSection'
import { fetchMajorClasses } from '@/app/actions/majorActions'

const Sidebar = async () => {
  const res = await fetch('https://anteaterapi.com/v2/rest/programs/majors');
  const majors = await res.json();

  return (
    <Tabs defaultValue="Major" className="w-full">
      <TabsList className='w-full !bg-dark-secondary mx-2'>
        <TabsTrigger value="Major" className='px-10'>Major</TabsTrigger>
        <TabsTrigger value="Minor" className='px-10'>Minor</TabsTrigger>
        <TabsTrigger value="GEs" className='px-10'>GEs</TabsTrigger>
      </TabsList>
      <TabsContent value="Major">
        <Suspense fallback={<div>Loading major section...</div>}>
          <MajorSection 
            majors={majors.data} 
            fetchMajorClasses={fetchMajorClasses}
          />
        </Suspense>
      </TabsContent>
      <TabsContent value="Minor">Change your password here.</TabsContent>
      <TabsContent value="GEs">GEs</TabsContent>
    </Tabs>
  )
}

export default Sidebar