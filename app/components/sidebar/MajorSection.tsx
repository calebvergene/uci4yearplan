import React from 'react'
import MajorSelect from './MajorSelect'

const MajorSection = async () => {

// Fetch majors
  const res = await fetch('https://anteaterapi.com/v2/rest/programs/majors');
  const majors = await res.json();

  return (
    <div>
        <MajorSelect majors={majors.data}/>
    </div>
  )
}

export default MajorSection