import React, {useEffect, useState} from 'react'
import InfiniteScroll from '../components/InfiniteScroll'
import { IonPage } from '@ionic/react';
import '../styles/distance.css';
import {Restaurant} from '../assets/icons/restaurant'; 
import {Cafe} from '../assets/icons/cafe';
import {Park} from '../assets/icons/park';
import {Bar} from '../assets/icons/bar';
import {delay} from '../components/utils'
import {Arrow} from '../assets/icons/Arrow';
import {Star} from '../assets/icons/Star';
import logo from "../assets/park9.png";
import { trpc } from '../api'; // fetching places
import { HalfStar } from '@/assets/icons/halfStar';

let counter = 0



const DivScroller = () => {
  const [items, setItems] = useState<string[]>([]);
  const [placeType, setPlaceType] = useState<'all' | 'bars' | 'restaurants' | 'cafes' | 'parks'>('all');
  const { data: allPlacesData, isLoading, isFetched } = trpc.places.allPlaces.useQuery();
  
  // Separate state for different place types 
  const {
    data: restaurantsData, 
    isLoading: isRestaurantsLoading
  } = trpc.places.restaurants.useQuery()

  const {
    data: barsData, 
    isLoading: isBarsLoading
  } = trpc.places.bars.useQuery()

  const {
    data: cafesData, 
    isLoading: isCafesLoading
  } = trpc.places.cafes.useQuery()

  const {
    data: parksData, 
    isLoading: isParksLoading
  } = trpc.places.parks.useQuery()
  
  // Use the appropriate data based on placeType
  let placeData = allPlacesData;

  // Use the appropriate data based on placeType
  if (placeType === 'bars') {
    placeData = barsData;
  } else if (placeType === 'restaurants') {
    placeData = restaurantsData;
  } else if (placeType === 'cafes') {
    placeData = cafesData;
  } else if (placeType === 'parks') {
    placeData = parksData;
  }
  

  const renderRatingStars = (rating: number) => {
    const numberOfFullStars = Math.floor(rating); // Number of full stars
    const hasHalfStar = rating - numberOfFullStars >= 0.5; // Check if there's a half star
    const starIcons = [];
  
    // Create full star icons
    for (let i = 0; i < numberOfFullStars; i++) {
      starIcons.push(<Star />);
    }
  
    // Add a half star if applicable
    // if (hasHalfStar) {
    //   starIcons.push(<HalfStar key="half_star" />);
    // }
  
    // Return the generated star icons
    return starIcons;
  };
  
  // Inside your JSX where you render the rating:
  <h2 className="card-title">
    {renderRatingStars(4.4)}
  </h2>

  const fetchMore = async () => {
    await delay(async () => {
      const newItems = [];
      const totalFeatures = placeData?.features?.length || 0;
      console.log(totalFeatures);
        for (let i = counter; i < counter + 10 && i < totalFeatures; i++) {
          console.log(placeData)
          const placeName = (placeData?.features[i].properties?.name || 'Unknown Name');
          const placeType = (placeData?.features[i].properties?.type || 'Unknown Type');
          const placeImage = (placeData?.features[i].properties?.photo || 'Unknown Type');
          const placeRate = (placeData?.features[i].properties?.rating || 'Unknown Type');
          placeData && newItems.push(
          <div className="card w-96 card-compact  --ion-color-success shadow-xl border-8 border-white">
          <figure><img src={placeImage} alt="Can't load" /></figure>
          <div className="card-body" >
            <h2 className="card-title">{placeName}</h2>
            <p>{placeType}</p>
            <h2 className="card-title">{renderRatingStars(placeRate)}</h2>
            <div className="card-actions justify-end">
              <button><Arrow/></button>
  
            </div>
            </div>
        </div> )
        
      }
      setItems([...items, ...newItems])

      counter += 10
    })
  }

  useEffect(() => {
    fetchMore().then()
  }, [])

  return (
    <IonPage>
      <div className = "filter1">
      <button><Restaurant /></button>

   </div>
    <div className = "filter2">
    <button><Cafe/></button>
    
    </div>
    <div className = "filter3">
    <button ><Bar/></button>
    
    </div>
    <div className = "filter4">
    <button><Park/></button>
    
    </div>
    <div className = "shops">
    <div className="card w-96 bg-base-100 shadow-xl">
  
</div>
    <div style={{right: 0,height: 802, width: 393,overflow: 'auto'}}>
      <InfiniteScroll
        useWindow={false}
        threshold={2000}
        
        loader={<div className="loader" key={0}>...</div>}
      >
        {items.map(item => <div key={item}>{item}</div>)}
      </InfiniteScroll>
    </div>

    </div>
    
    </IonPage>
  )
}

export default DivScroller
