import React, { Component } from "react";
import {
    View, Text, TouchableOpacity, Dimensions,
    StyleSheet, KeyboardAvoidingView, FlatList,
    StatusBar
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

    addInbox = ({ key, name, isTeacher }) => {
        const found = this.state.inbox.find((msg) => {
            if (msg.key == key) {
                return true;
            }
        })

        if (!found) {
            this.setState({
                inbox: [{ key, name, isTeacher }, ...this.state.inbox],
            })
        }
    }

    onPressResult = (item) => {
        const { name, key } = item;
        const { navigation } = this.props;
        navigation.navigate("Chat", {
            otherId: key,
            name: name
        });
    }

    renderItem = ({ item }) => {
        return (
            <View key={item.key} style={styles.listItem}>
                <TouchableOpacity onPress={() => this.onPressResult(item)} style={styles.listItemButton}>
                    <Icon name="md-person" color="#00BFFF" size={30} style={{ marginLeft: 4 }} />
                    <View style={{ marginLeft: 13 }}>
                        <Text style={styles.listItemText}>{item.name}</Text>
                        {item.isTeacher ?
                            <Text style={{ fontSize: 12, color: '#808080' }}>Teacher</Text> : (<View></View>)
                        }
                    </View>
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
                <StatusBar barStyle='light-content' />
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => goBack()}>
                        <Icon name="md-arrow-back" color="#fff" size={25} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>{name}</Text>
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
        backgroundColor: '#E8E8E8'
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
    listItemText: {
        fontSize: 20,
        color: '#00BFFF',
    },
    backButton: {
        position: 'absolute',
        backgroundColor: "#00BFFF",
        color: "white",
        textAlign: "center",
        paddingTop: 20,
        left: 20
    },
    listItem: {
        padding: 4,
        marginTop: 4,
        backgroundColor: 'white',
        borderWidth: 3,
        borderColor: "#fff",
    },
    listItemButton: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})