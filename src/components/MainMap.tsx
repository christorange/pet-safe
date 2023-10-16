import Map, { Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FC } from 'react';
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
      { isLoading && <span className="loading loading-ring loading-lg"></span>}
      {  allPlacesData &&
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
        </Map>}
    </>
  )
}

export default MainMap;