import React from 'react';
import {
    Platform,
    StyleSheet,
    View,
    PermissionsAndroid,
    Image
} from 'react-native';

import { Container, Header, Content, Button, Text } from 'native-base';

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FEF6E9'
    }
});

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'LEFTOVERS',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Image 
                    source={require('./Logo.png')}  
                    style={{width: 150, height: 150}} 
                    
                />
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Button transparent style={{ alignSelf: 'center' }} onPress={() => navigate('Sender')}>
                    <Text style={{ color: '#000000', fontWeight: 'bold', fontSize: 40 }}>Sender</Text>
                </Button>
                <Text></Text>
                <Text></Text>
                <Button transparent style={{ alignSelf: 'center' }} onPress={() => navigate('Receiver')}>
                    <Text style={{ color: '#000000', fontWeight: 'bold', fontSize: 40 }}>Receiver</Text>
                </Button>
                <Text></Text>
                <Text></Text>
                <Button transparent style={{ alignSelf: 'center' }} onPress={() => navigate('Transport')}>
                    <Text style={{ color: '#000000', fontWeight: 'bold', fontSize: 40 }}>Transport</Text>
                </Button>
            </View>
        );
    }
}

export default HomeScreen;