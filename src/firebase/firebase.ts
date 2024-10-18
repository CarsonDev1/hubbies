import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA3YE0i5LKyFYlrrnq8cNKKVPa1XYRXGEA',
  authDomain: 'hubbies-fc4a2.firebaseapp.com',
  projectId: 'hubbies-fc4a2',
  storageBucket: 'hubbies-fc4a2.appspot.com',
  messagingSenderId: '113083482307',
  appId: '1:113083482307:web:0f7278f18196ca0155a276',
  measurementId: 'G-6T6FQNTWHB',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);

export { storage, ref, uploadBytesResumable, getDownloadURL };
