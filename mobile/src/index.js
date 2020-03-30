import 'react-native-gesture-handler';

import React from 'react';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';

import './config/ReactotronConfig';

import { store, persistor } from './store';

import App from './App';

export default function Index() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}
