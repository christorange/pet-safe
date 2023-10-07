import Map, { Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FC } from 'react';

const MainMap: FC = () => {

  return(
    <>
      <Map
        reuseMaps 
        initialViewState={{
          longitude: -71.0589,
          latitude: 42.3601,
          zoom: 12
        }}
        style={{
          width: '100vw',
          height: '100vh'
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      >

      </Map>
    </>
  )
}

export default MainMap;