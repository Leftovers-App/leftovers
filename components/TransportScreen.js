import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';

class TransportScreen extends React.Component {
    static navigationOptions = {
        title: 'Transport',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Text>This is the Transport screen.</Text>
            </View>
        );
    }
}

export default TransportScreen;