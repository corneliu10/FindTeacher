import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Profile from "../components/Profile"

export default class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.type = props.type;
    this.isMyProfile = props.isMyProfile;
  }
  
  render() {
    const { goBack } = this.props.navigation;
    return (
      <View>
        <View style={styles.toolbar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => goBack()}
          >
            <Icon name="md-arrow-back" color="#fff" size={25} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => this.props.navigation.navigate("EditProfile")}
          >
            <Icon name="md-create" color="#fff" size={25} />
          </TouchableOpacity>
        </View>
        <Profile />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: "#00BFFF",
    position: "absolute",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    zIndex: 10
  },
  backButton: {
    backgroundColor: "#00BFFF",
    color: "white",
    textAlign: "center",
    padding: 15
  },
  editButton: {
    backgroundColor: "#00BFFF",
    alignSelf: "flex-end",
    color: "white",
    textAlign: "center",
    padding: 15
  },
});
