import React, { Component } from 'react';
import { AppRegistry, View ,Text, TouchableOpacity} from 'react-native';
import NavigationRouter from './components/NavigationRouter';


export default class App extends Component {
  render() {
    return (
      <NavigationRouter/>
    );
  }
}
