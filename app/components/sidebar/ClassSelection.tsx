import React from 'react'

interface Props {
    majorId: string;
}

const ClassSelection = ({majorId}: Props) => {
  return (
    <div>
        {majorId}
    </div>
  )
}

export default ClassSelection