const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyBpGHwMSmTEU2Tp7kM_w9AUdOW2qqYZPRw",
  authDomain: "matchune.firebaseapp.com",
  projectId: "matchune",
  storageBucket: "matchune.appspot.com",
  messagingSenderId: "730438131439",
  appId: "1:730438131439:web:b95aa02cd364125a9a451a",
};

const appFires = initializeApp(firebaseConfig);
const store = getFirestore(appFires);

module.exports = { store };
