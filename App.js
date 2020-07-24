import React from 'react';
import { Text, Button } from 'react-native';
import { Provider } from "react-redux";
import styled from 'styled-components/native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from "./store";

function HomeScreen({ navigation }) {
  return (
    <Container>
      <Text>Welcome to Leftovers!</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
    </Container>
  );
}

function DetailsScreen({ navigation }) {
  return (
    <Container>
      <Text>Details Screen</Text>
      <Button title="Go Home" onPress={() => navigation.navigate('Home')} />
    </Container>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({ headerShown: false })}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const Container = styled.View`
  flex: 1;
  backgroundColor: #fff;
  alignItems: center;
  justifyContent: space-evenly;
`;
