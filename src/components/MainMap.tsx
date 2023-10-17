import Map, { Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FC, useState } from 'react';
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

  // const uLocationLayer: CircleLayer = {
  //   id: 'uLocationLayer',
  //   type: 'circle',
  //   paint: {
  //     'circle-radius': 10,
  //     'circle-color': 'red'
  //   }
  // }
  
// Getting User's location
  const [position, setPosition] = useState<Geoposition>();
  
  const getLocation = async () => {
    try{   
      const position = await Geolocation.getCurrentPosition();
      setPosition(position);
    }catch (e) {
      console.log(e);
    }
  };
  //error here, its requesting nonstop
  const location = getLocation();
  console.log(location);
  return(
    <>
      { isLoading && <span className="loading loading-ring loading-lg"></span>}
      {  allPlacesData &&
        <Map
          initialViewState={{
            longitude: position ? `${position.coords.longitude}` : -71.0589,
            latitude: position ? `${position.coords.latitude}` : 42.3601,
            zoom: 12
          }}
          style={{
            width: '100vw',
            height: '100vh'
          }}
          mapStyle="mapbox://styles/christorange/clnt6569c00e701qugxg8ffty"
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        >
          <Source
            id='allPlaces'
            type='geojson'
            data={allPlacesData}
          >
            <Layer {...allPlacesLayer} />
          </Source>

          {/* <Source
            id='uLocationLayer'
            type='geojson'
            data={location}
          >
            <Layer {...allPlacesLayer} />
          </Source> */}
        </Map>}
    </>
  )
}

export default MainMap;