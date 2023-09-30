import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <p className='text-center font-bold'>Tab3</p>
        </IonToolbar>
      </IonHeader>
      <div className='btn bg-purple-900 mb-4 w-20'>button</div>
    </IonPage>
  );
};

export default Tab3;
