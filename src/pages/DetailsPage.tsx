import { RouteComponentProps, useHistory } from "react-router"
import { FC } from "react"
import { IonPage } from "@ionic/react"
import { trpc } from "../api"
import { HeartICon } from "@/assets/icons/HeartIcon"
import { UserIcon } from "@/assets/icons/UserIcon"
import { SaveIcon } from "@/assets/icons/SaveIcon"
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
      <IonPage
        className="flex flex-col justify-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-brand2">
            {placeData?.name}
          </h1>
          <SaveIcon className="inline-block"/>
        </div>
        <img 
          src={placeData?.photo}
          className="h-72 rounded-xl"
        />
        <div className='absolute bottom-8 left-[20%] w-[60vw] flex items-center justify-center gap-10 bg-brand-100 
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
        </div>
      </IonPage>
    )
  }else{
    return(
      <IonPage>
        <div className='w-full h-full bg-brand2 bg-opacity-50 grid place-items-center'>
          <span className="loading loading-dots loading-lg m-auto"></span>
        </div>
      </IonPage>
    )
  }

  
}

