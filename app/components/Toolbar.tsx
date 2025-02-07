import React from 'react'
import { AlignJustify, Download, CloudUpload, Files } from "lucide-react";

const toolbar = () => {
  return (
    <div>
        <div className='flex justify-between py-3 px-5 border-b border-dark-secondary'>
            <div className=''>
                
            </div>
            <div className='flex flex-row gap-x-1 text-sm '>
                <button className='flex row py-1 px-3 rounded-lg hover:bg-dark-highlight duration-100'><span className='mr-1'><Download size={16} className='mt-0.5'/></span><span className='mt-0.5'>Save</span></button>
                <button className='flex row py-1 px-3 rounded-lg hover:bg-dark-highlight duration-100'><span className='mr-1'><CloudUpload size={16} className='mt-1' /></span><span className='mt-0.5'>Load</span></button>
                <button className='flex row py-1 px-3 rounded-lg hover:bg-dark-highlight duration-100'><span className='mr-1'><Files size={16} className='mt-1' /></span><span className='mt-0.5'>Import</span></button>
                <button className='ml-2'><AlignJustify/></button>
            </div>
        </div>
    </div>
  )
}

export default toolbar