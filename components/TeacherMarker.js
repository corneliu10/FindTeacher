import React, { Component } from 'react'
import {
    Image, StyleSheet,
    View, TouchableOpacity,
    Text
} from 'react-native'
import { MapView } from 'expo';

export default class TeacherMarker extends Component {
    constructor(props) {
        super(props);
        const { teacherKey, location, name, course, details } = this.props;

        this.state = {
            key: teacherKey,
            name,
            course,
            details,
            latitude: location.latitude,
            longitude: location.longitude
        }
    }

    render() {
        const { onPressMarker } = this.props;
        const { latitude, longitude, name, key, course, details } = this.state;

        return (
            <MapView.Marker
                coordinate={{
                    latitude,
                    longitude
                }}>
                <Image
                    source={require('../assets/teacher.png')}
                    style={{
                        width: 32,
                        height: 32
                    }} />
                <MapView.Callout
                    style={styles.callout}
                    onPress={() => onPressMarker({ key, name })}
                >
                    <View style={styles.container}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 25, color: '#00BFFF', fontWeight: 'bold', textDecorationLine: 'underline' }}>
                                {name}
                            </Text>
                        </View>
                        <Text style={{ fontSize: 20, color: '#00BFFF', marginTop: 4 }}>
                            Course: {course}
                        </Text>
                        {details != '' && details ?
                            (<Text style={{ fontSize: 20, color: '#00BFFF' }}>
                                Details: {details}
                            </Text>
                            ) : <View></View>}
                    </View>
                </MapView.Callout>
            </MapView.Marker>
        )
    }
}

const styles = StyleSheet.create({
    callout: {
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: 'white',
        width: 200,
        padding: 4,
        paddingBottom: 10
    }
})
