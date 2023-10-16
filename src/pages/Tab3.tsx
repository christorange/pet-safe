import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { trpc } from '../api';
const Tab3: React.FC = () => {
  const {data: placesData} = trpc.places.allPlaces.useQuery()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <p className='text-center font-bold'>Tab3</p>
        </IonToolbar>
      </IonHeader>
      <div className='btn mb-20 w-20 ml-5'>button</div>
      {placesData && <h3>{JSON.stringify(placesData)}</h3>}
    </IonPage>
  );
};

export default Tab3;
