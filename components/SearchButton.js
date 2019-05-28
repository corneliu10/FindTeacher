import React from 'react';
import {
    StyleSheet, View, Text, Dimensions, TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const WIDTH = Dimensions.get('window').width;

export const SearchButton = function(props) {
    return (
        <TouchableOpacity onPress={this.handleOnPress} style={styles.container} >
            <View style={styles.leftCol}>
                <Text style={{fontSize: 8}}>{'\u25A0'}</Text>
            </View>
            <View style={styles.centerCol}>
                <Text style={styles.searchText}>Find your teacher</Text>
            </View>
            <View style={styles.rightCol}>
                <Ionicons name="md-book" color="#000000" size={25} style={{ alignSelf: 'center' }} />
            </View>
        </TouchableOpacity>
    );
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
    }
});