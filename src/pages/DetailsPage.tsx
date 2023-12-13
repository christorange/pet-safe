import { RouteComponentProps, useHistory } from "react-router"
import { FC, useState } from "react"
import { IonPage, IonToast } from "@ionic/react"
import { trpc } from "../api"
import { HeartICon } from "@/assets/icons/HeartIcon"
import { UserIcon } from "@/assets/icons/UserIcon"
import { SaveIcon } from "@/assets/icons/SaveIcon"
import { HomeIcon } from "@/assets/icons/HomeIcon"
import { StoreIcon } from "@/assets/icons/StoreIcon"
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
  const [ showToast, setShowToast ] = useState(false);
  
  const createSavedMutation = trpc.saved.saveOne.useMutation();

  const handleSave = async () => {
    if (isSignedIn) {
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
        console.error(error);
      }
    }else{
      setShowToast(true);
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
            {/* <p>
              8:00 am - 11:00 pm
            </p> */}
          </section>
          <section className="w-full border border-brand2-200 bg-brand2-100 rounded-xl px-5 py-3 mb-6">
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

          <IonToast 
            duration={3000}
            message="Sign in to enable saving places"
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            color="danger"
            position="bottom"
            className="!mb-12"
            buttons={[
              {
                text: 'Dismiss',
                role: 'cancel',
              }
            ]}
          />

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

