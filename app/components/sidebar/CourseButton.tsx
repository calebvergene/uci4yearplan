import React from 'react'

interface Props {
    course: string;
}

const CourseButton = ({ course: courseName }: Props) => {
    return (
        <div>
            <button className='bg-dark-accent px-3 py-1 rounded-lg min-w-40'>
                {courseName}
            </button>
        </div>
    )
}

export default CourseButton