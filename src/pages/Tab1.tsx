import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import MainMap from '../components/MainMap';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <h3 className='text-center'>Map</h3>
        </IonToolbar>
      </IonHeader>
      <MainMap/>
    </IonPage>
  );
};

export default Tab1;
