// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBz6mb-M-YN3Epf68blwX7HWdpcnGL7yrM",
    authDomain: "kaspi-kz.firebaseapp.com",
    projectId: "kaspi-kz",
    storageBucket: "kaspi-kz.firebasestorage.app",
    messagingSenderId: "568577853927",
    appId: "1:568577853927:web:52795cf3abdb80fee69542",
    measurementId: "G-T1969Q40N8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);