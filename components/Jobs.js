'use strict';
import Colors from 'leftovers/node_modules/react-native/Libraries/NewAppScreen/components/Colors';
import type {Node} from 'react';
import openURLInBrowser from 'leftovers/node_modules/react-native/Libraries/Core/Devtools/openURLInBrowser';


import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
    TouchableOpacity,
} from 'react-native';


const dummy_data = require('../DummyData/jobs.json');


const JobsList = (): Node => (
  <View style={styles.container}>
    {dummy_data.jobs.map((item, index) => {
      return (
        <React.Fragment key={index}>
          <View style={styles.separator} />
          <TouchableOpacity
            accessibilityRole={'button'}
            onPress={() => navigate('Reciever2')}
            style={styles.linkContainer}>
            <Text style={styles.link}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </TouchableOpacity>
        </React.Fragment>
      );
    })}
  </View>
);




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
});

export default JobsList;
