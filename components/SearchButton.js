import React from 'react';
import {
    StyleSheet, View, Text,
    Dimensions, TouchableOpacity,
    TextInput
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const WIDTH = Dimensions.get('window').width;

export default class SearchButton extends React.Component {
    render() {
        const { onTextChange } = this.props;

        return (
            <View style={styles.container} >
                <View style={styles.leftCol}>
                    <Text style={{ fontSize: 8 }}>{'\u25A0'}</Text>
                </View>
                <View style={styles.centerCol}>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid={'transparent'}
                        placeholder={'Find your teacher'}
                        onChangeText={onTextChange}
                        onSubmitEditing={this.handleSubmitText}
                    />
                </View>
                <View style={styles.rightCol}>
                    <Ionicons name="md-book" color="#000000" size={25} style={{ alignSelf: 'center' }} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        zIndex: 9,
        position: 'absolute',
        width: (WIDTH - 40),
        flexDirection: 'row',
        height: 60,
        top: 80,
        left: 20,
        borderRadius: 5,
        backgroundColor: 'white',
        alignItems: 'center',
        shadowColor: '#000000',
        elevation: 7,
        shadowRadius: 5,
        shadowOpacity: 1.0
    },
    leftCol: {
        flex: 1,
        alignItems: 'center'
    },
    centerCol: {
        flex: 4,
    },
    rightCol: {
        flex: 1,
        borderLeftWidth: 1,
        borderColor: '#ededed'
    },
    searchText: {
        fontSize: 21,
        color: '#545454'
    },
    input: {
        flex: 1,
        fontSize: 21,
        color: '#545454'
    }
});