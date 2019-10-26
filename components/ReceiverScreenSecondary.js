import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';

class ReceiverScreenSecondary extends React.Component {
    static navigationOptions = {
        title: 'Receiver2',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Text>This is the Secondary Receiver screen.</Text>
            </View>
        );
    }
}

export default ReceiverScreenSecondary;