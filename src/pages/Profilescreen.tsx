import { IonPage } from '@ionic/react';
import '../components/distance.css';
import  React, { FC, useState, useEffect } from 'react';
import {Back} from '../assets/icons/Back';
import { trpc } from '../api';
import icon from "../assets/Avatar.png";
import DivScroller from '../components/DivScroller'
const Profilescreen: React.FC = () => {
  const {data: allPlacesData, isLoading} = trpc.places.allPlaces.useQuery()

  return (
    <IonPage>
    
    <div className="names">
    <Back/>
    <div className="hero hero-content text-center">
      <h1 className="text-5xl font-bold">Hello there</h1>
    </div>       
    </div>
    <div className="icon">
    <figure><img src={icon} alt="Can't load" className="rounded-full shadow-xl border-8 border-indigo-500"/> </figure>
    </div>
    <div className = "savedshops">
      <DivScroller/>
    </div>
    </IonPage>
  );
};
export default Profilescreen;






