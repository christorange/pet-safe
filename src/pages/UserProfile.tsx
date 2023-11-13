import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import {
  SignOutButton,
  SignedIn,
  useUser,
  useAuth,
  useClerk
} from "@clerk/clerk-react";
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import '../styles/ppage.css';

const UserProfile: React.FC = () => {

  const { isLoaded, isSignedIn, user } = useUser();
  const { userId, sessionId, getToken } = useAuth();
  const history = useHistory();
  const { signOut } = useClerk();

  if (!isLoaded || !userId || !user) {
    return null;
  }

  const userPic = user.imageUrl;

  return (
    <IonPage className=' bg-background'>
      <div className="profile-container">
        <div className="user-header">
          <div className="user-name">{user.firstName}</div>
        </div>
        <div className="user-info">
          <img className="profile-picture" src={userPic} alt="Profile Picture" />
          <div className="profile-description">Saved</div>
        </div>
        <button 
          className='btn mb-4'
          onClick={() => {
            history.push('/')
            history.go(0)
          }}
        >
          Back
        </button>
        <button className='btn' onClick={
          ()=>signOut(() => history.push('/'))
        }>
          Sign Out
        </button>
      </div>
    </IonPage>
  );
};


export default UserProfile;
