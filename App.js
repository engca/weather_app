import React from "react";
import { Alert } from "react-native";
import Loading from "./Loading";
import * as Location from "expo-location";

export default class extends React.Component {
  state = {
    isLoading: true
  };
  getLocation = async () => {
    try {
      // throw Error();
      const response = await Location.requestPermissionsAsync();
      // console.log(response);
      const {
        coords: { latitude, longitude }
      } = await Location.getCurrentPositionAsync();
      // console.log(latitude, longitude);
      this.setState({ isLoading: false });
      // Send to API and get weather
    } catch (error) {
      Alert.alert("Can't find you.", "So sad");
    }
  };

  componentDidMount() {
    this.getLocation();
  }

  render() {
    const { isLoading } = this.state;
    return isLoading ? <Loading /> : null;
  }
}
