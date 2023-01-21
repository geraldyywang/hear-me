import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA33hMVfCJgJN0gaTRWWl0hbH4auvXBmZk",
  authDomain: "hearme-c1639.firebaseapp.com",
  projectId: "hearme-c1639",
  storageBucket: "hearme-c1639.appspot.com",
  messagingSenderId: "219750188659",
  appId: "1:219750188659:web:2bdfa2554bc5465efc4c06",
  measurementId: "G-H9QY6LE18D",
};

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const train1ColRef = collection(db, "train_1");
export const train2ColRef = collection(db, "train_2");
