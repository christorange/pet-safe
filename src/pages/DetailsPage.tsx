import { RouteComponentProps, useHistory } from "react-router"
import { FC } from "react"
import { IonPage } from "@ionic/react"
import { trpc } from "../api"
import { HeartICon } from "@/assets/icons/HeartIcon"
import { UserIcon } from "@/assets/icons/UserIcon"
import { SaveIcon } from "@/assets/icons/SaveIcon"
import { HomeIcon } from "@/assets/icons/HomeIcon"
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react"
interface DetailsPageProps 
  extends RouteComponentProps<{
    id: string
  }> {}

export const DetailsPage: FC<DetailsPageProps> = ({match}) => {

  const { data: placeData } = trpc.places.onePlace.useQuery(match.params.id)
  const history = useHistory();

  if (placeData){
    return (
      <IonPage>
        <div className="flex flex-col items-center bg-white pt-8 pb-16 !gap-0 h-full px-6">
          <div className="flex items-center gap-4 mb-6">
            <p className="text-4xl font-extrabold text-brand2">
              {placeData?.name}
            </p>
            <SaveIcon/>
          </div>
          <img 
            src={placeData?.photo}
            className="h-72 rounded-xl mb-6"
          />
          <div className="flex gap-4 self-start mb-6">
            <div className="badge badge-ghost text-lg p-3">
              {placeData?.type}
            </div>
            <div className="badge badge-ghost text-lg p-3">
              {placeData?.rating}/5.0
            </div>
          </div>
          <div className="flex gap-4 self-start text-xl font-bold ml-2">
            <p className="text-brand-200">
              OPEN
            </p>
            <p>
              8:00 AM - 11:00 PM
            </p>
          </div>
          <div className='absolute bottom-2 left-[20%] w-[60vw] flex items-center justify-center gap-10 bg-brand-100 
            h-16 rounded-full text-3xl text-brand-200 shadow-300 border-2 border-brand-200 border-opacity-30'>
            <button
              className='grid place-items-center
              active:scale-125 transition ease-in-out duration-200'
              onClick={() => {
                history.push('/distance');
                history.go(0);
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
        </div>
      </IonPage>
    )
  }else{
    return(
      <IonPage className="bg-white">
        <div className='w-full h-full bg-brand2 bg-opacity-50 grid place-items-center'>
          <span className="loading loading-dots loading-lg m-auto"></span>
        </div>
      </IonPage>
    )
  }

  
}

