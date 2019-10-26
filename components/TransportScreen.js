import React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

class TransportScreen extends React.Component {
    static navigationOptions = {
        title: 'Transport',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    region={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                >
                </MapView>
            </View>
        );
    }
}

export default TransportScreen;