import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    Image
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
                <Image 
                    source={require('./hackathon.jpg')}  
                    style={{width: 400, height: 400}} 
                />
                <Text>This is extra food from an amazing Dare Mighty Things hackathon!</Text>
                <Text>Sender Information</Text>
                <Text>Name: </Text>
                <Text>Address: </Text>
                <Button
                    title="Request pickup"
                    onPress={() => navigate('Receiver')}
                />
            </View>
        );
    }
}

export default ReceiverScreenSecondary;