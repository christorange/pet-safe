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
  UserButton,
  useUser,
  RedirectToSignIn,
} from "@clerk/clerk-react"; // Import ClerkProvider here

import Dashboard from '../components/Dashboard';
import Tab1 from './MainScreen';


const UserProfile: React.FC = () => {
  

  return (
    <ClerkProvider publishableKey={import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY}>
      <IonPage className=' bg-background'>
        <IonHeader>
          <IonToolbar>
            <p className='text-center font-bold'>Tab3</p>
          </IonToolbar>
        </IonHeader>
          <SignedIn>
            <Dashboard />
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
            <p className='text-center font-bold'>You are Signed Out</p>
          </SignedOut>
      </IonPage>
    </ClerkProvider>
  );
};


export default UserProfile;
