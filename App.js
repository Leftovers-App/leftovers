import React from 'react';
import { Text } from 'react-native';
import { Provider } from "react-redux";
import styled from 'styled-components/native'
import store from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <Container>
        <Text>Welcome to Leftovers!</Text>
      </Container>
    </Provider>
  );
}

const Container = styled.View`
  flex: 1;
  backgroundColor: #fff;
  alignItems: center;
  justifyContent: center;
`;
