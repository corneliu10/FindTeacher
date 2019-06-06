import React, { Component } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Dimensions, StatusBar
} from "react-native";
import ToggleSwitch from "toggle-switch-react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Toast from 'react-native-easy-toast';

import LoginButton from '../components/LoginButton';
import DataManager from '../utils/DataManager';

const WIDTH = Dimensions.get("window").width;

export default class Settings extends Component {
  state = {
    name: '',
    email: '',
    course: '',
    details: '',
    location: null,
    isTeacher: false,
    shareLocation: false,
  }

  dataManager = DataManager.getInstance();

  componentDidMount() {
    this.dataManager.getUserDetails(this.dataManager.getUserID(), (item) => {
      const { key, name, email, course, details, isTeacher, shareLocation, location } = item;
      this.setState({
        key, name,
        email, course,
        details, isTeacher,
        shareLocation, location
      });
    });
  }

  saveSettings = () => {
    if (this.state.key && this.state.name != '' && this.state.email != '') {
      this.dataManager.updateUserDetails(this.dataManager.getUserID(), this.state);
      this.refs.toast("Settings saved!");
    }
  }

  render() {
    const { name, email, course, details, isTeacher, shareLocation } = this.state;
    const { goBack } = this.props.navigation;

    return (
        <View style={styles.container}>
        <Toast ref="toast" position='center' />
        <StatusBar barStyle='light-content' />
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => goBack()}>
            <Icon name="md-arrow-back" color="#fff" size={25} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Settings</Text>
        </View>

        {/*
          <View style={styles.teacher}>
            <ToggleSwitch
              isOn={isTeacher}
              onColor="#00BFFF"
              offColor="#ededed"
              size="medium"
              label="Teacher: "
              labelStyle={{ color: "#00BFFF", fontWeight: "bold" }}
              onToggle={isOn => {
                this.setState({ isTeacher: isOn });
              }}
            />
          </View>
        */}
        <View backgroundColor="#D8D8D8">
          <View style={styles.textfieldCard}>
            <Icon name="ios-mail" color="black" size={21} />
            <Text style={styles.label}>Emaill: </Text>
            <TextInput
              editable={false}
              style={styles.textInput}
              onChangeText={email => this.setState({ email })}
              value={email}
              autoCapitalize='none'
            />
          </View>
          <View style={styles.textfieldCard}>
            <Icon name="md-contact" color="black" stylee ={styles.icon} size={21} />
            <Text style={styles.label}>Name: </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={name => this.setState({ name })}
              value={name}
              autoCapitalize='none'
            />
          </View>
          <View style={styles.textfieldCard}>
            <View style={styles.icon}>
              <Icon name="ios-school" color="black" size={21} />
            </View>
            <Text style={styles.label}>Course: </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={course => this.setState({ course })}
              value={course}
              autoCapitalize='none'
            />
          </View>
          <View style={styles.textAreaContainer}>
            <Text style={styles.label}>Details: </Text>
            <TextInput
              style={styles.textArea}
              underlineColorAndroid="transparent"
              placeholder="Add details about you"
              placeholderTextColor="grey"
              multiline={true}
              value={details}
              onChangeText={details => this.setState({ details })}
              returnKeyType='done'
              blurOnSubmit={true}
            />
          </View>
          <View style={styles.toggleButton}>
            <ToggleSwitch
              isOn={isTeacher}
              onColor="#00BFFF"
              offColor="#ededed"
              size="medium"
              label="Teacher: "
              labelStyle={{ color: "#00BFFF", fontWeight: "bold" }}
              onToggle={isOn => {
                this.setState({ isTeacher: isOn });
              }}
            />
          </View>
          <View style={styles.toggleButton}>
            <ToggleSwitch
              isOn={shareLocation}
              onColor="#00BFFF"
              offColor="#ededed"
              size="medium"
              label="Share your location: "
              labelStyle={{ color: "#00BFFF", fontWeight: "bold" }}
              onToggle={isOn => {
                var location = null;
                if (isOn) {
                  location = this.dataManager.getLocation();
                }

                this.setState({ shareLocation: isOn, location });
              }}
            />
          </View>
          <View backgroundColor='white'>
            <LoginButton
              onPress={this.saveSettings}
              text={"Save Settings"}
              buttonStyle={{ width: 140 }} />
          </View>
        </View>
        <View backgroundColor="#D8D8D8">

        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  textfieldCard: {
    backgroundColor: "white",
    borderColor: "#D8D8D8",
    borderBottomWidth: 1,
    margin: 1,
    padding: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'




  },
  textInput: {
    width: 200,
    borderColor: "#D8D8D8",
    borderBottomWidth: 1,
    margin: 1,
    paddingLeft: 5
  },
  label: {
    width: 60
  },
  icon: {
    margin: 0,
    paddingLeft: 0
  },
  textAreaContainer: {
    backgroundColor:"white",
    borderColor: "#D8D8D8",
    borderBottomWidth: 1,
    margin: 1,
    padding: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'

  },
  textArea: {
    flex: 1,
    paddingBottom: 6,
    borderColor: '#D8D8D8',
    borderWidth: 1,
    margin: 1,
    padding: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  toggleButton: {
    margin: 1,
    marginTop: 1,
    paddingTop:5,
    paddingBottom:5,
    backgroundColor:'white'
  },
  backButton: {
    position: 'absolute',
    backgroundColor: "#00BFFF",
    color: "white",
    textAlign: "center",
    paddingTop: 20,
    left: 20
  },
  header: {
    height: 90,
    zIndex: 10,
    flexDirection: "row",
    backgroundColor: "#00BFFF",
    alignItems: "center",
    justifyContent: "center",
    width: WIDTH
  },
  teacher: {
    height: 38,
    zIndex: 10,
    flexDirection: "row",
    backgroundColor: "#D8D8D8",
    alignItems: "center",
    justifyContent: "center",
    width: WIDTH
  },
  headerText: {
    fontSize: 25,
    color: "#fff",
    paddingTop: 18
  },
});
