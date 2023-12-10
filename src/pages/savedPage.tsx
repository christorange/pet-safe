import { IonPage } from '@ionic/react';
import { HomeIcon } from "@/assets/icons/HomeIcon";
import { Link, useHistory } from 'react-router-dom';
import React, {useEffect, useState, useCallback, ReactElement} from 'react';
import { trpc } from "../api";
import {
    useUser,
    useAuth,
    useClerk
  } from "@clerk/clerk-react";
  import InfiniteScroll from '../components/InfiniteScroll';
  import {Arrow} from '../assets/icons/Arrow';
  import {delay} from '../components/utils'
  import {Star} from '../assets/icons/Star';
  import { HalfStar } from '@/assets/icons/halfStar';

const SavedPage: React.FC = () => {
    
    const history = useHistory();
    const { isLoaded, isSignedIn, user } = useUser();
    const { userId, sessionId, getToken } = useAuth();
    const [items, setItems] = useState<string[]>([]);
    const [newItems, setNewItems] = useState<ReactElement[]>([]); 

    if (!isLoaded || !userId || !user) {
        return <div>
            <h1 className=' bg-brand-100'>You have to log in to see Your saved places</h1>
            <button className="bg-transparent bg-brand-100 text-black font-semibold border-blue-500 hover:border-transparent rounded"
            onClick={() => { 
                history.push('/')
                history.go(0)
              }}>
            Back Home
            </button>
            </div>;
        
      }

      useEffect(() => {
        const {data: savedData} = trpc.saved.getByUserId.useQuery(userId);
      }, [])
 
      

    
  return (
    <>
      <button className="grid
              active:scale-125 transition ease-in-out duration-200  bg-brand-100" onClick={() => { 
            history.push('/')
            history.go(0)
          }}><HomeIcon /></button>
          
          
    <div className = "shops">
    <div className="card w-96 bg-base-100 shadow-xl">
  
    </div>
    <div style={{right: 0,height: 802, width: 393,overflow: 'auto'}}>
     
    </div>

    </div>
    </>
  );
};

export default SavedPage;
