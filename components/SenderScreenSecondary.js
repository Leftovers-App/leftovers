import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';

class SenderScreenSecondary extends React.Component {
    static navigationOptions = {
        title: 'Sender2',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Text>This is the Secondary Sender screen.</Text>
            </View>
        );
    }
}

export default SenderScreenSecondary;