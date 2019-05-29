import React from 'react';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Remote debugger']);

import AppContainer from './routes'; 

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}