import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'LEFTOVERS',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Button
                    title="Sender"
                    onPress={() => navigate('Sender')}
                />
                <Button
                    title="Receiver"
                    onPress={() => navigate('Receiver')}
                />
                <Button
                    title="Transport"
                    onPress={() => navigate('Transport')}
                />
            </View>
        );
    }
}

export default HomeScreen;