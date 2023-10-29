import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar, IonToast } from '@ionic/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from './../../firebaseConfig';


const login: React.FC = () => {
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isToast1Open, setIs1ToastOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function login() {
    const res = await loginUser(username, password)
    console.log(res)
    if (res){
      setIsToastOpen(true);
    }else{
      setIs1ToastOpen(true);
    }
  }
  


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <p className='text-center font-bold'>Login</p>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <IonInput 
            placeholder='Username?'
            onIonChange={(e: any) => setUsername(e.target.value)} 
        />
        <IonInput 
            type='password'
            placeholder='Password?' 
            onIonChange={(e: any) => setPassword(e.target.value)}
        />

        <IonButton id= "open-toast" onClick={(login)}>Login</IonButton>
        <p>
            New Here?  <Link to="/register">register</Link>
        </p>
      <IonToast isOpen={isToastOpen} onDidDismiss={() => setIsToastOpen(false)} message="You have logged In!" duration={5000}></IonToast>
      <IonToast isOpen={isToast1Open} onDidDismiss={() => setIsToastOpen(false)} message="Error Logging In with Your Credentials" duration={5000}></IonToast>
      </IonContent>
    </IonPage>
  );
};

export default login;
