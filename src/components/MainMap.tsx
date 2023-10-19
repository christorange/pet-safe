import Map, { Source, Layer } from 'react-map-gl';
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
      { isLoading && <span className="loading loading-ring loading-lg"></span>}
      {  allPlacesData &&
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
          mapStyle="mapbox://styles/christorange/clnt6653300d601qj6z456rlx"
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        >
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