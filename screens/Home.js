import React, { Component } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

handleCalendar = () => {
    const { navigation } = this.props;
    navigation.navigate('Home');
};


export default class Register extends React.Component {
  state = {};

  componentDidMount = function() {
    const { navigation } = this.props;

    console.log("home");
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text>Home</Text>
        <Button onPress={() => navigation.replace("Calendar")} title="Calendar" />
        <Button onPress={() => navigation.replace("Login")} title="Log out" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
