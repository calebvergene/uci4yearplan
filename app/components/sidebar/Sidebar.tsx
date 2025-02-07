import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MajorSection from './MajorSection'

const Sidebar = async () => {

  // Fetch majors
  // const res = await fetch('https://anteaterapi.com/v2/rest/programs/majors');
  // const majors = await res.json();
  // console.log(majors);

  return (
      <Tabs defaultValue="Major" className="w-full">
        <TabsList className='w-full !bg-dark-secondary mx-3 mt-1'>
          <TabsTrigger value="Major" className='px-10'>Major</TabsTrigger>
          <TabsTrigger value="Minor" className='px-10'>Minor</TabsTrigger>
          <TabsTrigger value="GEs" className='px-10'>GEs</TabsTrigger>
        </TabsList>
        <TabsContent value="Major"> <MajorSection/> </TabsContent>
        <TabsContent value="Minor">Change your password here.</TabsContent>
        <TabsContent value="GEs">GEs</TabsContent>
      </Tabs>

  )
}

export default Sidebar