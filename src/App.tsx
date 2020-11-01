import React, { FC } from 'react';
import firebase from 'firebase';
import { config } from './config';
import { Home } from './pages/Home';

firebase.initializeApp(config.firebaseConfig);

export const App: FC = () => (
  <div className="App">
    <Home />
  </div>
);
