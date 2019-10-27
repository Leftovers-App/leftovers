import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './components/HomeScreen'
import SenderScreen from './components/SenderScreen'
import ReceiverScreen from './components/ReceiverScreen'
import TransportScreen from './components/TransportScreen'
import SenderScreenSecondary from './components/SenderScreenSecondary'
import ReceiverScreenSecondary from './components/ReceiverScreenSecondary'
import TransportScreenSecondary from './components/TransportScreenSecondary'

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Sender: { screen: SenderScreen },
  Transport: { screen: TransportScreen },
  Receiver: { screen: ReceiverScreen },
  Sender2: { screen: SenderScreenSecondary },
  Transport2: { screen: TransportScreenSecondary },
  Receiver2: { screen: ReceiverScreenSecondary }},
  {
    initialRouteName: 'Home',
  }
);

const App = createAppContainer(MainNavigator);


export default App;
