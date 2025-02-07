import React from 'react'

const Sidebar = async () => {

  // Fetch majors
  const res = await fetch('https://anteaterapi.com/v2/rest/programs/majors?limit=1');
  const majors = await res.json();
  

  return (
    <div>Sidebar</div>
  )
}

export default Sidebar