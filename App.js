import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './components/HomeScreen'
import SenderScreen from './components/SenderScreen'
import ReceiverScreen from './components/ReceiverScreen'
import TransportScreen from './components/TransportScreen'

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Sender: { screen: SenderScreen },
  Transport: { screen: TransportScreen },
  Receiver: { screen: ReceiverScreen }
},
  {
    initialRouteName: 'Home',
  }
);

const App = createAppContainer(MainNavigator);

export default App;
