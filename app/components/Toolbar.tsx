import React from 'react'
import { Download } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import Image
 from 'next/image';
const toolbar = () => {
  return (
    <div>
        <div className='flex justify-between py-3 px-5 border-b border-dark-secondary'>
          <button className='flex flex-row items-center'>
            <Image 
              src="/uci4yearplanlogo.png"
              width={35}
              height={35}
              alt="UCI 4 Year Plan Logo"
            />
            <h1 className='ml-1 my-auto font-semibold text-lg'>uci4yearplan</h1>
          </button>
            <div className='flex flex-row gap-x-1 text-sm '>
            <SignedOut>
              <SignUpButton mode="modal" 
                appearance={{
                  baseTheme: dark,
                  variables: {
                    colorBackground: '#1e1e1e',
                    colorInputBackground: '#2d2d2d', 
                    colorText: '#ffffff'
                  }
                }}>
                <button className= "bg-zinc-800 text-white py-2 px-4 mr-2 rounded-md flex row">
                <Download size={16} className='mt-0.5 mr-1'/>
                  Save Planner
                </button>
              </SignUpButton>
              <SignInButton mode="modal" 
                appearance={{
                  baseTheme: dark,
                  variables: {
                    colorBackground: '#1e1e1e',
                    colorInputBackground: '#2d2d2d', 
                    colorText: '#ffffff'
                  }
                }}>
                <button className="bg-emerald-600 text-white py-2 px-6 mr-2 rounded-md flex row font-medium">
                Login
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
              
            </SignedIn>
            </div>
        </div>
    </div>
  )
}

export default toolbar