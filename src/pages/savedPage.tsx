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
     // @ts-ignore
    const { data: savedData } = trpc.saved.getByUserId.useQuery(userId);
    const { data: placeData } = trpc.places.manyPlaces.useQuery(savedData?.map(item => item.place_id) || []);
  
    const [items, setItems] = useState<ReactElement[]>([]);
  
    useEffect(() => {
      if (!isLoaded || !userId || !savedData || !placeData) {
        return;
      }
  
      const updatedNewItems: ReactElement[] = [];
  
      for (let i = 0; i < savedData.length; i++) {
        const place = placeData[i];
  
        if (place) {
          const placeName = place.name || 'Unknown Name';
          const placeType = place.type || 'Unknown Type';
          const placeImage = place.photo || 'Unknown Type';
          const placeRate = place.rating || 'Unknown Type';
  
          updatedNewItems.push(
            <div key={i} className="card w-96 card-compact --ion-color-success shadow-xl border-8 border-white">
              <figure><img src={placeImage} alt="Can't load" /></figure>
              <div className="card-body bg-brand-100">
                <h2 className="card-title">{placeName}</h2>
                <p>{placeType}</p>
                <div className="card-actions justify-end">
                  <button onClick={() => history.push(`/details/${savedData[i].place_id}`)}>
                    <Arrow />
                  </button>
                </div>
              </div>
            </div>
          );
        }
      }
  
      setItems(updatedNewItems);
    }, [isLoaded, userId, savedData, placeData, history]);
  
    if (!isLoaded || !userId) {
      return (
        <div>
          <h1 className='bg-brand-100'>You have to log in to see Your saved places</h1>
          <button
            className="bg-transparent bg-brand-100 text-black font-semibold border-blue-500 hover:border-transparent rounded"
            onClick={() => {
              history.push('/');
              history.go(0);
            }}
          >
            Back Home
          </button>
        </div>
      );
    }

  return (
    <>
      <div className="flex flex-col items-center bg-white pt-8 pb-16 !gap-0 h-full px-6">
        <div className="flex items-center gap-4 mb-6">
        <p className="text-5xl font-extrabold text-brand2">
              Saved Places
            </p>
            <button className="grid
              active:scale-125 transition ease-in-out duration-200  bg-brand-100" onClick={() => { 
            history.push('/')
            history.go(0)
          }}><HomeIcon /></button>
        
        
          
    <div className = "shops">
    <div className="card w-96 bg-base-100 shadow-xl">
  
    </div>
    <div style={{right: 0,height: 802, width: 393,overflow: 'auto'}}>
   
        {items.map(item => <div>{item}</div>)}
    </div>

    </div>
    </div>
    </div>
    </>
  );
};

export default SavedPage;
