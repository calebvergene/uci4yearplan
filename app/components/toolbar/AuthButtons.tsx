import { useState, useEffect } from 'react';
import { SignedOut, SignedIn, SignUpButton, SignInButton, UserButton, useAuth } from '@clerk/nextjs';
import { Download } from 'lucide-react';
import { dark } from '@clerk/themes';

const AuthButtons = () => {
  const { isLoaded } = useAuth();
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      // Add a small delay to prevent flickering
      const timer = setTimeout(() => {
        setShowPlaceholder(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  // Placeholder buttons that match the styling exactly
  if (!isLoaded || showPlaceholder) {
    return (
      <div className='flex flex-row gap-x-1 text-sm'>
        <button className="bg-zinc-800 text-white py-2 px-4 mr-2 rounded-md flex row">
          <Download size={16} className='mt-0.5 mr-1'/>
          Save Planner
        </button>
        <button className="bg-emerald-600 text-white py-2 px-6 mr-2 rounded-md flex row font-medium">
          Login
        </button>
      </div>
    );
  }

  return (
    <div className='flex flex-row gap-x-1 text-sm'>
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
          <button className="bg-zinc-800 text-white py-2 px-4 mr-2 rounded-md flex row">
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
  );
};

export default AuthButtons;