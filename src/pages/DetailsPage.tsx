import { RouteComponentProps, useHistory } from "react-router"
import { FC } from "react"
import { IonPage } from "@ionic/react"
import { trpc } from "../api"
import { HeartICon } from "@/assets/icons/HeartIcon"
import { UserIcon } from "@/assets/icons/UserIcon"
import { SaveIcon } from "@/assets/icons/SaveIcon"
import { HomeIcon } from "@/assets/icons/HomeIcon"
import { UserButton, SignedIn, SignedOut, SignInButton, useUser,
  useAuth,
  useClerk } from "@clerk/clerk-react"
interface DetailsPageProps 
  extends RouteComponentProps<{ 
    id: string
  }> {}

export const DetailsPage: FC<DetailsPageProps> = ({match}) => {

  const { data: placeData } = trpc.places.onePlace.useQuery(match.params.id)
  const { data: statusdata } = trpc.places.placeBusinessInfo.useQuery(match.params.id)
  
  const history = useHistory();

  const { isLoaded, isSignedIn, user } = useUser();
  const { userId, sessionId, getToken } = useAuth();
  
  const createSavedMutation = trpc.saved.saveOne.useMutation();

  const handleSave = async () => {
    try {
      const userID = userId;
      const placeId = match.params.id;
      if (!userID) return;
      console.log(userID, placeId);
      await createSavedMutation.mutateAsync({
        user_id: userID || '{}',
        place_id: placeId
      });
      
    } catch (error) {
      console.log(error);
    }
  };

  if (placeData){
    return (
      <IonPage>
        <div className="flex flex-col items-center bg-white pt-8 pb-16 !gap-0 h-full px-6 overflow-y-scroll">
          <div className="flex items-center gap-2 mb-6 mt-12 ">
            <p className="text-3xl font-bold text-brand2 font-title">
              {placeData?.name}
            </p>
            <SaveIcon className="active:scale-125 transition w-[50px]"
            onClick={handleSave}/>
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
          <section className="flex gap-4 self-start text-xl font-bold ml-2 mb-7">
            {statusdata?.isOpen?
              <p className="text-brand-200">
                OPEN NOW
              </p> :
              <p className="text-error-200">
                CLOSED NOW
              </p>
            }
            <p>
              8:00 am - 11:00 pm
            </p>
          </section>
          <section className="w-full border border-brand2-200 bg-brand2-100 rounded-xl px-5 py-3 mb-3">
            <p className="font-bold inline">Address: </p>
            <p className="inline">{placeData?.address}</p>
            {
              placeData?.phone &&
              <div className="mt-3">
                <p className="font-bold inline">Phone: </p>
                <p className="inline">{placeData.phone}</p>
              </div>
            }
          </section>
          {placeData?.summary &&
            <section className="w-full border border-brand2-200 bg-brand2-100 rounded-xl px-5 py-3 mb-3">
              <p className="font-bold inline">Summary: </p>
              <p className="inline">{placeData.summary}</p>
            </section>
          }

          <div className='absolute bottom-0 w-full flex items-center justify-center gap-20 bg-brand-100 
            h-12 text-3xl text-brand-200 shadow-300 border-2 border-brand-200 border-opacity-30'>
            <button
              className='grid place-items-center
              active:scale-125 transition ease-in-out duration-200'
              onClick={() => {
                history.push('/saved');
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

