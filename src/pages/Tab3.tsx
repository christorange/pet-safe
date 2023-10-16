import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { trpc } from '../api';
const Tab3: React.FC = () => {
  // const {data: text} = trpc.api.hello.useQuery()
  const {data:text} = trpc.api.version.useQuery();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <p className='text-center font-bold'>Tab3</p>
        </IonToolbar>
      </IonHeader>
      <div className='btn mb-20 w-20 ml-5'>button</div>
      {text? <h3>{JSON.stringify(text)}</h3> : null}
    </IonPage>
  );
};

export default Tab3;
