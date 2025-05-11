import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDVDbFrGfXVoZltfVhoEKFkMm4rrE-MRl0',
  authDomain: 'flowboard-5b2d5.firebaseapp.com',
  projectId: 'flowboard-5b2d5',
  storageBucket: 'flowboard-5b2d5.firebasestorage.app',
  messagingSenderId: '390019724729',
  appId: '1:390019724729:web:0d7481703a649c0fd23268'
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
