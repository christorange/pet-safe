import * as firebase from 'firebase/app';
import * as auth from 'firebase/auth'

const config = {
    apiKey: "AIzaSyDbkvB9xum5FE904t9bcNYQqc2q9ukZSnI",
    authDomain: "petventure-777fe.firebaseapp.com",
    projectId: "petventure-777fe",
    storageBucket: "petventure-777fe.appspot.com",
    messagingSenderId: "486918338573",
    appId: "1:486918338573:web:cbdca5432ce09e496dbd44",
    measurementId: "G-9537PJJX7H"
}


firebase.initializeApp(config)

export async function loginUser(username: String, password: string) {
    const email = `${username}`
    const Auth = auth.getAuth();
    try{
        const res = await auth.signInWithEmailAndPassword(Auth, email, password)
        console.log(res)
        return true
    } catch(error) {
        console.log(error)
        return false
    }
}