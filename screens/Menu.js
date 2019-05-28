import React, { Component } from "react";
import { NavigationActions } from "react-navigation";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { StackNavigator } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";

class Menu extends Component {
  render() {
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
            <Text style={styles.sectionHeadingStyle}>Section 1</Text>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle}>Page1</Text>
            </View>
          </View>
          <View>
            <Text style={styles.sectionHeadingStyle}>Section 2</Text>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle}>Page2</Text>
              <Text style={styles.navItemStyle}>Page3</Text>
            </View>
          </View>
          <View>
            <Text style={styles.sectionHeadingStyle}>Section 3</Text>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle}>Page4</Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footerContainer}>
          <Text>This is my fixed footer</Text>
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
    backgroundColor: "lightgrey"
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
