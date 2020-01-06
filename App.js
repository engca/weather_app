import React from "react";
import { Alert } from "react-native";
import Loading from "./Loading";
import * as Location from "expo-location";
import axios from "axios";

const API_KEY = "bfbc028248859c963ac4f2f6cff13721";

export default class extends React.Component {
  state = {
    isLoading: true
  };
  getWeather = async (latitude, longitude) => {
    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`
    );
    console.log(data);
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
      this.getWeather(latitude, longitude);
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
