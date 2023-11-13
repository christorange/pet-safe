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
  SignOutButton,
  useUser,
  useAuth,
  useClerk
} from "@clerk/clerk-react";
import { useHistory } from 'react-router';
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
        <MainDrawer />
      </IonPage>
  );
};

function Welcome() {
  
  const { isLoaded, isSignedIn, user } = useUser();
  const { userId, sessionId, getToken } = useAuth();
  const history = useHistory();
  const { signOut } = useClerk();

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
      <button className='btn' onClick={
        ()=>signOut(() => history.push('/'))
      }>
        Sign Out
      </button>

    </div>
  );
}

export default Dashboard;
