import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { MapView, Callout } from 'expo';



// add TextInput

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Our Placeholder' };
  }
  render() {
    return (
      // <View>
        // <TextInput 
        //   editable = {true}
        //   maxLength = {40}
        //   style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        //   onChangeText={(text) => this.setState({text})}
        //   value={this.state.text}
        // >
        //   inputText
        // </TextInput>
      <View style={{padding: 10}}>
        <TextInput
          style={{height: 40}}
          placeholder="Type here to translate!"
          onChangeText={(text) => this.setState({text})}
        />
        {/* <Text style={{padding: 10, fontSize: 42}}>
          {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
        </Text> */}
      </View>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calloutView: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    width: "40%",
    marginLeft: "30%",
    marginRight: "30%",
    marginTop: 20
  },
  calloutSearch: {
    borderColor: "transparent",
    marginLeft: 10,
    width: "90%",
    marginRight: 10,
    height: 40,
    borderWidth: 0.0  
  }
});
