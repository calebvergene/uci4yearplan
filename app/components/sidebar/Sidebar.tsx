// app/components/sidebar/Sidebar.tsx
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MajorSection from './MajorSection'
import { fetchMajorClasses } from '@/app/actions/majorActions'

interface SearchParams {
  majorId?: string;
}

const Sidebar = async ({
  searchParams = {}
}: {
  searchParams?: SearchParams
} = {}) => {
  const res = await fetch('https://anteaterapi.com/v2/rest/programs/majors');
  const majors = await res.json();

  let initialMajorData;
  if (searchParams?.majorId) {
    initialMajorData = await fetchMajorClasses(searchParams.majorId);
  }

  return (
    <Tabs defaultValue="Major" className="w-full">
      <TabsList className='w-full !bg-dark-secondary mx-2'>
        <TabsTrigger value="Major" className='px-10'>Major</TabsTrigger>
        <TabsTrigger value="Minor" className='px-10'>Minor</TabsTrigger>
        <TabsTrigger value="GEs" className='px-10'>GEs</TabsTrigger>
      </TabsList>
      <TabsContent value="Major">
        <MajorSection 
          majors={majors.data} 
          initialMajorData={initialMajorData}
          fetchMajorClasses={fetchMajorClasses}
        />
      </TabsContent>
      <TabsContent value="Minor">Change your password here.</TabsContent>
      <TabsContent value="GEs">GEs</TabsContent>
    </Tabs>
  )
}

export default Sidebar