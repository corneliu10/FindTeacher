import React from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export const CurrentLocationButton = function (props) {
    const centerMap = props.centerMap ?
        props.centerMap : console.log("Callback function not provided!")
    const bottom = props.bottom ? props.bottom : 65;

    handleOnPress = () => {
        centerMap();
    }

    return (
        <TouchableOpacity
            style={[styles.container, { top: HEIGHT - bottom }]}
            onPress={handleOnPress}
        >
            <MaterialIcons
                name="my-location"
                color="#000000"
                size={25}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        zIndex: 9,
        position: 'absolute',
        width: 45,
        height: 45,
        backgroundColor: '#fff',
        right: WIDTH - 70,
        borderRadius: 50,
        shadowColor: '#000000',
        elevation: 7,
        shadowRadius: 5,
        shadowOpacity: 1.0,
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});