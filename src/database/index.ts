import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'


// objeto de configuracão do firebase build
const firebaseConfig = {
    apiKey: "AIzaSyBYQBbDEedm43eFOw6aVYcrGljya1Prs84",
    authDomain: "projetoalpha-b5ee8.firebaseapp.com",
    projectId: "projetoalpha-b5ee8",
    storageBucket: "projetoalpha-b5ee8.appspot.com",
    messagingSenderId: "661461579263",
    appId: "1:661461579263:web:d938aba6b4e69a98ede3ca"
};

// objeto de configuracão do firebase de testes
// const firebaseConfig = {
//     apiKey: "AIzaSyDwvyJTaEI7Wu11d77IU0DXfXig7Y1OHos",
//     authDomain: "projetoalpha-c8d5e.firebaseapp.com",
//     projectId: "projetoalpha-c8d5e",
//     storageBucket: "projetoalpha-c8d5e.appspot.com",
//     messagingSenderId: "1021811883912",
//     appId: "1:1021811883912:web:541bf8b257a284db89043d"
// };

// objeto de inicializacão do firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore()
export const storage = getStorage(app)