import React, { Component } from "react";
import { View, TextInput, StyleSheet } from "react-native";

import LoginButton from "../components/LoginButton";

export default class Register extends React.Component {
  state = {
    name: "",
    email: "",
    password: ""
  };

  handleRegister = () => {
    const { navigation } = this.props;
    const { name, email, password } = this.state;

    if (name != "" && email != "" && password != "") {
      navigation.goBack();
      navigation.state.params.onGoBack({ name, email, password });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={name => this.setState({ name })}
            value={this.state.name}
            placeholder={"Name"}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            autoComplete="email"
            placeholder={"Email"}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            placeholder={"Password"}
            secureTextEntry={true}
          />
          <View style={{ flexDirection: "row" }}>
            <LoginButton onPress={this.handleRegister} text={"Register"} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  loginContainer: {
    borderColor: "red",
    borderWidth: 2,
    alignItems: "center"
  },
  textInput: {
    height: 40,
    width: 200,
    borderColor: "red",
    borderWidth: 1,
    margin: 5,
    paddingLeft: 5
  }
});
