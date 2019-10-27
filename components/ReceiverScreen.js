import React from 'react';

import {
    AppRegistry,
    WebView,
    Dimensions,
    Modal,
    TouchableHighlight,
    Image,
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

import {
  // Header,
  // LearnMoreLinks,
  Colors,
  // DebugInstructions,
  // ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


var dummy_data = require('../DummyData/jobs.json');
const jobs = dummy_data.jobs


class HeaderLogo extends React.Component {   //TODO
    render () {
        return (
            <Text>Reciever2</Text>
        );
    }
}

class ReceiverScreen extends React.Component {

    static navigationOptions = {
        title: 'Receiver',
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
                <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize:30, paddingTop: 10}}>All Available</Text>
                  <TouchableOpacity
                    accessibilityRole={'button'}
                    onPress={() => navigate('Reciever2', jobs[0])}
                    style={styles.linkContainer}>
                    <Text style={styles.link}>Pizza!</Text>
                    <Text style={styles.description}>Four extra large cheese pizzas.</Text>
                  </TouchableOpacity>
                  <View style={styles.separator} />
                <TouchableOpacity
                    accessibilityRole={'button'}
                    onPress={() => navigate('Reciever2', jobs[1])}
                    style={styles.linkContainer}>
                    <Text style={styles.link}>Wraps!</Text>
                    <Text style={styles.description}>Three hundred wraps of variety: Turkey Club, large cheese pizzas.</Text>
                  </TouchableOpacity>
                  <View style={styles.separator} />
                  <TouchableOpacity
                    accessibilityRole={'button'}
                    onPress={() => navigate('Reciever2', jobs[2])}
                    style={styles.linkContainer}>
                    <Text style={styles.link}>McDonalds!</Text>
                    <Text style={styles.description}>ALL YOU CAN EAT MCDONALDS.</Text>
                  </TouchableOpacity>
            </ScrollView>
        );
    }
}




const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  linkContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  link: {
    paddingLeft: 10,
    flex: 2,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.primary,
  },
  description: {
    flex: 3,
    paddingVertical: 16,
    fontWeight: '400',
    fontSize: 18,
    color: Colors.dark,
  },
  separator: {
    backgroundColor: Colors.light,
    height: 1,
  },
  container: {
    flex: 1,
  },
  button: {
    flexDirection: 'row',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ededed'
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
});

AppRegistry.registerComponent('test', () => test);

export default ReceiverScreen;