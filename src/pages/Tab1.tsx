import { IonPage } from '@ionic/react';
import MainMap from '../components/MainMap';
import MainDrawer from '../components/Drawer';
import { useMap } from 'react-map-gl';

const Tab1: React.FC = () => {

  return (
    <IonPage>
      <MainMap />
    </IonPage>
  );
};

export default Tab1;
