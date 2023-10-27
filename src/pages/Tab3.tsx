import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import MainDrawer from '../components/Drawer';
const Tab3: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <p className='text-center font-bold'>Login</p>
        </IonToolbar> 
      </IonHeader>
      <IonContent className='ion-padding'>
          <IonButton routerLink='login'>Login</IonButton>
          <IonButton routerLink='Register' color='secondary'>Register</IonButton>
      </IonContent>
      <MainDrawer />
    </IonPage>
  );
};

export default Tab3;
