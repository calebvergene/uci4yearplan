import React from 'react'
import { AlignJustify, Download, CloudUpload, Files } from "lucide-react";

const toolbar = () => {
  return (
    <div>
        <div className='flex justify-between py-3 px-5'>
            <div className='text-l'>
                
            </div>
            <div className='flex flex-row gap-x-6 text-l font-semibold'>
                <button className='flex row'><span className='mr-1'><Download/></span>Save</button>
                <button className='flex row'><span className='mr-1'><CloudUpload/></span>Load</button>
                <button className='flex row'><span className='mr-1'><Files/></span>Import</button>
                <button className='ml-2'><AlignJustify/></button>
            </div>
        </div>
    </div>
  )
}

export default toolbar