import Map, { Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FC } from 'react';
import type { FillExtrusionLayer } from 'react-map-gl';
import MapGL from "react-map-gl";

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
      <MapGL
        initialViewState={{
          longitude: -71.0589,
          latitude: 42.3601,
          zoom: 15.5,
          pitch: 45,
          
        }}
        style={{
          width: '100vw',
          height: '100vh',
          
        }}
        
        mapStyle="mapbox://styles/christorange/clnt6653300d601qj6z456rlx"
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        
      >
        <Layer {...buildingLayer}/>
      </MapGL>
    </>
  )
}

export default ThreeDMap;
/*const [viewport, setViewport] = useState({latitude: 0,      // Initialize with default values
  longitude: 0,     // Initialize with default values
  zoom: 15.5});
const ThreeDMap = () => {
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
 /*const markerRef = useRef<mapboxgl.Marker>();
  const popup = useMemo(() => {
        return new mapboxgl.Popup().setText('Hello world!');
      }, [])
  const togglePopup = useCallback(() => {
        markerRef.current?.togglePopup();
      }, []);
  useEffect(() => {
    
      
    const map = new mapboxgl.Map({
      container: "mapContainer",
      style: "mapbox://styles/christorange/clnt6653300d601qj6z456rlx",
      center: [-71.0589, 42.3601],
      zoom: 15.5,
      pitch: 45,
      scrollZoom: true,
      
    })
    
    navigator.geolocation.getCurrentPosition((pos) => {
      setViewport({
        ...viewport,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        zoom: 15.5,
      });
    });
    map.on("load", () => {
      map.touchZoomRotate.enable();
      map.addControl(new mapboxgl.NavigationControl(), "top-right");
      map.addLayer({
        'id': 'add-3d-buildings',
    'source': 'composite',
    'source-layer': 'building',
    'filter': ['==', 'extrude', 'true'],
    'type': 'fill-extrusion',
    'minzoom': 15,
    'paint': {
      'fill-extrusion-color': '#aaa',
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
        },
      })
    })

    // cleanup function to remove map on unmount
    return () => map.remove()
  }, [])

  return  (
 

          <Map id="mapContainer" style={{ width: "100vw", height: "100vh"}}>
 
          <Marker
              longitude={viewport.latitude}
              latitude={viewport.longitude}
             
 
            > <img style={{ width: 50, height: 100 ,zIndex:999}} src="https://static.vecteezy.com/system/resources/previews/000/552/683/non_2x/geo-location-pin-vector-icon.jpg" />
            </Marker>
        </Map>
        

      


  )
}

export default ThreeDMap;*/
