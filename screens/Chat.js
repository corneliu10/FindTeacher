import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions, StatusBar
} from "react-native";

import MessageList from "../components/MessageList";
import ChatToolbar from "../components/ChatToolbar";
import LoginButton from "../components/LoginButton";
import Icon from "react-native-vector-icons/Ionicons";

const WIDTH = Dimensions.get("window").width;

import {
  createImageMessage,
  createLocationMessage,
  createTextMessage
} from "../utils/MessageUtils";
import DataManager from "../utils/DataManager";

export default class Chat extends React.Component {
  state = {
    messages: [
      // createImageMessage('https://unsplash.it/300/300'),
      // createTextMessage('World', true),
    ],
    isInputFocused: false
  };

  dataManager = DataManager.getInstance();

  componentDidMount() {
    const { navigation } = this.props;
    const otherId = navigation.getParam("otherId", "defaultid");
    console.log(otherId);

    this.getMessages(otherId);
    this.dataManager.listenMessagesWith(otherId, this.addMessage);
  }

  componentWillUnmount() {
    const { navigation } = this.props;
    const otherId = navigation.getParam("otherId", "defaultid");

    this.dataManager.removeListenerWith(otherId);
  }

  handlePressToolbarCamera = () => {
    // ...
  };

  handleChangeFocus = isFocused => {
    this.setState({ isInputFocused: isFocused });
  };

  handlePressMessage = () => {};

  handleSubmit = text => {
    const { navigation } = this.props;
    const otherId = navigation.getParam("otherId", "defaultid");

    this.dataManager.sentMessageTo(otherId, text);
  };

  addMessage = ({ text, sent, key }) => {
    const found = this.state.messages.find(msg => {
      if (msg.key == key) {
        return true;
      }
    });

    if (!found) {
      this.setState({
        messages: [createTextMessage(text, sent, key), ...this.state.messages]
      });
    }
  };

  renderToolbar() {
    const { isInputFocused } = this.state;

    return (
      <View style={styles.toolbar}>
        <ChatToolbar
          isFocused={isInputFocused}
          onSubmit={this.handleSubmit}
          onChangeFocus={this.handleChangeFocus}
          onPressCamera={this.handlePressToolbarCamera}
          onPressLocation={this.handlePressToolbarLocation}
        />
      </View>
    );
  }

  getMessages = otherId => {
    this.dataManager.getMessagesWith(otherId, this.addMessage);
  };

  render() {
    const { messages } = this.state;
    const name = this.props.navigation.getParam("name", "John Mayer");
    const { goBack } = this.props.navigation;

    return (
      <View style={styles.content}>
        <StatusBar barStyle='light-content' />
        <View style={styles.header}>
          <Text style={styles.headerText}>{name}</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => goBack()}>
            <Icon name="md-arrow-back" color="#fff" size={25} />
          </TouchableOpacity>
        </View>
        <KeyboardAvoidingView style={styles.content} behavior="padding" enabled>
          <MessageList
            messages={messages}
            onPressMessage={this.handlePressMessage}
          />
          {this.renderToolbar()}
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: "white"
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
  backButton: {
    position: 'absolute',
    backgroundColor: "#00BFFF",
    color: "white",
    textAlign: "center",
    paddingTop: 20,
    left: 20
  },
});
