import { IonPage } from '@ionic/react';
import '../components/distance.css';
import {Restaurant} from '../components/restaurant'; // Adjust the path to your component
import {Cafe} from '../components/cafe';
import {Park} from '../components/park';
import {Bar} from '../components/bar';
import  React, { FC, useState, useEffect } from 'react';
import { trpc } from '../api';
const Tab1: React.FC = () => {
  const {data: allPlacesData, isLoading} = trpc.places.allPlaces.useQuery()

  const restaurants = [
    { id: 1, name: 'Restaurant A', cuisine: 'Italian' },
    { id: 2, name: 'Restaurant B', cuisine: 'Mexican' },
    { id: 3, name: 'Restaurant C', cuisine: 'Indian' },
    { id: 4, name: 'Restaurant D', cuisine: 'Chinese' },
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
      <button onClick={() => handleFilter('Italian')}><Restaurant /></button>

   </div>
    <div className = "filter2">
    <button onClick={() => handleFilter('Mexican')}><Cafe/></button>
    </div>
    <div className = "filter3">
    <button onClick={() => handleFilter('Indian')}><Bar/></button>
    </div>
    <div className = "filter4">
    <button onClick={() => handleFilter('Chinese')}><Park/></button>
    </div>
    <div className = "shops">
    <div className="card w-96 bg-base-100 shadow-xl">
  <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>

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

export default Tab1;
