import React from 'react'
import { Requirement } from "../../types"

interface Props {
    Requirements: Requirement[];
}

const ClassSelection = ({Requirements}: Props) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto">
        {Requirements.map((requirement: Requirement, index) => (
          <div key={index} className="border-b border-gray-200">
            <h3 className="font-semibold text-lg">{requirement.label}</h3>
            <ul className="pb-4">
              {requirement.courses && requirement.courses.map((course, index) => (
                <li key={index} className="py-1">{course}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ClassSelection