"use client"

import { useEffect, useState } from 'react';
import Toolbar from './Toolbar';
import CoursePlanner from './calendar/CoursePlanner';
import Sidebar from './sidebar/Sidebar';
import { Year } from "../types/index";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { toast } from 'sonner';
import {TriangleAlert} from 'lucide-react';
import { prismaUpdatePlanner } from '../actions/planner/updatePlanner';

interface Props {
    loadedPlanner?: Year[];
    userId?: string;
}

export default function Root( { loadedPlanner, userId }: Props ) {
  const [years, setYears] = useState<Year[]>([
    {
      id: '1',
      quarters: [
        { id: 'Fall', courses: [] },
        { id: 'Winter', courses: [] },
        { id: 'Spring', courses: [] },
        { id: 'Summer', courses: [] },
      ]
    },
    {
      id: '2',
      quarters: [
        { id: 'Fall', courses: [] },
        { id: 'Winter', courses: [] },
        { id: 'Spring', courses: [] },
        { id: 'Summer', courses: [] },
      ]
    },
    {
      id: '3',
      quarters: [
        { id: 'Fall', courses: [] },
        { id: 'Winter', courses: [] },
        { id: 'Spring', courses: [] },
        { id: 'Summer', courses: [] },
      ]
    },
    {
      id: '4',
      quarters: [
        { id: 'Fall', courses: [] },
        { id: 'Winter', courses: [] },
        { id: 'Spring', courses: [] },
        { id: 'Summer', courses: [] },
      ]
    },
  ]);
  
  useEffect(() => {
    if (loadedPlanner) {
      setYears(loadedPlanner.map((year) => ({
        id: year.yearNumber || year.id,
        quarters: year.quarters.map((quarter) => ({
          id: quarter.name || quarter.id,
          courses: quarter.courses || []
        }))
      })) as Year[]);
    }
  }, [loadedPlanner]);

  useEffect(() => {
    if (userId && years.length > 0) {
      prismaUpdatePlanner({years: years, userId: userId});
    }
  }, [years]);


  const addCourse = (yearId: string, quarterId: string, newCourse: string) => {

    // Need to check if course already in planner
    let existingLocation = null;
  
    for (const year of years) {
      for (const quarter of year.quarters) {
        if (quarter.courses.includes(newCourse)) {
          existingLocation = {
            yearNumber: year.id,
            quarterName: quarter.id
          };
          break;
        }
      }
      if (existingLocation) break;
    }
    
    // show detailed error message if course already exists
    if (existingLocation) {
      toast.error(
        `The course already exists in Year ${existingLocation.yearNumber}: ${existingLocation.quarterName}`,
        {
          description: `Cannot add duplicate courses.`,
          icon: <TriangleAlert size={16}/>,
        }
      );
      return;
    }

    setYears(prevYears => 
      prevYears.map(year => {
        if (year.id !== yearId) return year;
        return {
          ...year,
          quarters: year.quarters.map(quarter => {
            if (quarter.id !== quarterId) return quarter;
              return {
              ...quarter,
              courses: [...quarter.courses, newCourse]
            };
          })
        };
      })
    );
  };

  
  const removeCourse = (yearId: string, quarterId: string, courseId: string) => {
    setYears(prevYears =>
      prevYears.map(year => {
        if (year.id !== yearId) return year;
        return {
          ...year,
          quarters: year.quarters.map(quarter => {
            if (quarter.id !== quarterId) return quarter;
            return {
              ...quarter,
              courses: quarter.courses.filter(course => course !== courseId)
            };
          })
        };
      })
    );
  };
  
  return (
    <div className=' h-screen overflow-hidden'>
      <Toolbar />
      <ResizablePanelGroup direction="horizontal" className='min-w-[450px]'>

        <ResizablePanel defaultSize={60}>
          <CoursePlanner years={years} addCourse={addCourse} removeCourse={removeCourse}/>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={40} minSize={27}><Sidebar addCourse={addCourse} removeCourse={removeCourse}/></ResizablePanel>
      </ResizablePanelGroup>
    </div>

  );
}
