import { IonPage } from '@ionic/react';
import MainMap from '../components/MainMap';
import MainDrawer from '../components/Drawer';
import { useEffect } from 'react';
import { useMap } from 'react-map-gl';

const Tab1: React.FC = () => {

  const {current: map} = useMap();
  
  useEffect(()=>{
    map && map.on('load', ()=>{
      map.resize()
    })
  }, [map])

  return (
    <IonPage>
      <MainMap />
    </IonPage>
  );
};

export default Tab1;
