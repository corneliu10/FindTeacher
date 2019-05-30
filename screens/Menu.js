import React, { Component } from "react";
import DataManager from "../utils/DataManager";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const WIDTH = Dimensions.get("window").width;

class Menu extends Component {
  constructor(props) {
    super(props);
  }

  async logout() {
    try {
      dataManager = DataManager.getInstance();
      const firebase = dataManager.getFirebase();
      await firebase.auth().signOut();

      const { navigation } = this.props;
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
    }
  }

  openProfile() {
    try {
      const { navigation } = this.props;
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { navigation } = this.props;
    const { goBack } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View>
          <TouchableOpacity style={styles.backButton} onPress={() => goBack()}>
            <Ionicons
              name="md-close"
              color="#000000"
              size={25}
              style={{ alignSelf: "center" }}
            />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.scroll}>
            <TouchableOpacity
              style={styles.items}
              onPress={() => navigation.navigate("Home")}
            >
              <Ionicons
                name="md-home"
                color="#fff"
                size={25}
                style={{ alignSelf: "center" }}
              />
              <Text style={styles.navItemStyle}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.items}
              onPress={() => navigation.navigate("ProfileView")}
            >
              <Ionicons
                name="md-person"
                color="#fff"
                size={25}
                style={{ alignSelf: "center" }}
              />
              <Text style={styles.navItemStyle}>My profile</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.scroll}>
            <TouchableOpacity style={styles.items}>
              <Ionicons
                name="md-settings"
                color="#fff"
                size={25}
                style={{ alignSelf: "center" }}
              />
              <Text style={styles.navItemStyle}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.items}
              onPress={() => navigation.navigate("ChatInbox")}
            >
              <Ionicons
                name="md-mail"
                color="#fff"
                size={25}
                style={{ alignSelf: "center" }}
              />
              <Text style={styles.navItemStyle}>Messages</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.scroll}>
            <View style={styles.items}>
            </View>
            <View style={styles.items}>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footerContainer}>
          <TouchableOpacity
            style={{ textAlign: "center" }}
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
            <Text style={styles.footerText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default Menu;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1
  },
  navItemStyle: {
    padding: 10,
    color: "#fff"
  },
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  footerContainer: {
    padding: 20,
    backgroundColor: "red",
    color: "#fff",
    textAlign: "center"
  },
  footerText: {
    color: "#fff",
    padding: 10,
    textAlign: "center"
  },
  toolbar: {
    backgroundColor: "#fff",
    position: "absolute",
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignSelf: "flex-end"
  },
  backButton: {
    backgroundColor: "#fff",
    color: "#000",
    textAlign: "center",
    padding: 15
  },
  scroll: {
    flexDirection: "row",
    width: WIDTH
  },
  items: {
    width: WIDTH / 2,
    height: WIDTH / 2,
    backgroundColor: "#00bfff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e5e5e5"
  }
});
