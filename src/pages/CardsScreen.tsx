import { IonPage } from '@ionic/react';
import '../components/distance.css';
import {Restaurant} from '../assets/icons/restaurant'; // Adjust the path to your component
import {Cafe} from '../assets/icons/cafe';
import {Park} from '../assets/icons/park';
import {Bar} from '../assets/icons/bar';

import DivScroller from '../components/DivScroller'
import  React, { FC, useState, useEffect } from 'react';
import { trpc } from '../api';


const CardsScreen: React.FC = () => {
  const {data: allPlacesData, isLoading} = trpc.places.allPlaces.useQuery()
  const restaurants = [
    { id: 1, name: 'The Friendly Toast', cuisine: 'Restaurat' },
    { id: 2, name: 'Restaurant B', cuisine: 'Cafe' },
    { id: 3, name: 'Restaurant C', cuisine: 'Park' },
    { id: 4, name: 'Park-9', cuisine: 'Bar' },
    // Add more restaurants
  ];

  // State to hold the filtered restaurants
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);

  // Function to filter restaurants by cuisine
  const handleFilter = (cuisine: string) => {
    const filtered = restaurants.filter(restaurant => restaurant.cuisine === cuisine);
    setFilteredRestaurants(filtered);
  };
  return (
    <IonPage>
     <div className = "filter1">
     <button onClick={() => handleFilter('Restaurat')}><Restaurant /></button>
   </div>
    <div className = "filter2">
    <button onClick={() => handleFilter('Cafe')}><Cafe/></button>
    </div>
    <div className = "filter3">
    <button onClick={() => handleFilter('Park')}><Bar/></button>
    </div>
    <div className = "filter4">
    <button onClick={() => handleFilter('Bar')}><Park/></button>
    </div>
    <div className = "shops">
      <DivScroller/>
<ul>
  {filteredRestaurants.map(restaurant => (
    <li key={restaurant.id}>
      {restaurant.name} - {restaurant.cuisine}
    </li>
  ))}

</ul>

    </div>
     
    </IonPage>
  );
};
// {pane === '1' && <DivScroller/>}
export default CardsScreen;






