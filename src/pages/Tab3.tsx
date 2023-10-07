import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <p className='text-center font-bold'>Tab3</p>
        </IonToolbar>
      </IonHeader>
      <div className='btn mb-20 w-20 ml-5'>button</div>
    </IonPage>
  );
};

export default Tab3;
