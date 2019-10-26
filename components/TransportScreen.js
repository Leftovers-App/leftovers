import React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';
import ActionButton from 'react-native-action-button';

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
                <ActionButton buttonColor="rgba(231,76,60,1)" position="right" onPress={() => navigate('Transport2')}>
                </ActionButton>
            </View>
        );
    }
}

export default TransportScreen;