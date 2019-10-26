import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';

class ReceiverScreen extends React.Component {
    static navigationOptions = {
        title: 'Receiver',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Text>This is the Receiver screen.</Text>
            </View>
        );
    }
}

export default ReceiverScreen;