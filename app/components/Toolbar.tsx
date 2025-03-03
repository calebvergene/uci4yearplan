import React from 'react'
import { Download } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

const toolbar = () => {
  return (
    <div>
        <div className='flex justify-between py-3 px-5 border-b border-dark-secondary'>
            <div className=''>
                
            </div>
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
                <button className="bg-emerald-500/90 text-white py-2 px-6 mr-2 rounded-md flex row font-medium">
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