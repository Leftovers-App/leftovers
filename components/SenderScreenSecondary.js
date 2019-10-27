import React from 'react';
import { TextInput } from 'react-native';
import { RNCamera } from 'react-native-camera';

import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';

import { Container, Header, Content, Form, Item, Input,
    Button, DatePicker } from 'native-base';

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignContent: 'center',
        padding:30
    }
});

class SenderScreenSecondary extends React.Component {

    constructor(props) {
        super(props);
        this.state = { chosenDate: new Date() };
        this.setDate = this.setDate.bind(this);
      }
      setDate(newDate) {
        this.setState({ chosenDate: newDate });
      }
    static navigationOptions = {
        title: 'Sender2',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Container>
        
        <Content>
        <DatePicker
            defaultDate={new Date(2018, 4, 4)}
            minimumDate={new Date(2018, 1, 1)}
            maximumDate={new Date(2018, 12, 31)}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Select date of pickup"
            textStyle={{ color: "green" }}
            placeHolderTextStyle={{ color: "grey" }}
            onDateChange={this.setDate}
            disabled={false}
            />
            <Text></Text>
            <Text>
            </Text>
            <Text></Text>
          <Form>
            <Item>
              <Input placeholder="Enter your name" />
            </Item>
            <Item>
              <Input placeholder="Enter your phone number" />
            </Item>
            <Item>
              <Input placeholder="Enter the address of the food" />
            </Item>
            <Item>
              <Input placeholder="Enter time window" />
            </Item>
            <Item>
              <Input placeholder="Enter a description of the food" />
            </Item>
           
          </Form>
          
        </Content>
        
      </Container>
      
           
                <Button rounded light style = {{justifyContent: 'center'}} onPress={() => ImagePicker.openCamera({
                        width: 300,
                        height: 400,
                        cropping: true,
                      }).then(image => {
                        console.log(image);
                      })}>
                    <Text>Please take a picture of the food</Text>
                </Button>
                <Text></Text>
                <Button rounded light style = {{justifyContent: 'center'}} onPress={() => navigate('Sender')}>
                    <Text>Submit</Text>
                </Button>
            </View>
        );
    }
}

export default SenderScreenSecondary;