import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const Sidebar = async () => {

  // Fetch majors
  // const res = await fetch('https://anteaterapi.com/v2/rest/programs/majors');
  // const majors = await res.json();
  // console.log(majors);

  return (
      <Tabs defaultValue="Major" className="w-full">
        <TabsList className='w-full !bg-dark-secondary mx-1 mt-1'>
          <TabsTrigger value="Major" className='px-10'>Major</TabsTrigger>
          <TabsTrigger value="Minor" className='px-10'>Minor</TabsTrigger>
        </TabsList>
        <TabsContent value="Major">Make changes to your account here.</TabsContent>
        <TabsContent value="Minor">Change your password here.</TabsContent>
      </Tabs>

  )
}

export default Sidebar