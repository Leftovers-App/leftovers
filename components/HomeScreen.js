import React from 'react';
import {
    Platform,
    StyleSheet,
    View
} from 'react-native';

import { Container, Header, Content, Button, Text } from 'native-base';

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'LEFTOVERS',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Button rounded onPress={() => navigate('Sender')}>
                    <Text>Sender</Text>
                 </Button>
                 <Button rounded onPress={() => navigate('Receiver')}>
                    <Text>Receiver</Text>
                </Button>
                <Button rounded onPress={() => navigate('Transport')}>
                    <Text>Transport</Text>
                </Button>
            </View>
        );
    }
}

export default HomeScreen;