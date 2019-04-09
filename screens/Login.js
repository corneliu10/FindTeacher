import React from "react";
import { View, Text, Button } from "react-native";

export default class Login extends React.Component {
  render() {
    const { navigation } = this.props;
    const nr = navigation.getParam("id", 0);
    return (
      <View>
        <Text> View 1 </Text>
        <Text> {nr} </Text>
        <Button
          title="Button"
          onPress={() =>
            this.props.navigation.navigate("Register", { id: nr + 1 })
          }
        />
      </View>
    );
  }
}
