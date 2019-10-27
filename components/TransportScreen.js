import React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    Dimensions,
    PermissionsAndroid
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Geolocation from '@react-native-community/geolocation';

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    }
});

class TransportScreen extends React.Component {
    static navigationOptions = {
        title: 'Transport',
    };

    constructor() {
        super()
        this.state = {
            initialPosition: {
                latitude: .65,
                longitude: .65,
                latitudeDelta: 1,
                longitudeDelta: 1
            }
        }
    }

    async componentDidMount() {
        const { navigate } = this.props.navigation;
        // const realLocation = () => {
        //     Geolocation.getCurrentPosition(position => {
        //         let lat = parseFloat(position.coords.latitude)
        //         let long = parseFloat(position.coords.longitude)

        //         const initialRegion = {
        //             latitude: lat,
        //             longitude: long,
        //             latitudeDelta: 1,
        //             longitudeDelta: 1
        //         }
        //         console.log(initialRegion);
        //         return initialRegion;
        //     },
        //         (error) => alert(JSON.stringify(error)),
        //         { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
        // }
        // console.log(realLocation);
        // this.setState({ initialPosition: realLocation });
    }


    render() {

        return (
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    region={this.state.initialPosition}
                >
                </MapView>
                <ActionButton buttonColor="rgba(231,76,60,1)" position="right" onPress={() => navigate('Transport2')}>
                </ActionButton>
            </View>
        );
    }
}

export default TransportScreen;