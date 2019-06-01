import React, { Component } from "react";
import { View, StatusBar, Button, StyleSheet } from "react-native";
import { MapView, Permissions, Location } from "expo";

import SearchButton from "../components/SearchButton";
import { CurrentLocationButton } from "../components/CurrentLocationButton";
import { MenuButton } from "../components/MenuButton";
import SearchResult from "../components/SearchResult";
import TeacherMarker from "../components/TeacherMarker";
import DataManager from "../utils/DataManager";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: null,
      searchVisible: false,
      results: [],
      searchTimer: null,
      teachers: []
    };

    this.setLocationAsync();
  }

  dataManager = DataManager.getInstance();

  componentDidMount = function () {
    this.dataManager.getUsersDetails(this.addTeacher);
    this.dataManager.listenUsersChange(this.addTeacher);
  };

  setLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted")
      console.log("Permissions for accessing location not granted!");

    const location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true
    });

    const region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.045
    };

    this.dataManager.setLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    });
    this.setState({ region });
  };

  addTeacher = ({ key, isTeacher, name, course, details, location, shareLocation }) => {
    var teachers = this.dataManager.getData('teachers');
    if (!teachers) {
      teachers = [];
    }

    const foundIndex = teachers.findIndex(t => {
      if (t.key == key) return true;
    });

    if (foundIndex == -1 && shareLocation && isTeacher) {
      this.setState({
        teachers: [...teachers, { key, isTeacher, name, course, details, location, shareLocation }]
      })
      this.dataManager.storeData('teachers', [...teachers, { key, isTeacher, name, course, details, location, shareLocation }]);
    } else if (foundIndex != -1) {
      if (!isTeacher || !shareLocation) {
        teachers.splice(foundIndex, 1);
      } else {
        teachers[foundIndex] = { key, isTeacher, name, course, details, location, shareLocation };
      }

      this.setState({
        teachers: [...teachers]
      });
      this.dataManager.storeData('teachers', [...teachers]);
    }
  }

  addResult = ({ key, name, course }) => {
    const { results } = this.state;
    const found = results.find(r => {
      if (r.key == key) return true;
    });

    if (!found) {
      this.setState({
        results: [...this.state.results, { key, name, course }]
      });
    }
  };

  searchUsers = name => {
    this.setState({
      results: []
    });

    if (this.state.searchTimer) {
      clearTimeout(this.state.searchTimer);
    }

    this.setState({
      searchTimer: setTimeout(() => {
        this.dataManager.searchUsers(name, this.addResult);
      }, 500)
    });
  };

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
    } = this.state.region;

    this.map.animateToRegion({
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta
    });
  };

  openMenu = () => {
    const { navigation } = this.props;
    navigation.navigate("Menu");
  };

  handleChangeText = text => {
    if (text == "") {
      this.setState({ searchVisible: false });
    } else {
      this.setState({ searchVisible: true });
      this.searchUsers(text);
    }
  };

  handleOnPressResult = item => {
    if (item.key) {
      const { navigation } = this.props;
      navigation.navigate("Chat", {
        otherId: item.key,
        name: item.name
      });
    }
  };

  openMenu = () => {
    const { navigation } = this.props;
    navigation.navigate("Menu");
  };

  renderTeacher = () => {
    return this.state.teachers.filter(t => t.location)
      .map(({ key, name, course, details, location }) => (
        <TeacherMarker
          key={key}
          teacherKey={key}
          name={name}
          details={details}
          course={course}
          location={location}
          onPressMarker={this.handleOnPressResult}
        />
      ));
  }

  render() {
    const { navigation } = this.props;
    const { searchVisible, results } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle='dark-content' />
        <SearchButton onTextChange={this.handleChangeText} />
        <CurrentLocationButton centerMap={this.centerMap} />
        <MenuButton openMenu={this.openMenu} />
        <SearchResult
          visible={searchVisible}
          results={results}
          onPressResult={this.handleOnPressResult}
        />
        <MenuButton openMenu={this.openMenu} />
        <MapView
          initialRegion={this.state.region}
          showsUserLocation={true}
          showsCompass={true}
          rotateEnabled={true}
          ref={map => {
            this.map = map;
          }}
          style={styles.mapView}
        >
          {this.renderTeacher()}
        </MapView>
      </View>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mapView: {
    flex: 1
  }
});
