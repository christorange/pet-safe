import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import MainDrawer from './Drawer';
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
import '../styles/ppage.css';


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

  const userPic = user.imageUrl;

  return (
    <div className="profile-container">
      <div className="user-header">
        <div className="user-name">{user.firstName}</div>
      </div>
      <div className="user-info">
        <img className="profile-picture" src={userPic} alt="Profile Picture" />
        <div className="profile-description">Saved</div>
      </div>
    </div>
  );
}

export default Dashboard;
