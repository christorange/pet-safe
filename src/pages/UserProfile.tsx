import React from 'react';
import {
  IonPage,
} from '@ionic/react';
import {
  useUser,
  useAuth,
  useClerk
} from "@clerk/clerk-react";
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import '../styles/ppage.css';
import { trpc } from '../api';

const UserProfile: React.FC = () => {

  const { isLoaded, isSignedIn, user } = useUser();
  const { userId, sessionId, getToken } = useAuth();
  const history = useHistory();
  const { signOut } = useClerk();
  
  if (!isLoaded || !userId || !user) {
    return null;
  }
  
  const getUserData = () => {
    // Ensure user data is available before proceeding
    if (!isLoaded || !userId || !user) {
      return null;
    }

    const username = user.firstName;
    const email = user.emailAddresses;

    const res = trpc.user.getOne.useQuery({ id: userId }).data;

    if (!res) {
      console.log('User not in DB');
      trpc.user.createUser.useMutation({ id: userId, 
        email: email, 
        name: username });
    }

    return user;
  };



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
          className='btn'
          onClick={() => { 
            history.push('/')
            history.go(0)
          }}
        >
          Back to home
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
