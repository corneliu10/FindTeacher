import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Button } from 'react-native';
import { CheckBox } from 'react-native-elements'
import DataManager from "../utils/DataManager";
import { ToggleButton } from 'react-native-paper';
import ToggleSwitch from 'toggle-switch-react-native'
import ReactNativeSettingsPage, {
	SectionRow,
	NavigateRow,
	CheckRow,
  SwitchRow,
  SliderRow
} from 'react-native-settings-page';

export default class Settings extends React.Component
{

    state = {
      isTeacher: false
    }


    constructor(props)
    {
        super(props);
        this.state = { isOn1: false };
    }

        dataManager = DataManager.getInstance();

        upgradeAccount = async () => {alert("Button pressed!");};

        onPress1 = () => {this.setState({ isOn: !this.state.isOn });};

        render()
        {
          const { isTeacher } = this.state;

          return (


              <ReactNativeSettingsPage>
                <View style={styles.container}>
                  <SectionRow text='Settings'>
          					<NavigateRow
          						text='Change your displayed name'
                      iconName='your-icon-name'

          						onPressCallback={this._navigateToScreen} />
          					<SwitchRow
          						text='Teacher'
          						iconName='your-icon-name'
          						_value={this.state.switch}
          						_onValueChange={() => { this.setState({ switch: !this.state.switch }) }} />


          				</SectionRow>
                  <View>
                    <Text>Currently you have a student account. Switch the button to upgrade yout account to teacher</Text>
                  </View>

                    <Button
                      //onPress={onPressLearnMore}
                      title="Go back home"
                      color="#00BFFF"
                    />

              </View>
			</ReactNativeSettingsPage>

      );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  settingsContainer: {
    flex: 60,
    backgroundColor: '#00BFFF',
    shadowColor: '#000000',
    marginTop: 0,
    marginBottom: 0,
    alignItems: "center"
  },
  ToggleContainer: {
    flex: 1,
    marginTop: 10,
    marginBottom: 42,
    alignItems: "center"
  },
  showTextcontainer: {
    flex: 1,
    alignItems: "center",
    marginBottom: 20
  },
  showNameContainer: {
    borderColor: "black",
    borderWidth: 0.2,
    alignItems: "center"
  }
});
