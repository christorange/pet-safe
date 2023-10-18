import Map, { Source, Layer, useMap } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FC, useEffect } from 'react';
import { trpc } from '../api';
import type { CircleLayer } from 'react-map-gl';

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
  return(
    <>
      { isLoading && <span className="loading loading-dots loading-lg m-auto"></span>}
      { allPlacesData &&
        <Map
          initialViewState={{
            longitude: -71.0589,
            latitude: 42.3601,
            zoom: 12
          }}
          style={{
            width: '100vw',
            height: '100vh'
          }}
          mapStyle="mapbox://styles/christorange/clnt6653300d601qj6z456rlx"
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
        </Map>
      }
    </>
  )
}

export default MainMap;