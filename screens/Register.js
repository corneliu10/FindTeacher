import React, { Component } from "react";
import { View, Text, Button } from "react-native";

export default class Register extends React.Component {
  render() {
    const { navigation } = this.props;
    const nr = navigation.getParam("id", 0);
    return (
      <View>
        <Text> Register </Text>
        <Button
          title="Button"
          onPress={() =>
            this.props.navigation.navigate("Login", { id: nr + 1 })
          }
        />
        <Text> { nr } </Text>
      </View>
    );
  }
}
