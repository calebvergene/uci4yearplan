import { useState, useEffect } from 'react';
import { SignedOut, SignedIn, SignUpButton, SignInButton, UserButton, useAuth } from '@clerk/nextjs';
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
        <button className="bg-dark-accent hover:bg-dark-highlight duration-150 text-white py-2 px-6 mr-2 rounded-md flex row font-medium">
          Login
        </button>
        <button className=" text-white bg-emerald-600 hover:bg-emerald-600/90 duration-150 py-2 px-4 ml-1 rounded-md flex row">
          Sign Up
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
          <button className="bg-dark-accent hover:bg-dark-highlight duration-150 text-white py-2 px-6 mr-2 rounded-md flex row font-medium">
            Login
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
          <button className=" text-white bg-emerald-600 hover:bg-emerald-600/90 duration-150 py-2 px-4 ml-1 rounded-md flex row">
            Sign Up
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