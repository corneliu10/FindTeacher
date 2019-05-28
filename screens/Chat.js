import React, { Component } from "react";
import {
    View, Text, Button,
    StyleSheet, KeyboardAvoidingView
} from "react-native";

import MessageList from '../components/MessageList';
import ChatToolbar from '../components/ChatToolbar';
import {
    createImageMessage,
    createLocationMessage,
    createTextMessage
} from '../utils/MessageUtils';
import DataManager from "../utils/DataManager";

export default class Chat extends React.Component {
    state = {
        messages: [
            // createImageMessage('https://unsplash.it/300/300'),
            createTextMessage('World', true),
            createTextMessage('You', false),
            createTextMessage('Hello', true),
        ],
        isInputFocused: false,
    };

    dataManager = DataManager.getInstance();

    componentDidMount() {
        this.dataManager.getMessagesWith("6D5TDGIIhFQOax8zVRnAxGrqhOP2"); 
    }

    handlePressToolbarCamera = () => {
        // ...
    }

    handleChangeFocus = (isFocused) => {
        this.setState({ isInputFocused: isFocused });
    };

    handlePressMessage = () => { }

    handleSubmit = (text) => {
        const { messages } = this.state;
        this.dataManager.sentMessageTo("6D5TDGIIhFQOax8zVRnAxGrqhOP2", text);

        this.setState({
            messages: [createTextMessage(text, true), ...messages],
        })
    }

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

    render() {
        const { messages } = this.state;

        return (
            <KeyboardAvoidingView style={styles.content} behavior="padding" enabled>
                <MessageList messages={messages} onPressMessage={this.handlePressMessage} />
                {this.renderToolbar()}
            </KeyboardAvoidingView>
        );
    };
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: 'white'
    }
})