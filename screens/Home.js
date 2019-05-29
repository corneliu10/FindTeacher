import React, { Component } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { MapView, Permissions, Location } from 'expo';

import { SearchButton } from "../components/SearchButton";
import { CurrentLocationButton } from "../components/CurrentLocationButton";
import { MenuButton } from "../components/MenuButton";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: null,
      markers: [
        {
          latitude: 45.65,
          longitude: -78.90,
          title: 'Foo Place',
          subtitle: '1234 Foo Drive'
        }
      ]
    }

    this.setLocationAsync()
  }

  componentDidMount = function () {
    const { navigation } = this.props;
    console.log("home");
  }

  setLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted')
      console.log("Permissions for accessing location not granted!")

    const location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true })
    const region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.045
    }

    console.log(region)
    this.setState({ region })
  }

  centerMap = () => {
    if (this.state.region === null) {
      console.log("Region not loaded yet!");
      return;
    }

    const {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta
    } = this.state.region

    this.map.animateToRegion({
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta
    })
  }

  openMenu = () => {
    const { navigation } = this.props;
    navigation.navigate("Menu");
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <SearchButton />
        <CurrentLocationButton centerMap={this.centerMap} />
        <MenuButton openMenu={this.openMenu} />
        <MapView
          initialRegion={this.state.region}
          showsUserLocation={true}
          showsCompass={true}
          rotateEnabled={true}
          ref={(map) => { this.map = map }}
          style={styles.mapView}
        >

        </MapView>
      </View>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapView: {
    flex: 1
  }
});
