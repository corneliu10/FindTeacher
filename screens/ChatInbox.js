import React, { Component } from "react";
import {
    View, Text, TouchableOpacity, Dimensions,
    StyleSheet, KeyboardAvoidingView, FlatList
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

const WIDTH = Dimensions.get("window").width;

import DataManager from "../utils/DataManager";

const keyExtractor = item => item.key;

export default class ChatInbox extends React.Component {
    state = {
        inbox: [],
    };

    dataManager = DataManager.getInstance();

    componentDidMount() {
        const { navigation } = this.props;

        this.dataManager.getInbox(this.addInbox);
    }

    addInbox = ({ key, name }) => {
        const found = this.state.inbox.find((msg) => {
            if (msg.key == key) {
                return true;
            }
        })

        if (!found) {
            this.setState({
                inbox: [{ key, name }, ...this.state.inbox],
            })
        }
    }

    onPressResult = (item) => {
        console.log(item);
        const { name, key } = item;
        console.log({ name, key });
        const { navigation } = this.props;
        navigation.navigate("Chat", {
            otherId: key,
            name: name
        });
    }

    renderItem = ({ item }) => {
        console.log("render: " + item);
        return (
            <View key={item.key} style={{
            }}>
                <TouchableOpacity onPress={() => this.onPressResult(item)} style={styles.button}>
                    <Text style={styles.text}>{item.name}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        const { inbox } = this.state;
        const name = "Chat Inbox";
        const { goBack } = this.props.navigation;

        return (
            <View style={styles.content}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => goBack()}>
                        <Icon name="md-arrow-back" color="#fff" size={25} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>{name}</Text>
                    <View></View>
                </View>
                <FlatList
                    data={inbox}
                    renderItem={this.renderItem}
                    keyExtractor={keyExtractor}
                    keyboardShouldPersistTaps={'handled'}
                />
            </View>
        );
    };
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        height: 90,
        zIndex: 10,
        flexDirection: "row",
        backgroundColor: "#00BFFF",
        alignItems: "center",
        justifyContent: "space-between",
        width: WIDTH
    },
    headerText: {
        fontSize: 24,
        color: "#fff",
        paddingTop: 20
    },
    text: {
        fontSize: 26,
    },
    button: {
        marginLeft: 6,
        marginRight: 6,
        marginTop: 2,
        borderBottomWidth: 1,
        borderBottomColor: '#545454'
    },
    backButton: {
        backgroundColor: "#00BFFF",
        color: "white",
        textAlign: "center",
        paddingTop: 20,
        paddingLeft: 20
    },
})