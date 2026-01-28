import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, // Tetap sediakan ini
  signInWithRedirect, // Tambahkan ini sebagai alternatif
  signOut 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB23UjVDMd0bEZv2Fg3_3QMmcqgBCz51cE",
  authDomain: "mlnaportofolio.firebaseapp.com",
  projectId: "mlnaportofolio",
  storageBucket: "mlnaportofolio.firebasestorage.app",
  messagingSenderId: "813509952609",
  appId: "1:813509952609:web:568539ce7526931c575620"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);

export const db = getFirestore(app);
const provider = new GoogleAuthProvider();



// Tambahkan custom parameter agar selalu muncul pilihan akun
provider.setCustomParameters({ prompt: 'select_account' });

export const loginWithGoogle = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Login Error:", error.message);
    // Jika popup diblokir, gunakan redirect sebagai cadangan
    if (error.code === 'auth/popup-blocked') {
      await signInWithRedirect(auth, provider);
    }
  }
};

export const logout = () => signOut(auth);