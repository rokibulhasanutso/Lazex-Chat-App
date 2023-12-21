import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDn89QcUmAQ7MnMC8tvbAM3te4ruCnqWMI",
  authDomain: "lazexchat.firebaseapp.com",
  projectId: "lazexchat",
  storageBucket: "lazexchat.appspot.com",
  messagingSenderId: "476876818932",
  appId: "1:476876818932:web:0e64ec8f9e19a1080cd1a1",
  measurementId: "G-CFKDP8KMCZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
