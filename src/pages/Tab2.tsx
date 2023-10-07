import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ThreeDMap from '../components/3DMap';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <h3 className='text-center'>3D Building Map</h3>
        </IonToolbar>
      </IonHeader>
      {/* <ThreeDMap /> */}
    </IonPage>
  );
};

export default Tab2;
