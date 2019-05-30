import React, { Component } from 'react'
import {
    Image,
    View,
    Text
} from 'react-native'
import { MapView } from 'expo';

export default class Driver extends Component {
    constructor(props) {
        super(props);

        const driver = this.props.driver ?
            this.props.driver : {
                uid: 'nrDriversPassed',
                location: { latitude: 0, longitude: 0 }
            }

        latitude = driver.location.latitude;
        longitude = driver.location.longitude;

        this.state = {
            driver: driver,
            latitude,
            longitude
        }
    }

    render() {
        const { latitude, longitude } = this.state;

        return (
            <MapView.Marker
                coordinate={{
                    latitude: latitude,
                    longitude: longitude
                }}
                onPress={() => {
                    console.log(latitude);
                    console.log(longitude)
                }}
            // anchor={{ x: 0.35, y: 0.32 }}
            // ref={marker => { this.marker = marker }}
            >
                <MapView.Callout>
                    <View style={{ backgroundColor: 'red' }}>
                        <Text style={{ fontSize: 24 }}>
                            info:
                        </Text>
                        <Text>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </Text>
                    </View>
                </MapView.Callout>
                {/* <Image
                    source={require('../assets/teacher.png')}
                    style={{
                        width: 32,
                        height: 32
                    }} /> */}
            </MapView.Marker>
        )
    }
}
