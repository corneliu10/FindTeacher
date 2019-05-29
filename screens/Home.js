import React, { Component } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { MapView, Permissions, Location } from 'expo';

import SearchButton from "../components/SearchButton";
import { CurrentLocationButton } from "../components/CurrentLocationButton";
import { MenuButton } from "../components/MenuButton";
import SearchResult from "../components/SearchResult";
import Driver from "../components/Driver";
import DataManager from "../utils/DataManager";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: null,
      searchVisible: false,
      results: []
    }

    this.setLocationAsync()
  }

  dataManager = DataManager.getInstance();

  componentDidMount = function () {
    const { navigation } = this.props;
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

    this.setState({ region })
  }

  addResult = ({ key, name }) => {
    this.setState({
      results: [...this.state.results, {key, name}]
    });
  }

  searchUsers = (name) => {
    this.setState({
      results: []
    });

    this.dataManager.searchUsers(name, this.addResult);
  }

  onClickUser = (item) => {
    console.log(item);
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
    
  handleChangeText = (text) => {
    if (text == "") {
      this.setState({ searchVisible: false });
    } else {
      this.setState({ searchVisible: true });
      this.searchUsers(text);
    }
  }

  handleOnPressResult = (item) => {
    if (item.key) {
      console.log(item);
      const { navigation } = this.props;
      navigation.navigate('Chat', {
        otherId: item.key,
      });
    }
  }

  render() {
    const { navigation } = this.props;
    const { searchVisible, results } = this.state;

    return (
      <View style={styles.container}>
        <SearchButton onTextChange={this.handleChangeText} />
        <CurrentLocationButton centerMap={this.centerMap} />
        <MenuButton openMenu={this.openMenu} />
        <SearchResult
          visible={searchVisible}
          results={results}
          onPressResult={this.handleOnPressResult}
        />
        <MapView
          initialRegion={this.state.region}
          showsUserLocation={true}
          showsCompass={true}
          rotateEnabled={true}
          ref={(map) => { this.map = map }}
          style={styles.mapView}
        >
          <Driver driver={{
            uid: 'null', location: {
              latitude: 44.85,
              longitude: 24.8667
            }
          }} />
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
