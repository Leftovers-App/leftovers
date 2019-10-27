import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    PermissionsAndroid
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';



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
                <Button
                    title="Sender"
                    onPress={() => navigate('Sender')}
                />
                <Button
                    title="Receiver"
                    onPress={() => navigate('Receiver')}
                />
                <Button
                    title="Transport"
                    onPress={() => navigate('Transport')}
                />
            </View>
        );
    }
}

export default HomeScreen;