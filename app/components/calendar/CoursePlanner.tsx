"use client";

import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { closestCenter } from "@dnd-kit/core";
import { DragEndEvent } from "@dnd-kit/core";
import { Year } from "../../types/index";
import YearCard from "./YearCard";

const CoursePlanner = () => {
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

  

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      // Update the state to move the course
      setYears(prevYears => {
        // Find the course and move it to the new quarter
        // Return updated years array
        return prevYears;
      });
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      <div className="p-4 h-[90vh] overflow-y-scroll">
        {years.map((year: Year) => (
          <YearCard key={year.id} year={year} />
        ))}
      </div>
    </DndContext>
  );
};

export default CoursePlanner;