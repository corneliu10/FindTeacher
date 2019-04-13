import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

import LoginButton from "../components/LoginButton";

export default class Login extends React.Component {
  state = {
    email: null,
    password: null
  };

  handleLogin = () => {
    alert("Login");
  };

  handleRegister = () => {
    alert("Register");
  };

  render() {
    const { navigation } = this.props;
    const nr = navigation.getParam("id", 0);
    return (
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
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
            <LoginButton onPress={this.handleLogin} text={"Login"} />
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
