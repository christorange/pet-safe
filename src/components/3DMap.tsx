import Map, { Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FC } from 'react';
import type { FillExtrusionLayer } from 'react-map-gl';

const ThreeDMap: FC = () => {

  const buildingLayer: FillExtrusionLayer = {
    'id': 'add-3d-buildings',
    'source': 'composite',
    'source-layer': 'building',
    'filter': ['==', 'extrude', 'true'],
    'type': 'fill-extrusion',
    'minzoom': 15,
    'paint': {
      'fill-extrusion-color': '#aaa',
      
      // Use an 'interpolate' expression to
      // add a smooth transition effect to
      // the buildings as the user zooms in.
      'fill-extrusion-height': [
      'interpolate',
      ['linear'],
      ['zoom'],
      15,
      0,
      15.05,
      ['get', 'height']
      ],
      'fill-extrusion-base': [
      'interpolate',
      ['linear'],
      ['zoom'],
      15,
      0,
      15.05,
      ['get', 'min_height']
      ],
      'fill-extrusion-opacity': 0.4
    }
  }

  return(
    <>
      <Map
        reuseMaps
        initialViewState={{
          longitude: -71.0589,
          latitude: 42.3601,
          zoom: 15.5,
          pitch: 45,
        }}
        style={{
          width: '100vw',
          height: '100vh'
        }}
        mapStyle="mapbox://styles/christorange/clnt6569c00e701qugxg8ffty"
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      >
        <Layer {...buildingLayer}/>
      </Map>
    </>
  )
}

export default ThreeDMap;