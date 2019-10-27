import React from 'react';
import {
    Platform,
    StyleSheet,
    View,
    PermissionsAndroid
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';



import { Container, Header, Content, Button, Text } from 'native-base';

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'LEFTOVERS',
    };

    async componentDidMount() {
        try {
            const granted1 = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'LEFTOVERS Location Permission',
                    message:
                        'LEFTOVERS needs access to your location ' +
                        'to connect you to other users..',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            const granted2 = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
                {
                    title: 'LEFTOVERS Location Coarse Permission',
                    message:
                        'LEFTOVERS needs access to your coarse location ' +
                        'to connect you to other users..',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            if ((granted1 === PermissionsAndroid.RESULTS.GRANTED) && (granted2 === PermissionsAndroid.RESULTS.GRANTED)) {
                console.log("permission granted for fine location!");
                // const realLocation = () => {
                Geolocation.getCurrentPosition(position => {
                    let lat = parseFloat(position.coords.latitude)
                    let long = parseFloat(position.coords.longitude)
                    console.log("inside getCurrentPosition");
                    const initialRegion = {
                        latitude: lat,
                        longitude: long,
                        latitudeDelta: 1,
                        longitudeDelta: 1
                    }
                    console.log(initialRegion);
                },
                    (error) => alert(JSON.stringify(error)),
                    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
                // }
                // console.log(realLocation);
            } else {
                console.log('Fine Location permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Text></Text>
                <Button bordered style={{alignSelf:'center'}} onPress={() => navigate('Sender')}>
                    <Text style={{color: 'blue'}}>Sender</Text>
                 </Button>
                 <Text></Text>
                 <Button bordered style={{alignSelf:'center'}} onPress={() => navigate('Receiver')}>
                    <Text style={{color: 'blue'}}>Receiver</Text>
                </Button>
                <Text></Text>
                <Button bordered style={{alignSelf:'center'}} onPress={() => navigate('Transport')}>
                    <Text style={{color: 'blue'}}>Transport</Text>
                </Button>
            </View>
        );
    }
}

export default HomeScreen;