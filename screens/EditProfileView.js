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
import EditProfileForm  from "../components/EditProfileForm";

export default class EditProfile extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const { goBack } = this.props.navigation;
      this.user = {
          firstName: "John",
          lastName: "Doe",
          telephone: "1234567890",
          email: "abc@gmail.com"
      }
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
                onPress={() => this.props.navigation.navigate("ProfileView")}
                >
                    <Icon name="md-save" color="#fff" size={25} />
                </TouchableOpacity>
            </View>
            <EditProfileForm data={this.user} />
        </View>
      );
    }
  }
  const styles = StyleSheet.create({
    toolbar: {
      backgroundColor: "#00BFFF",
      position: "absolute",
      paddingTop: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      zIndex: 10,
      alignSelf: "flex-end"
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
    header: {
        backgroundColor: "#00BFFF",
        zIndex: 9
    }
  }); 