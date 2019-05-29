import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

import LoginButton from "../components/LoginButton";
import DataManager from "../utils/DataManager";

class Login extends React.Component {
  state = {
    email: "a@a.com",
    password: "123456",
  };

  dataManager = DataManager.getInstance();

  componentDidMount = function() {
  };

  handleLogin = async () => {
    const { email, password } = this.state;
    const firebase = this.dataManager.getFirebase();

    try {
      var authJson = await firebase.auth().signInWithEmailAndPassword(email, password);
      var uid = authJson["user"]["uid"];
      this.dataManager.setUserID(uid);

      const { navigation } = this.props;
      navigation.navigate('Home');
    } catch (error) {
      console.log(error.toString());
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

  render() {
    const { navigation } = this.props;
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

export default Login;

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
