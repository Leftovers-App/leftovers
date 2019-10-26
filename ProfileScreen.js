import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';

class ProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'Profile',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <Button
                title="Go Home"
                onPress={() => navigate('Home')}
            />
        );
    }
}

export default ProfileScreen;