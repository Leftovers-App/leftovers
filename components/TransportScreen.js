import React from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {
    Platform,
    StyleSheet,
    View,
    Dimensions,
    PermissionsAndroid,
    Image
} from 'react-native';
import ActionButton from 'react-native-action-button';
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

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
                <Card style={{ width: 350, height: 220 }}>
                    <CardItem>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'blue' }}>CURRENT JOB</Text>
                    </CardItem>
                    <CardItem cardBody style={{ display: 'flex', justifyContent: 'center' }}>
                        <Image
                            source={require('./hackathon.jpg')}
                            style={{ width: 300, height: 100 }}
                        />
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Text><Text style={{ fontWeight: 'bold' }}>FOR:</Text> Greater Chicago Food Depository</Text>
                        </Left>
                        <Right>
                            <Text><Text style={{ fontWeight: 'bold' }}>DUE:</Text> in 28 minutes</Text>
                        </Right>
                    </CardItem>
                </Card>

                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    region={this.state.initialPosition}
                >
                    <Marker coordinate={{ latitude: 41.883885, longitude: -87.653632 }} />
                </MapView>

                <ActionButton buttonColor="rgba(231,76,60,1)" position="right" onPress={() => navigate('Transport2')}>
                </ActionButton>
            </View>
        );
    }
}

export default TransportScreen;