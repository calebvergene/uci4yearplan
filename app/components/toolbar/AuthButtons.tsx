import { useState, useEffect } from 'react';
import { SignedOut, SignedIn, SignUpButton, SignInButton, UserButton, useAuth } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

const AuthButtons = () => {
  const { isLoaded } = useAuth();
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if we're on a mobile device
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check on initial load
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up the event listener
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

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
        <button className={`bg-dark-accent hover:bg-dark-highlight duration-150 text-white rounded-md flex row font-medium ${isMobile ? 'py-1 px-3 text-xs' : 'py-2 px-6 mr-2'}`}>
          {isMobile ? 'Log in' : 'Login'}
        </button>
        <button className={`text-white bg-emerald-600 hover:bg-emerald-600/90 duration-150 rounded-md flex row ${isMobile ? 'py-1 px-2 text-xs' : 'py-2 px-4 ml-1'}`}>
          {isMobile ? 'Sign up' : 'Sign Up'}
        </button>
      </div>
    );
  }

  return (
    <div className='flex flex-row gap-x-1 text-sm'>
      <SignedOut>
        <SignInButton mode="modal"
          appearance={{
            baseTheme: dark,
            variables: {
              colorBackground: '#1e1e1e',
              colorInputBackground: '#2d2d2d',
              colorText: '#ffffff'
            }
          }}>
          <button className={`bg-dark-accent hover:bg-dark-highlight duration-150 text-white rounded-md flex row font-medium ${isMobile ? 'py-1 px-3 text-xs' : 'py-2 px-6 mr-2'}`}>
            {isMobile ? 'Log in' : 'Login'}
          </button>
        </SignInButton>

        <SignUpButton mode="modal"
          appearance={{
            baseTheme: dark,
            variables: {
              colorBackground: '#1e1e1e',
              colorInputBackground: '#2d2d2d',
              colorText: '#ffffff'
            }
          }}>
          <button className={`text-white bg-emerald-600 hover:bg-emerald-600/90 duration-150 rounded-md flex row ${isMobile ? 'py-1 px-2 text-xs' : 'py-2 px-4 ml-1'}`}>
            {isMobile ? 'Sign up' : 'Sign Up'}
          </button>
        </SignUpButton>
      </SignedOut>
      
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default AuthButtons;