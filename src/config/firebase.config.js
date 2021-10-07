import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyD1lEvnX2l1FU-EzOyJQ0I3E8w1Jii5RrI",
    authDomain: "pasos-7ccb3.firebaseapp.com",
    projectId: "pasos-7ccb3",
    storageBucket: "pasos-7ccb3.appspot.com",
    messagingSenderId: "1008831385347",
    appId: "1:1008831385347:web:ae27ecf0071023423da336",
    measurementId: "G-KM1F5279E4"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}
const Firebase = firebase
export default Firebase