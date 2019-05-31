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
        const { teacherKey, location, name, course } = this.props;

        this.state = {
            key: teacherKey,
            name: name,
            course: course,
            latitude: location.latitude,
            longitude: location.longitude
        }
    }

    render() {
        const { onPressMarker } = this.props;
        const { latitude, longitude, name, key, course } = this.state;

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
                            <Text style={{ fontSize: 30, color: 'green' }}>
                                {name}
                            </Text>
                        </View>
                        <Text style={{ fontSize: 20, color: 'green', marginTop: 4 }}>
                            Course: {course}
                        </Text>
                        <Text style={{ fontSize: 20, color: 'green' }}>
                            Details:
                        </Text>
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
        backgroundColor: 'red',
        width: 200,
        padding: 4,
        paddingBottom: 10
    }
})
