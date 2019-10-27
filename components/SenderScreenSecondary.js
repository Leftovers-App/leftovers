import React from 'react';
import { TextInput } from 'react-native';
import { RNCamera } from 'react-native-camera';

import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';

class SenderScreenSecondary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {text: ''};
      }

    static navigationOptions = {
        title: 'Sender2',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Text>Enter your name:</Text>
                <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => this.setState({text})}
                value={this.state.text} />
                <Text>Enter your phone number:</Text>
                <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => this.setState({text})}
                value={this.state.text} />
                <Text>Enter the address of the food:</Text>
                <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => this.setState({text})}
                value={this.state.text} />
                <Text>Enter how long you will be available for:</Text>
                <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => this.setState({text})}
                value={this.state.text} />
                <Text>Enter a description of the food:</Text>
                <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => this.setState({text})}
                value={this.state.text} />
                <Text>Please take a picture of the food:</Text>
                <Button
                    title="Take picture"
                    onPress={() => ImagePicker.openCamera({
                        width: 300,
                        height: 400,
                        cropping: true,
                      }).then(image => {
                        console.log(image);
                      })}
                />
                <Button
                    title="Submit"
                    onPress={() => navigate('Sender')}
                />
            </View>
        );
    }
}

export default SenderScreenSecondary;