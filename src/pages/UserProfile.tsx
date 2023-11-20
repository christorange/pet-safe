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
import { useEffect } from 'react';

const UserProfile: React.FC = () => {

  const { isLoaded, isSignedIn, user } = useUser();
  const { userId, sessionId, getToken } = useAuth();
  const history = useHistory();
  const { signOut } = useClerk();
  

  if (!isLoaded || !userId || !user) {
    return null;
  }
  
  
  const createUserMutation = trpc.user.createUser.useMutation();

  const handleCreateUser = async () => {
    try {
      const username = user.firstName;
      const email = user.emailAddresses;

      await createUserMutation.mutateAsync({
        id: userId,
        name: username || '{}',
        email: email.toString() || '{}',
      });
      
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOneUser = trpc.user.getOne.useQuery({ id: userId }).data;

  // const conditionalCreate = async () => {
  //   try {
  //      const res = fetchOneUser;
  //      if (res == null || res == undefined) {
  //       handleCreateUser();
  //      }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  useEffect(() => {
    handleCreateUser()
  }, []);


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
