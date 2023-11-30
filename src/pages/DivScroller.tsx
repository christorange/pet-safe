import React, {useEffect, useState, useCallback} from 'react'
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
import { motion, AnimatePresence } from 'framer-motion';

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
  
  const clearItems = () => {
    setItems([]); // Clears the 'items' array
  };

  const handleCafeFilter = useCallback(() => {
    if (placeType === 'cafes'){
      setPlaceType('all')
      console.log('set to all places')
    }else {
      setPlaceType('cafes')
      clearItems();
      placeData = cafesData;
    }
  }, [placeType])

  const handleRestaurantFilter = useCallback(() => {
    if (placeType === 'restaurants'){
      setPlaceType('all')
      console.log('set to all places')
    }else {
      setPlaceType('restaurants');
      clearItems();
      placeData = restaurantsData;
    }
  }, [placeType])

  const handleBarFilter = useCallback(() => {
    if (placeType === 'bars'){
      setPlaceType('all')
      console.log('set to all places')
    }else {
      setPlaceType('bars')
      clearItems();
      placeData = barsData;
    }
  }, [placeType])

  const handleParkFilter = useCallback(() => {
    if (placeType === 'parks'){
      setPlaceType('all')
      console.log('set to all places')
    }else {
      setPlaceType('parks')
      clearItems();
      placeData = parksData;
    }
  }, [placeType])
  

  const renderRatingStars = (rating: number) => {
    const numberOfFullStars = Math.floor(rating); // Number of full stars
    const hasHalfStar = rating - numberOfFullStars >= 0.5; // Check if there's a half star
    const starIcons = [];
  
    // Create full star icons
    for (let i = 0; i < numberOfFullStars; i++) {
      starIcons.push(<Star />);
    }
  
    // Add a half star if applicable
    if (hasHalfStar) {
      starIcons.push(<HalfStar key="half_star" />);
    }
  
    // Return the generated star icons
    return starIcons;
  };
  
  

  const fetchMore = async () => {
    await delay(async () => {
      const newItems = [];
      const totalFeatures = placeData?.features?.length || 0;
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
      setItems(prevItems => [...prevItems, ...newItems]);

      counter += 10
    })
  }


  
  useEffect(() => {
    fetchMore().then(res => {
      console.log(res);
    }).catch(e => {
      console.log(e);
      return
    })
  }, [placeType])
  
  

  return (
    <IonPage>
      <div className="filter1 active:scale-125 transition">
      <button onClick={handleRestaurantFilter}><Restaurant /></button>
    </div>
      <div className="filter2 active:scale-125 transition">
      <button onClick={handleCafeFilter}><Cafe/></button>
      
      </div>
      <div className="filter3 active:scale-125 transition">
      <button onClick={handleBarFilter} ><Bar/></button>
      
      </div>
      <div className="filter4 active:scale-125 transition">
      <button onClick={handleParkFilter}><Park/></button>
      
      </div>
    
    <div className = "shops">
    <div className="card w-96 bg-base-100 shadow-xl">
  
</div>
    <div style={{right: 0,height: 802, width: 393,overflow: 'auto'}}>
      <InfiniteScroll
        useWindow={false}
        threshold={100}
        loadMore={fetchMore}
        loader={<span className="loading loading-bars loading-lg items-center"></span>}
      >
        {items.map(item => <div key={item}>{item}</div>)}
      </InfiniteScroll>
    </div>

    </div>
    
    </IonPage>
  )
}

export default DivScroller
