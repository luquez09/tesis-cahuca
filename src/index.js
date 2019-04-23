import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyDuKIXBpoAPwh4vVtZ6MA58MWsefYD6CRI",
    authDomain: "cahuca-856a5.firebaseapp.com",
    databaseURL: "https://cahuca-856a5.firebaseio.com",
    projectId: "cahuca-856a5",
    storageBucket: "cahuca-856a5.appspot.com",
    messagingSenderId: "694878651938"
};

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
