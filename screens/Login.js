import React from "react";
import {
  View, Text, StatusBar,
  TextInput, StyleSheet
} from "react-native";

import LoginButton from "../components/LoginButton";
import DataManager from "../utils/DataManager";
import { Ionicons } from "@expo/vector-icons";

export default class Login extends React.Component {
  state = {
    email: "corneliu.dcv@gmail.com",
    password: "123456",
  };

  dataManager = DataManager.getInstance();

  componentDidMount = function () {
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
        <StatusBar barStyle='light-content' />
        <View style={styles.loginContainer}>
          <View style={styles.title}>
            <Text>
              Find a Teacher
            </Text>
            <Ionicons name="md-book" color="#000000" size={25} style={{ alignSelf: 'center' }} />
          </View>
          <TextInput
            style={styles.textInput}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            placeholder={"Email"}
            autoComplete='email'
            keyboardType='email-address'
            autoCapitalize='none'
          />
          <TextInput
            style={styles.textInput}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            placeholder={"Password"}
            secureTextEntry={true}
          />
          <View style={{ flexDirection: "row" }}>
            <LoginButton onPress={this.handleLogin} text={"Sign in"} />
            <LoginButton onPress={this.handleRegister} text={"Sign up"} />
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
    alignItems: "center",
    backgroundColor: '#00BFFF'
  },
  loginContainer: {
    borderColor: "#fff",
    borderWidth: 1,
    backgroundColor: '#FFF',
    borderRadius: 3,
    alignItems: "center",
    shadowColor: '#000000',
    elevation: 7,
    shadowRadius: 5,
    shadowOpacity: 1.0,
    padding: 15
  },
  textInput: {
    height: 40,
    width: 200,
    borderColor: "black",
    borderBottomWidth: 1,
    margin: 5,
    paddingLeft: 5
  },
  title: {
    fontSize: 26,
    padding: 10
  }
});
