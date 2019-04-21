import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

import LoginButton from "../components/LoginButton";

export default class Login extends React.Component {
  state = {
    email: "A",
    password: "a",
    users: []
  };

  componentDidMount = function() {
    this.setState({
      users: [
        ...this.state.users,
        {
          email: "A",
          password: "a"
        }
      ]
    });
  };

  handleLogin = () => {
    const { email, password } = this.state;
    const loginUser = this.state.users.find(user => {
      if (user.email == email && user.password == password) return true;
    });

    if (loginUser) {
      const { navigation } = this.props;
      navigation.navigate('Home');
    } else {
      alert("User not found.. Try again!");
    }
  };

  handleRegister = () => {
    const { navigation } = this.props;
    navigation.navigate("Register", { onGoBack: this.addUser });
    this.setState({
      email: "",
      password: ""
    });
  };

  addUser = user => {
    this.state.users.push(user);
    console.log("Name: " + user.name);
    console.log("Email: " + user.email);
    console.log("Password: " + user.password);
  };

  render() {
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
