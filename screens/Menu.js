import React, { Component } from "react";
import DataManager from "../utils/DataManager";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
      navigation.navigate('Home');
    }catch (error) {
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
          <View>
            <View style={styles.navSectionStyle}>
              <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Text style={styles.navItemStyle}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("ProfileView")}>
                <Text style={styles.navItemStyle}>My profile</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.navItemStyle}>Settings</Text>
              </TouchableOpacity>
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
    padding: 10
  },
  navSectionStyle: {
    backgroundColor: "lightgrey"
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
  }
});
