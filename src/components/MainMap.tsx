import Map, { Source, Layer, GeolocateControl } from 'react-map-gl';
import { FC, useRef, useCallback, useState } from 'react';
import { trpc } from '../api';
import { SymbolLayer, MapRef, Popup, MapLayerMouseEvent } from 'react-map-gl';
import { BarIcon } from '@/assets/icons/BarIcon';
import { RestaurantIcon } from '@/assets/icons/RestaurantIcon';
import { CafeIcon } from '@/assets/icons/CafeIcon';
import { ParkIcon } from '@/assets/icons/ParkIcon';

import 'mapbox-gl/dist/mapbox-gl.css';

interface IPopupInfo {
  latitude: number;
  longitude: number;
  name: string;
}

const MainMap: FC = () => {
  
  const [placeType, setPlaceType] = useState<'all' | 'bars' | 'restaurants' | 'cafes' | 'parks'>('all')
  const [popupInfo, setPopupInfo] = useState<IPopupInfo | null>(null)
  
  const handleCafeFilter = useCallback(() => {
    if (placeType === 'cafes'){
      setPlaceType('all')
    }else {
      setPlaceType('cafes')
    }
  }, [placeType])

  const handleRestaurantFilter = useCallback(() => {
    if (placeType === 'restaurants'){
      setPlaceType('all')
    }else {
      setPlaceType('restaurants')
    }
  }, [placeType])

  const handleBarFilter = useCallback(() => {
    if (placeType === 'bars'){
      setPlaceType('all')
    }else {
      setPlaceType('bars')
    }
  }, [placeType])

  const handleParkFilter = useCallback(() => {
    if (placeType === 'parks'){
      setPlaceType('all')
    }else {
      setPlaceType('parks')
    }
  }, [placeType])

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
      map.resize();
      if(!map.hasImage('barIcon')){
        map.loadImage('src/assets/bar-icon.png', (error, image) => {
          if (error || !image) throw error;
          map.addImage('barIcon', image, {sdf: false});
        })
      }

      if (!map.hasImage('restaurantIcon')){
        map.loadImage('src/assets/restaurant-icon.png', (error, image) => {
          if (error || !image) throw error;
          map.addImage('restaurantIcon', image, {sdf: false});
        })

        // let img = new Image(20,20);
        // img.crossOrigin = 'Anonymous';
        // img.src = 'src/assets/restaurant-icon.png';
        // img.onload = ()=> {
        //   map.addImage('restaurantIcon', img);
        // }
      }

      if (!map.hasImage('cafeIcon')){
        map.loadImage('src/assets/cafe-icon.png', (error, image) => {
          if (error || !image) throw error;
          map.addImage('cafeIcon', image, {sdf: false});
        })
      }

      if (!map.hasImage('parkIcon')){
        map.loadImage('src/assets/park-icon.png', (error, image) => {
          if (error || !image) throw error;
          map.addImage('parkIcon', image, {sdf: false});
        })
      }
      
    }
  },[])

  const mapOnClick = useCallback((e: MapLayerMouseEvent) => {
    e.preventDefault();
    e.originalEvent.stopPropagation();
    const place = e.features && e.features[0];
    setPopupInfo({  
      longitude: e.lngLat.lng,
      latitude: e.lngLat.lat,
      name: place?.properties?.name
    })
    console.log(popupInfo)
  },[popupInfo])

  // const allPlacesLayer: CircleLayer = {
  //   id: 'allPlacesLayer',
  //   type: 'circle',
  //   paint: {
  //     'circle-radius': 7,
  //     'circle-color': '#835dd3'
  //   },
  //   source: 'allPlaces'
  // }

  const barLayer: SymbolLayer = {
    id: 'barLayer',
    type: 'symbol',
    layout: {
      'icon-image': 'barIcon',
      'icon-size': 0.7,
      'icon-allow-overlap': true,
      'text-field': '{name}',
      'text-size': 11,
      'text-offset': [0, 2.5],
    },
    source: 'bars',
    interactive: true
  }

  const restaurantLayer: SymbolLayer = {
    id: 'restaurantLayer',
    type: 'symbol',
    layout: {
      'icon-image': 'restaurantIcon',
      'icon-size': 0.7,
      'icon-allow-overlap': true,      
      'text-field': '{name}',
      'text-size': 11,
      'text-offset': [0, 2.5],
    },
    source: 'restaurants',
    interactive: true
  }

  const cafeLayer: SymbolLayer = {
    id: 'cafeLayer',
    type: 'symbol',
    layout: {
      'icon-image': 'cafeIcon',
      'icon-size': 0.7,
      'icon-allow-overlap': true,
      'text-field': '{name}',
      'text-size': 11,
      'text-offset': [0, 2.5],
    },
    source: 'cafes',
    interactive: true
  }

  const parkLayer: SymbolLayer = {
    id: 'parkLayer',
    type: 'symbol',
    layout: {
      'icon-image': 'parkIcon',
      'icon-size': 0.7,
      'icon-allow-overlap': true,
      'text-field': '{name}',
      'text-size': 11,
      'text-offset': [0, 2.5]
    },
    source: 'parks',
    interactive: true
  }
  

  return(
    <>
      <Map
        reuseMaps
        initialViewState={{
          longitude:  -71.0589,
          latitude:  42.3601,
          zoom: 12
        }}
        style={{
          width: '100vw',
          height: '100vh'
        }}
        mapStyle="mapbox://styles/christorange/clnt6653300d601qj6z456rlx"
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        ref={mapRef}
        onLoad={()=>mapOnLoad()}
        onClick={mapOnClick}
        interactiveLayerIds={['barLayer', 'restaurantLayer', 'cafeLayer', 'parkLayer']}
      >
        <div className='relative top-16 mx-5 text-text margi'>
          <input
            type='text'
            placeholder='Search for pet friendly places'
            className='w-full rounded-full bg-brand border-brand-200 border-2 border-opacity-50 focus:outline-brand-200 focus:border-none py-2.5 ps-12'
          />
          <button type='button' className='absolute inset-y-0 start-0 text-text w-12 place-content-center grid'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
        </div>
        
        <div className='absolute right-8 bottom-5 flex flex-col gap-2'>
          <CafeIcon onClick={handleCafeFilter}/>
          <RestaurantIcon onClick={handleRestaurantFilter} />
          <BarIcon onClick={handleBarFilter}/>
          <ParkIcon onClick={handleParkFilter} />
        </div>

        {
          isBarsLoading && isCafesLoading && isRestaurantsLoading && isParksLoading && 
          <div className='w-full h-full bg-black bg-opacity-50 grid place-items-center'>
            <span className="loading loading-dots loading-lg m-auto"></span>
          </div>
        }
        {
          barsData && (placeType === 'all' || placeType === 'bars') && 
          <Source
            id='bars'
            type='geojson'
            data={barsData}
          >
            <Layer {...barLayer} />
          </Source>
        }
        {
          restaurantsData && (placeType === 'all' || placeType === 'restaurants') &&
          <Source
            id='restaurants'
            type='geojson'
            data={restaurantsData}
          >
            <Layer {...restaurantLayer} />
          </Source>
        }
        {
          cafesData && (placeType === 'all' || placeType === 'cafes') &&
          <Source
            id='cafes'
            type='geojson'
            data={cafesData}
          >
            <Layer {...cafeLayer} />
          </Source>
        }
        {
          parksData && (placeType === 'all' || placeType === 'parks') &&
          <Source
            id='parks'
            type='geojson'
            data={parksData}
          >
            <Layer {...parkLayer} />
          </Source>
        }
        {
          popupInfo?.name && 
            <Popup 
              longitude={popupInfo.longitude} 
              latitude={popupInfo.latitude}
              anchor='bottom'
              onClose={()=>setPopupInfo(null)}
              closeOnClick={false}
              closeButton={false}
              >
              <div className='text-brand2-200 flex flex-col justify-center'>
                <p className='mb-2 font-bold text-base text-center'>
                  {popupInfo.name}
                </p>
                <button className='btn-sm rounded-lg bg-brand2 text-text-100'>
                  OPEN
                </button>
              </div>
            </Popup>
        }

        <GeolocateControl  position='bottom-left'/>
      </Map>
    </>
  )
}

export default MainMap;