const firebase = require("firebase");

const firebaseConfig = {
    apiKey: "AIzaSyC4im1RkjDsb8bIFI8B7pHilZ6my2TILwA",
    authDomain: "react-crud-8d482.firebaseapp.com",
    databaseURL: "https://react-crud-8d482-default-rtdb.firebaseio.com",
    projectId: "react-crud-8d482",
    storageBucket: "react-crud-8d482.appspot.com",
    messagingSenderId: "167057227196",
    appId: "1:167057227196:web:bc36dce5aa3b3e4229bfb9",
    measurementId: "G-P9J852S2NY"
};

firebase.initializeApp(firebaseConfig);

module.exports = firebaseConfig;