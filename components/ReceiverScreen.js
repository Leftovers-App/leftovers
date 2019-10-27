import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
} from 'react-native';

import {
  // Header,
  // LearnMoreLinks,
  Colors,
  // DebugInstructions,
  // ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

var dummy_data = require('../DummyData/listItem.json');
const jobs = dummy_data.jobs


class HeaderLogo extends React.Component {
    render () {
        return (
            <Text>Reciever2</Text>
        );
    }
}

class ReceiverScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: () => <HeaderLogo />,
            headerRight: () => (
                <Button
                    title="+"
                    onPress={() => navigation.navigate('Receiver2')}
                />
            ),
        };
    };
    constructor() {
        super();

        this.state = {
            jobs: []
        };
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
                <View>
                    <Text>Current</Text>
                    <Button
                        title="Receiver Second"
                        onPress={() => navigate('Receiver2')}
                    />
                </View>
                <View>
                    <Text>All Available</Text>
                    <Button
                        title={jobs[0].name}
                        onPress={() => navigate('Receiver2')}  //send all of jobs through to next page?
                    />
                    <Text> {jobs[0].name} </Text>
                    <Text> {jobs[0].availability} </Text>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
});

export default ReceiverScreen;