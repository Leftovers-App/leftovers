import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
} from 'react-native';

const dummy_data = require('../DummyData/listItem.json');

class ReceiverScreen extends React.Component {
    static navigationOptions = {
        title: 'Receiver',
    };
    constructor() {
      super()
      this.state = {
        jobs: []
      }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
              <View>
                  <Text>Name of Item</Text>
                  <Text>Attribute 1</Text>
                  <Text>Attribute2</Text>
                  <Button
                      title="Receiver Second"
                      onPress={() => navigate('Receiver2')}
                  />
                  <Text> { dummy_data.jobs[0].name } </Text>
              </View>
        );
    }
}


export default ReceiverScreen;