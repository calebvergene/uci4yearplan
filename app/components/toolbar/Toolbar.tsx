import React from 'react'
import Image from 'next/image';
import AuthButtons from './AuthButtons';


const toolbar = () => {
  return (
    <div>
        <div className='flex justify-between py-3 px-5 border-b border-dark-secondary'>
          <div className='flex row gap-x-4'>
          <button className='flex flex-row items-center'>
            <Image 
              src="/uci4yearplanlogo.png"
              width={35}
              height={35}
              alt="UCI 4 Year Plan Logo"
            />
            <h1 className='ml-1 my-auto font-semibold text-lg'>uci4yearplan</h1>
          </button>
          <div className='justify-center place-content-center rounded-md px-2 py-0.5 border text-xs my-auto mt-2 border-neutral-600 text-neutral-300'>Open Beta</div>
          </div>
            <div className='flex flex-row gap-x-1 text-sm '>
              <AuthButtons/>
            </div>
        </div>
    </div>
  )
}

export default toolbar