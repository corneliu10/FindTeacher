import React, { Component } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import Toast from 'react-native-easy-toast';

import LoginButton from "../components/LoginButton";
import DataManager from "../utils/DataManager";
import { Ionicons } from "@expo/vector-icons";
import ToggleSwitch from "toggle-switch-react-native";

export default class Register extends React.Component {
  state = {
    name: "aba",
    email: "b@c.com",
    password: "123456",
    isTeacher: false,
    course: null
  };

  dataManager = DataManager.getInstance();

  handleRegister = async () => {
    const { navigation } = this.props;
    const { name, email, password, isTeacher, course } = this.state;
    const firebase = this.dataManager.getFirebase();

    if (name != "" && email != "" && password != "" && course != "") {
      try {
        var authJson = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        const uid = authJson["user"]["uid"];
        this.dataManager.setUserDetails(uid, email, name, isTeacher, course);

        this.refs.toast.show("Account created");
        navigation.goBack();
        // navigation.state.params.onGoBack({ name, email, password });
      } catch (error) {
        this.refs.toast.show(error.toString());
      }
    }
  };

  render() {
    const { isTeacher } = this.state;

    return (
      <View style={styles.container}>
        <Toast ref="toast" position='center' />
        <View style={styles.loginContainer}>
          <View style={styles.title}>
            <Text>Find a Teacher</Text>
            <Ionicons
              name="md-book"
              color="#000000"
              size={25}
              style={{ alignSelf: "center" }}
            />
          </View>
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
            keyboardType='email-address'
            autoCapitalize='none'
            placeholder={"Email"}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            placeholder={"Password"}
            secureTextEntry={true}
          />
          {isTeacher ? (
            <TextInput
              style={styles.textInput}
              onChangeText={course => this.setState({ course })}
              value={this.state.course}
              placeholder={"Course"}
            />
          ) : (<View></View>)}
          <View style={styles.toggleButton}>
            <ToggleSwitch
              isOn={isTeacher}
              onColor="#00BFFF"
              offColor="#ededed"
              size="medium"
              label="Teacher"
              labelStyle={{ color: "#00BFFF", fontWeight: "bold" }}
              onToggle={isOn => {
                this.setState({ isTeacher: isOn });
              }}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
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
    backgroundColor: "#00BFFF"
  },
  loginContainer: {
    borderColor: "#fff",
    borderWidth: 1,
    backgroundColor: "#FFF",
    borderRadius: 3,
    alignItems: "center",
    shadowColor: "#000000",
    elevation: 7,
    shadowRadius: 5,
    shadowOpacity: 1.0,
    padding: 15,
    justifyContent: 'flex-start'
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
  },
  toggleButton: {
    marginTop: 10,
  }
});
