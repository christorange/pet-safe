import Map, { Source, Layer, GeolocateControl } from 'react-map-gl';
import { FC, useRef, useCallback, useState } from 'react';
import { trpc } from '../api';
import { SymbolLayer, MapRef, Popup, MapLayerMouseEvent } from 'react-map-gl';
import { motion, AnimatePresence } from 'framer-motion';
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/clerk-react';

import { BarIcon } from '@/assets/icons/BarIcon';
import { RestaurantIcon } from '@/assets/icons/RestaurantIcon';
import { CafeIcon } from '@/assets/icons/CafeIcon';
import { ParkIcon } from '@/assets/icons/ParkIcon';
import { HeartICon } from '@/assets/icons/HeartIcon';
import { UserIcon } from '@/assets/icons/UserIcon';
import { FilterIcon } from '@/assets/icons/FilterIcon';
import {clsx} from 'clsx';

import 'mapbox-gl/dist/mapbox-gl.css';

interface IPopupInfo {
  latitude: number;
  longitude: number;
  name: string;
  type: string;
}

const MainMap: FC = () => {
  
  const [placeType, setPlaceType] = useState<'all' | 'bars' | 'restaurants' | 'cafes' | 'parks'>('all')
  const [popupInfo, setPopupInfo] = useState<IPopupInfo | null>(null)
  const [showFilter, setShowFilter] = useState<boolean>(false)

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

  const toggleShowFilter = useCallback(() => {
    setShowFilter((prev) => !prev)
  }, [])

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
      name: place?.properties?.name,
      type: place?.properties?.type
    })
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
            className='accent-brand-200 w-full rounded-full bg-brand border-brand-200 border-2 border-opacity-30 
              focus:shadow-2xl focus:ring-0 focus:border-brand-200 focus:border-opacity-70 py-2.5 ps-12 transition-all '
          />
          <button type='button' className='absolute inset-y-0 start-0 text-text w-12 place-content-center grid'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
        </div>
        
        <AnimatePresence>
          {showFilter &&
            <div className='absolute right-8 bottom-24 flex flex-col gap-2'>
              <motion.div
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
              >
                <CafeIcon 
                  onClick={handleCafeFilter}
                  className='active:scale-125 transition'
                />
              </motion.div>
              <motion.div
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
              >
                <RestaurantIcon 
                  onClick={handleRestaurantFilter} 
                  className='active:scale-125 transition'
                />
              </motion.div>
              <motion.div
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
              >
                <BarIcon 
                  onClick={handleBarFilter}
                  className='active:scale-125 transition'
                />
              </motion.div>
              <motion.div
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
              >
                <ParkIcon 
                  onClick={handleParkFilter} 
                  className='active:scale-125 transition'
                />
              </motion.div>
            </div>
          }
        </AnimatePresence>

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
        <AnimatePresence>
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
                <motion.div 
                  initial={{opacity:0, y:8}}
                  animate={{opacity:1, y:0}}
                  exit={{opacity:0, y:8}}
                  className='text-brand2-200 text-center'>
                  <p className='mb-2 font-bold text-base'>
                    {popupInfo.name}
                  </p>
                  <div className='mb-3 text-sm flex gap-2 justify-center'>
                    <p>
                      {popupInfo.type}
                    </p>
                    <p>
                      4.7/5.0
                    </p>
                  </div>
                  <button className='btn-sm rounded-lg bg-brand2 text-text-100'>
                    OPEN
                  </button>
                </motion.div>
              </Popup>
          }
        </AnimatePresence>

        {/* bottom bar */}
        <div className='absolute bottom-8 left-[20%] w-[60vw] flex items-center justify-center gap-10 bg-brand-100 
          h-16 rounded-full text-3xl text-brand-200 shadow-300 border-2 border-brand-200 border-opacity-30'>
          <button
            className='grid place-items-center
            active:scale-125 transition ease-in-out duration-200'
          >
            <HeartICon strokeWidth='1.8'/>
          </button>
          <SignedIn>
            <UserButton 
              afterSignOutUrl='/'
              userProfileUrl='/userprofile'
            />
          </SignedIn>
          <SignedOut>
            <SignInButton
              redirectUrl='/userprofile'
              mode='modal'
            >
              <button
                className='grid place-items-center
                active:scale-125 transition ease-in-out duration-200'
                >
                <UserIcon strokeWidth='1.8'/>
              </button>
            </SignInButton>
          </SignedOut>
          <button
            onClick={toggleShowFilter}
            className={clsx(
              'grid place-items-center active:scale-125 transition ease-in-out duration-200',
              showFilter && 'rotate-90'
            )}
          >
            <FilterIcon strokeWidth='1.8'/>
          </button>
        </div>
        <GeolocateControl position='bottom-left'/>
      </Map>
    </>
  )
}

export default MainMap;