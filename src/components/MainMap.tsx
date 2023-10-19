import Map, { Source, Layer, useMap } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FC, useState, useEffect } from 'react';
import { trpc } from '../api';
import type { CircleLayer } from 'react-map-gl';

import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import React from "react";




const MainMap: FC = () => {

  const {data: allPlacesData, isLoading} = trpc.places.allPlaces.useQuery()
  
  const allPlacesLayer: CircleLayer = {
    id: 'allPlacesLayer',
    type: 'circle',
    paint: {
      'circle-radius': 7,
      'circle-color': '#835dd3'
    },
    source: 'allPlaces'
  }
  
  
  const uLocationLayer: CircleLayer = {
    id: 'uLocationLayer',
    type: 'circle',
    paint: {
      'circle-radius': 10,
      'circle-color': 'red',
    },
    source: 'uLocation', 
  };


// Getting User's location
const [position, setPosition] = useState<Geoposition | null>(null);

const getLocation = async () => {
  try {
    const currentPosition = await Geolocation.getCurrentPosition();
    setPosition(currentPosition);
  } catch (e) {
    console.error(e);
  }
};

// Call getLocation when the component mounts using useEffect
useEffect(() => {
  getLocation();
}, []);

  return(
    <>
      { isLoading && <span className="loading loading-dots loading-lg m-auto"></span>}
      { allPlacesData &&
        <Map
          initialViewState={{
            longitude: position ? parseFloat(`${position.coords.longitude}`) : -71.0589,
            latitude: position ? parseFloat(`${position.coords.latitude}`) : 42.3601,
            zoom: 12
          }}
          style={{
            width: '100vw',
            height: '100vh'
          }}
          mapStyle="mapbox://styles/christorange/clnt6569c00e701qugxg8ffty"
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        >
          <div className='relative top-8 mx-5'>
            <input 
              type='text' 
              className='appearance-none w-full rounded-full border-secondry-dark py-2.5 text-sm text-text ps-12'
            />
            <button type='button' className='absolute inset-y-0 start-0 text-text w-12 place-content-center grid'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
          </div>
          <Source
            id='allPlaces'
            type='geojson'
            data={allPlacesData}
          >
            <Layer {...allPlacesLayer} />
          </Source>

          {position && ( // Render the user's location only if it's available
            <Source
              id="uLocation"
              type="geojson"
              data={{
                type: 'Point',
                coordinates: [position.coords.longitude, position.coords.latitude],
              }}
            >
              <Layer {...uLocationLayer} />
            </Source>
          )}

        </Map>}
    </>
  )
}

export default MainMap;