import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';

class TransportScreenSecondary extends React.Component {
    static navigationOptions = {
        title: 'Transport2',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Text>This is the Secondary Transport screen.</Text>
            </View>
        );
    }
}

export default TransportScreenSecondary;