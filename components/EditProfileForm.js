import React from "react";
import {
  StyleSheet,
  View
} from "react-native";

import t from "tcomb-form-native"; // 0.6.9

// const Form = t.form.Form;

// const User = t.struct({
//   email: t.String,
//   firstName: t.String,
//   lastName: t.String,
//   telephone: t.Number
// });

export default class EditProfileForm extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <Form type={User} /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      marginTop: 50,
      padding: 20,
      backgroundColor: '#ffffff',
    },
  });
