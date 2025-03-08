import React from 'react'
import Image from 'next/image';
import AuthButtons from './AuthButtons';
import { Search, Command } from 'lucide-react';
import SearchModal from '../SearchModal';

interface Props {
  addCourse: (yearId: string, quarterId: string, newCourse: string) => void;
  removeCourse: (yearId: string, quarterId: string, courseId: string) => void;
}

const toolbar = ({ addCourse, removeCourse }: Props) => {
  const [open, setOpen] = React.useState(false)

  const onSearchClick = () => {
    setOpen((open) => !open)
  }

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])


  return (
    <div>
      <div className='flex py-3 px-5 border-b border-dark-secondary'>
        {/* Left Section */}
        <div className='flex-1 flex items-center'>
          <div className='flex row gap-x-4'>
            <button className='flex flex-row items-center'>
              <Image
                src="/uci4yearplanlogo.png"
                width={35}
                height={35}
                alt="UCI 4 Year Plan Logo"
              />
              <h1 className='ml-1 my-auto font-semibold text-xl'>uci4yearplan</h1>
            </button>
            <div className='justify-center place-content-center rounded-md px-2 py-0.5 border text-xs my-auto mt-2 border-neutral-600 text-neutral-300'>Open Beta</div>
          </div>
        </div>

        {/* Center Section - Search Bar */}
        <div className='flex-1 flex items-center justify-center'>
          <button onClick={onSearchClick} className='flex justify-between my-1 items-center mx-1 w-full max-w-md gap-2 py-1.5 px-3 border hover:bg-dark-accent rounded-2xl border-dark-highlight text-neutral-400 hover:text-white duration-150'>
            <div className='flex row justify-center items-center'>
              <Search size={16} className="text-neutral-500 mr-1" />
              <span className='text-sm'>Search Courses, Departments, GEs...</span>
            </div>
            <div>
              <div className='flex items-center ml-1 bg-dark-accent px-1.5 py-0.5 rounded text-xs'>
                <Command size={10} className='mr-0.5' />
                <span>K</span>
              </div>
            </div>
          </button>
          <SearchModal open={open} setOpen={setOpen} addCourse={addCourse} removeCourse={removeCourse} />
        </div>

        {/* Right Section */}
        <div className='flex-1 flex items-center justify-end'>
          <div className='flex flex-row gap-x-1 text-sm'>
            <AuthButtons />
          </div>
        </div>
      </div>
    </div>
  )
}

export default toolbar