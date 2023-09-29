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
      mapStyle="mapbox://styles/mapbox/streets-v12"
      mapboxAccessToken='pk.eyJ1IjoiY2hyaXN0b3JhbmdlIiwiYSI6ImNsbjUxMG9xbTAxanQyanA1MDNreDhubGQifQ.P8NylqgIRxbjGluqigXGKw'

    >

    </Map>
    </>
  )
}

export default MainMap;