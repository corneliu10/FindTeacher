import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  FlatList,
  StatusBar
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import DataManager from '../utils/DataManager';

const WIDTH = Dimensions.get("window").width;

export default class Menu extends React.Component {

  dataManager = DataManager.getInstance();

  render() {
    const { goBack } = this.props.navigation;
    const { navigation } = this.props;

    return (
      <View style={styles.content}>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => goBack()}>
            <Ionicons name="md-close" color="#fff" size={25} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Menu</Text>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("Home")}
          >
            <Ionicons
              name="md-home"
              color="#fff"
              size={25}
            />
            <Text style={styles.navItemStyle}>Home</Text>
          </TouchableOpacity>
          <View style={styles.lineSeparator} />
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("ProfileView")}
          >
            <Ionicons
              name="md-person"
              color="#fff"
              size={25}
            />
            <Text style={styles.navItemStyle}>My profile</Text>
          </TouchableOpacity>
          <View style={styles.lineSeparator} />
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("ChatInbox")}
          >
            <Ionicons
              name="md-mail"
              color="#fff"
              size={25}
            />
            <Text style={styles.navItemStyle}>Messages</Text>
          </TouchableOpacity>
          <View style={styles.lineSeparator} />
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("Settings")}
          >
            <Ionicons
              name="md-settings"
              color="#fff"
              size={25}
            />
            <Text style={styles.navItemStyle}>Settings</Text>
          </TouchableOpacity>
          <View style={styles.lineSeparator} />
          <TouchableOpacity
            style={styles.item}
            onPress={async () => {
              try {
                dataManager = DataManager.getInstance();
                const firebase = dataManager.getFirebase();
                await firebase.auth().signOut();
                navigation.navigate("Login");
              } catch (error) {
                console.log(error);
              }
            }}
          >
            <Ionicons
              name="md-log-out"
              color="#fff"
              size={25}
            />
            <Text style={styles.navItemStyle}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: "rgba(54,54,54, 0.7)"
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
  headerText: {
    fontSize: 25,
    color: "#fff",
    paddingTop: 18
  },
  listItemText: {
    fontSize: 20,
    color: "#00BFFF"
  },
  backButton: {
    position: "absolute",
    backgroundColor: "#00BFFF",
    color: "white",
    textAlign: "center",
    paddingTop: 20,
    left: 20
  },
  listItem: {
    padding: 4,
    marginTop: 4,
    backgroundColor: "white",
    borderWidth: 3,
    borderColor: "#fff"
  },
  listItemButton: {
    flexDirection: "row",
    alignItems: "center"
  },
  navItemStyle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 25,
    marginLeft: 10
  },
  item: {
    height: 50,
    flexDirection: "row",
    marginLeft: 15,
    alignItems: 'center'
  },
  lineSeparator: {
    borderBottomColor: 'rgba(255,255,255, 0.4)',
    borderBottomWidth: 1,
    width: WIDTH,
  }
});
