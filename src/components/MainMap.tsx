import Map, { Source, Layer, useMap, GeolocateControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FC, useState, useEffect, useRef, useCallback } from 'react';
import { trpc } from '../api';
import type { CircleLayer, SymbolLayer, MapRef } from 'react-map-gl';


const MainMap: FC = () => {

  // const {data: allPlacesData, isLoading, isFetched} = trpc.places.allPlaces.useQuery()
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


  const mapRef = useRef<MapRef | null>(null);

  const mapOnLoad = useCallback(()=>{
    if (mapRef.current){
      const map = mapRef.current.getMap();

      if(!map.hasImage('barIcon')){
        map.loadImage('../assets/bar-icon.png', (error, image) => {
          if (error || !image) throw error;
          map.addImage('barIcon', image, {sdf: true});
        })
      }

      if (!map.hasImage('restaurantIcon')){
        // map.loadImage('../assets/restaurant-icon.png', (error, image) => {
        //   if (error || !image) throw error;
        //   map.addImage('restaurantIcon', image, {sdf: true});
        // })

        let img = new Image(10,10);
        img.crossOrigin = 'Anonymous';
        img.onload = ()=> {
          // if (map.hasImage('restaurantIcon')) return;
          map.addImage('restaurantIcon', img);
        }
        img.src = '../assets/restaurant-icon.png';
      }

      if (!map.hasImage('cafeIcon')){
        map.loadImage('../assets/cafe-icon.png', (error, image) => {
          if (error || !image) throw error;
          map.addImage('cafeIcon', image, {sdf: true});
        })
      }

      if (!map.hasImage('parkIcon')){
        map.loadImage('../assets/park-icon.png', (error, image) => {
          if (error || !image) throw error;
          map.addImage('parkIcon', image, {sdf: true});
        })
      }
      
    }
  },[])

  const allPlacesLayer: CircleLayer = {
    id: 'allPlacesLayer',
    type: 'circle',
    paint: {
      'circle-radius': 7,
      'circle-color': '#835dd3'
    },
    source: 'allPlaces'
  }

  const barLayer: SymbolLayer = {
    id: 'barLayer',
    type: 'symbol',
    layout: {
      'icon-image': 'barIcon',
      'icon-size': 1,
      'icon-allow-overlap': true,
      'text-field': '{name}',
      'text-size': 11
    },
    source: 'bars'
  }

  const restaurantLayer: SymbolLayer = {
    id: 'restaurantLayer',
    type: 'symbol',
    layout: {
      'icon-image': 'restaurantIcon',
      'icon-size': 1,
      'icon-allow-overlap': true,
      'text-field': '{name}',
      'text-size': 11
    },
    source: 'restaurants'
  }

  const cafeLayer: SymbolLayer = {
    id: 'cafeLayer',
    type: 'symbol',
    layout: {
      'icon-image': 'cafeIcon',
      'icon-size': 1,
      'icon-allow-overlap': true,
      'text-field': '{name}',
      'text-size': 11
    },
    source: 'cafes'
  }

  const parkLayer: SymbolLayer = {
    id: 'parkLayer',
    type: 'symbol',
    layout: {
      'icon-image': 'parkIcon',
      'icon-size': 1,
      'icon-allow-overlap': true,
      'text-field': '{name}',
      'text-size': 11
    },
    source: 'parks'
  }
  

  return(
    <>
      <Map
        initialViewState={{
          longitude:  -71.0589,
          latitude:  42.3601,
          zoom: 12
        }}
        style={{
          width: '100vw',
          height: '100vh'
        }}
        mapStyle="mapbox://styles/christorange/clnt66of200dv01qmb9axft65"
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        ref={mapRef}
        onLoad={()=>mapOnLoad()}
      >
        <div className='relative top-16 mx-5'>
          <input
            type='text'
            className='w-full rounded-full bg-brand border-none focus:outline-brand-200 py-2.5 text-sm ps-12'
          />
          <button type='button' className='absolute inset-y-0 start-0 text-text w-12 place-content-center grid'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
        </div>
        {
          isBarsLoading && isCafesLoading && isRestaurantsLoading && isParksLoading && 
          <div className='w-full h-full bg-black bg-opacity-50 grid place-items-center'>
            <span className="loading loading-dots loading-lg m-auto"></span>
          </div>
        }
        {barsData && <Source
          id='bars'
          type='geojson'
          data={barsData}
        >
          <Layer {...barLayer} />
        </Source>}
        {restaurantsData && <Source
          id='restaurants'
          type='geojson'
          data={restaurantsData}
        >
          <Layer {...restaurantLayer} />
        </Source>}
        {cafesData && <Source
          id='cafes'
          type='geojson'
          data={cafesData}
        >
          <Layer {...cafeLayer} />
        </Source>}
        {parksData && <Source
          id='parks'
          type='geojson'
          data={parksData}
        >
          <Layer {...parkLayer} />
        </Source>}

        <GeolocateControl  position='bottom-right'/>
      </Map>
    </>
  )
}

export default MainMap;