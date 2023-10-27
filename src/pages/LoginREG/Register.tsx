import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const register: React.FC = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');

  function registerUser() {
    console.log(username, password, cpassword)
  }
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <p className='text-center font-bold'>Register</p>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <IonInput 
            placeholder='Username?'
            onIonChange={(e: any) => setUsername(e.target.value)} 
        />
        <IonInput 
            placeholder='Password?' 
            onIonChange={(e: any) => setPassword(e.target.value)}
        />
        <IonInput 
            placeholder='Confirm Password?' 
            onIonChange={(e: any) => setPassword(e.target.value)}
        />
        <IonButton onClick={(registerUser)}>Register</IonButton>
        <p>
            Already have an account  <Link to="/login">login</Link>
        </p>
      </IonContent>
       

    </IonPage>
  );
};

export default register;
