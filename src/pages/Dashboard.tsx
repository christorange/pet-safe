import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import MainDrawer from '../components/Drawer';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignOutButton,
  UserButton,
  useUser,
  RedirectToSignIn,
  useAuth
} from "@clerk/clerk-react"; // Import ClerkProvider here



const Dashboard: React.FC = () => {
  

  return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <p className='text-center font-bold'>DashBoard</p>
          </IonToolbar>
        </IonHeader>
        <Welcome />
        <SignOutButton />
        <MainDrawer />
      </IonPage>
  );
};

function Welcome() {
  

  const { isLoaded, isSignedIn, user } = useUser();
  const { userId, sessionId, getToken } = useAuth();
  
  if (!isLoaded || !userId || !user) {
    return null;
  }
  return <div className=' background'>Hello {user.firstName}, you are signed in</div>;
}

export default Dashboard;
