"use client"

import { useEffect, useState } from 'react';
import Toolbar from './toolbar/Toolbar';
import CoursePlanner from './calendar/CoursePlanner';
import Sidebar from './sidebar/Sidebar';
import { Year } from "../types/index";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { toast } from 'sonner';
import { TriangleAlert, ChevronDown, ChevronUp } from 'lucide-react';
import { prismaUpdatePlanner } from '../actions/planner/updatePlanner';
import { motion } from 'framer-motion';

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
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // Default to mobile for initial render
  const [hasCheckedMobile, setHasCheckedMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Check if the screen is mobile sized
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setHasCheckedMobile(true);
    };
    
    // Check on initial load
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up the event listener
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  useEffect(() => {
    if (loadedPlanner) {
      setYears(loadedPlanner.map((year) => ({
        id: year.yearNumber || year.id,
        quarters: year.quarters.map((quarter) => ({
          id: quarter.name || quarter.id,
          courses: quarter.courses || []
        }))
      })) as Year[]);
      setIsDataLoaded(true);
    }
  }, [loadedPlanner]);

  useEffect(() => {
    if (userId && years.length > 0 && isDataLoaded) {
      prismaUpdatePlanner({years: years, userId: userId});
    }
  }, [years, isDataLoaded]);


  const addCourse = (yearId: string, quarterId: string, newCourse: string) => {
    // need to check if course already in planner
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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Animation variants for sidebar
  const sidebarVariants = {
    open: { 
      height: 'auto', 
      opacity: 1,
      transition: { 
        type: "spring", 
        damping: 30, 
        stiffness: 300,
        opacity: { duration: 0.2 }
      }
    },
    closed: { 
      height: 0, 
      opacity: 0,
      transition: { 
        type: "spring", 
        damping: 40, 
        stiffness: 400,
        opacity: { duration: 0.2 }
      }
    }
  };

  // Hide content until we've done the initial check
  if (!hasCheckedMobile) {
    return (
      <div className="invisible h-screen">
        <div className="h-16"></div> {/* Placeholder for toolbar */}
      </div>
    );
  }
  
  // Mobile layout
  if (isMobile) {
    return (
      <div className='h-screen flex flex-col overflow-hidden'>
        <Toolbar addCourse={addCourse} removeCourse={removeCourse} />
        
        {/* Main content area - takes available space */}
        <div className='flex-grow overflow-auto'>
          <CoursePlanner years={years} addCourse={addCourse} removeCourse={removeCourse}/>
        </div>
        
        <motion.div 
          className='fixed bottom-0 w-full z-10'
          initial={false}
        >
          <motion.button 
            onClick={toggleSidebar}
            className='w-full p-2 flex items-center justify-center bg-dark-secondary border-t border-dark-accent rounded-t-lg shadow-lg'
            animate={{ 
              borderRadius: sidebarOpen ? '12px 12px 0 0' : '12px 12px 0 0',
            }}
            transition={{ duration: 0.3 }}
          >
            {sidebarOpen ? (
              <>Course Selection <ChevronDown className="ml-2" size={16} /></>
            ) : (
              <>Course Selection <ChevronUp className="ml-2" size={16} /></>
            )}
          </motion.button>
          
          <motion.div 
            className='bg-dark-secondary overflow-hidden'
            initial="closed"
            animate={sidebarOpen ? "open" : "closed"}
            variants={sidebarVariants}
          >
            <div className="pb-4 max-h-fit overflow-auto">
              <Sidebar addCourse={addCourse} removeCourse={removeCourse}/>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }
  
  // Desktop layout (original)
  return (
    <div className='h-screen overflow-hidden'>
      <Toolbar addCourse={addCourse} removeCourse={removeCourse} />
      <ResizablePanelGroup direction="horizontal" className='min-w-0'>
        <ResizablePanel defaultSize={70}>
          <CoursePlanner years={years} addCourse={addCourse} removeCourse={removeCourse}/>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={30} minSize={25}>
          <Sidebar addCourse={addCourse} removeCourse={removeCourse}/>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}