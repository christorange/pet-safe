import { HeartICon } from "@/assets/icons/HeartIcon"
import { UserIcon } from "@/assets/icons/UserIcon"
import { HomeIcon } from "@/assets/icons/HomeIcon"
import { StoreIcon } from "@/assets/icons/StoreIcon"
import { useHistory } from 'react-router'
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react"

export const BottomBar = () => {
  const history = useHistory();

  return (
    <div className='absolute bottom-0 w-full flex items-center justify-center gap-12 bg-brand-100 
      py-4 px-4 text-3xl text-brand-200 shadow-300 border-2 border-brand-200 border-opacity-30'>
      <button
        className='grid place-items-center
        active:scale-125 transition ease-in-out duration-200'
        onClick={() => {
          history.push('/distance');
        }}
      >
        <StoreIcon strokeWidth='1.8'/>
      </button>
      <button
        className='grid place-items-center
        active:scale-125 transition ease-in-out duration-200'
        onClick={() => {
          history.push('/saved');
        }}
      >
        <HeartICon strokeWidth='1.8'/>
      </button>
      <SignedIn>
        <UserButton 
          afterSignOutUrl='/'
          userProfileUrl='/userprofile'
        />
      </SignedIn>
      <SignedOut>
        <SignInButton
          redirectUrl='/userprofile'
          mode='modal'
        >
          <button
            className='grid place-items-center
            active:scale-125 transition ease-in-out duration-200'
          >
            <UserIcon strokeWidth='1.8'/>
          </button>
        </SignInButton>
      </SignedOut>
      <button 
        className="grid place-items-center
        active:scale-125 transition ease-in-out duration-200"
        onClick={() => {
          history.push('/');
          history.go(0);
        }}
      >
        <HomeIcon />
      </button>
    </div>
  )
}
