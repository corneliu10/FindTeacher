import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default class LoginButton extends React.Component {
  render() {
    const { onPress, text, buttonStyle, textStyle } = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.defaultButton, buttonStyle ? buttonStyle : null]}
      >
        <Text style={[styles.defaultText, textStyle ? textStyle : null]}> {text} </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  defaultButton: {
    backgroundColor: "#00BFFF",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: 90,
    margin: 10,
    marginTop: 20
  },
  defaultText: {
    color: "white",
    textAlign: 'center'
  }
});
