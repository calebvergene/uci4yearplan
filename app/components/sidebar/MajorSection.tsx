'use client'

import React from 'react'
import MajorSelect from './MajorSelect'
import { Major, ApiResponse, Requirement, MajorData } from "../../types"
import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
  majors: Major[];
  initialMajorData?: ApiResponse | null;
  fetchMajorClasses: (id: string) => Promise<ApiResponse>;
}

const MajorSection = ({ majors, initialMajorData, fetchMajorClasses }: Props) => {
  const [majorClasses, setMajorClasses] = React.useState<ApiResponse | null>(initialMajorData || null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentMajorId = searchParams.get('majorId') || "";

  const handleMajorChange = async (newId: string) => {
    // If the same major is selected, clear it
    const actualId = newId === currentMajorId ? "" : newId;
    
    // Update URL first
    const params = new URLSearchParams(searchParams.toString());
    if (actualId) {
      params.set('majorId', actualId);
    } else {
      params.delete('majorId');
    }
    router.push(`?${params.toString()}`);

    // Clear data if deselecting
    if (!actualId) {
      setMajorClasses(null);
      return;
    }

    try {
      // Fetch data for the new selection
      const data = await fetchMajorClasses(actualId);
      setMajorClasses(data);
    } catch (error) {
      console.error('Error fetching major classes:', error);
      setMajorClasses(null);
    }
  }

  return (
    <div>
      <MajorSelect 
        majors={majors} 
        handleMajorChange={handleMajorChange}
      />
      {majorClasses && (
        <div className="mt-4 p-4">
          <pre>{JSON.stringify(majorClasses, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default MajorSection