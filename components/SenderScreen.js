import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Fab } from 'native-base';
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

class SenderScreen extends React.Component {
    static navigationOptions = {
        title: 'Sender',
    };
    constructor() {
        super()
        this.state = {
            initialPosition: {
                latitude: 41.883885,
                longitude: -87.653632,
                latitudeDelta: .02,
                longitudeDelta: .02
            }
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>This is the sender screen.</Text>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    region={this.state.initialPosition}
                >
                    <Marker coordinate={{ latitude: 41.883885, longitude: -87.653632 }} />
                </MapView>
                <ActionButton
                    buttonColor="rgba(231,76,60,1)"
                    position="right"
                    onPress={() => navigate('Sender2')}></ActionButton>
            </View>
        );
    }
}

export default SenderScreen;