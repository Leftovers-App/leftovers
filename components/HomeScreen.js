import React from 'react';
import {
    Platform,
    StyleSheet,
    View,
    PermissionsAndroid
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
                <Text></Text>
                <Button bordered style={{ alignSelf: 'center' }} onPress={() => navigate('Sender')}>
                    <Text style={{ color: 'blue' }}>Sender</Text>
                </Button>
                <Text></Text>
                <Button bordered style={{ alignSelf: 'center' }} onPress={() => navigate('Receiver')}>
                    <Text style={{ color: 'blue' }}>Receiver</Text>
                </Button>
                <Text></Text>
                <Button bordered style={{ alignSelf: 'center' }} onPress={() => navigate('Transport')}>
                    <Text style={{ color: 'blue' }}>Transport</Text>
                </Button>
            </View>
        );
    }
}

export default HomeScreen;