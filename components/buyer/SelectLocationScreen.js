import React, {Component} from 'react';
const {width, height} = Dimensions.get('window')
import {
  View, StyleSheet, Animated, Platform, UIManager,Alert,TextInput, Dimensions,
  TouchableOpacity, Text, ViewPropTypes,Card,Subtitle,Caption
} from "react-native";
import MapView,{PROVIDER_GOOGLE, Callout} from 'react-native-maps';
import AutoCompleteInput from "./locationview/src/AutoCompleteInput";
import Events from 'react-native-simple-events';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import PropTypes from 'prop-types';
import fetch from 'react-native-cancelable-fetch';
import NetInfo from '@react-native-community/netinfo';
import Snackbar from 'react-native-snackbar';

const PLACE_DETAIL_URL = 'https://maps.googleapis.com/maps/api/place/details/json';
const DEFAULT_DELTA = {latitudeDelta: 0.0922,longitudeDelta: 0.0421,};


export default class SelectLocationScreen extends React.Component {
  static propTypes = {
    markerColor: PropTypes.string,
    actionButtonStyle: ViewPropTypes.style,
    actionTextStyle: Text.propTypes.style,
    actionText: PropTypes.string,
    onLocationSelect: PropTypes.func,
    debounceDuration: PropTypes.number
  };

  static defaultProps = {
    markerColor: 'black',
    onLocationSelect: () => ({}),
    debounceDuration: 300
  };

  constructor(props) {
    super(props);
    this._animateInput = this._animateInput.bind(this);
    this._onTextFocus = this._onTextFocus.bind(this);
    this._onTextBlur = this._onTextBlur.bind(this);
    this._onMapRegionChange = this._onMapRegionChange.bind(this);
    this._onMapRegionChangeComplete = this._onMapRegionChangeComplete.bind(this);
    this._onPlaceSelected = this._onPlaceSelected.bind(this);
    this._setRegion = this._setRegion.bind(this);
    this._getCurrentLocation = this._getCurrentLocation.bind(this);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentDidMount() {
    Events.listen('InputBlur', this.constructor.displayName, this._onTextBlur);
    Events.listen('InputFocus', this.constructor.displayName, this._onTextFocus);
    Events.listen('PlaceSelected', this.constructor.displayName, this._onPlaceSelected);
  }

  componentWillUnmount() {
    Events.rm('InputBlur', this.constructor.displayName);
    Events.rm('InputFocus', this.constructor.displayName);
    Events.rm('PlaceSelected', this.constructor.displayName);
  }

  state = {
    apiKey :"AIzaSyATaE4rWC3YNt0hd0x9TgkOJCN9RfzV6mE",
    inputScale: new Animated.Value(1),
    inFocus: false,
    region: {
      ...DEFAULT_DELTA,
         latitude: 37.78825,
      longitude: -122.4324,
    }, 
    markers:[],
  };

  _animateInput() {
    Animated.timing(
      this.state.inputScale,
      {
        toValue: this.state.inFocus ? 1.2 : 1,
        duration: 300
      }
    ).start();
  }

  _onMapRegionChange(region) {
    this._setRegion(region, false);
    if (this.state.inFocus) {
      this._input.blur();
    }
  }

  _onMapRegionChangeComplete(region) {
    this._input.fetchAddressForLocation(region);
  }

  _onTextFocus() {
    this.state.inFocus = true;
    this._animateInput();
  }

  _onTextBlur() {
    this.state.inFocus = false;
    this._animateInput();
  }

  _setRegion(region, animate = true) {
    this.state.region = {...this.state.region, ...region};
    if (animate)
      this._map.animateToRegion(this.state.region);
  }

  _onPlaceSelected(placeId) {
    this._input.blur();
    fetch(`${PLACE_DETAIL_URL}?key=${this.state.apiKey}&placeid=${placeId}`)
      .then(response => response.json())
      .then(data => {
        let region = (({lat, lng}) => ({latitude: lat, longitude: lng}))(data.result.geometry.location);
        this._setRegion(region);
      })
  }

  _getCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      let location = (({latitude, longitude}) => ({latitude, longitude}))(position.coords);
      this._setRegion(location);
    });
  }

  calcDelta(lat, lon, acc){
    const oneDegOfLongInMeters = 111.32;
    const circumference = (40075/360)
    const latDelta = 0.0922
    const lonDelta = 0.0421

    this.setState({
      region:{
        latitude: lat,
        longitude: lon,
        latitudeDelta: latDelta,
        longitudeDelta: lonDelta
      },
      saddress:'hi',
    })
}

  componentWillMount(){

 
  NetInfo.fetch().then(state => {
                console.log("Connection type", state.type);
                console.log(state);
                console.log("Is connected?", state.isConnected);
            
              // NetInfo.getConnectionInfo().then((connectionInfo) => {
      
            //console.log(connectionInfo);
      
                if (state.type=="none") {
      
                  console.log(state.type);
      
                  Snackbar.show({
                    title: 'No Internet Connection',
                    backgroundColor: 'black',
                    duration: Snackbar.LENGTH_LONG,
                  });
        
                }
else{
//fetch('http://192.168.43.89/same/crjunction1.php',
fetch('http://115.98.3.215:90/jobsearch/buyer/crjunction.php',
{ 
 
  method: 'POST', 
  headers: 
  { 
    'Accept': 'application/json', 
    'Content-Type': 'application/json' 
  }
}
).then((response) => response.json())
.then((responseJson) => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude
      const lon = position.coords.longitude
      const  acc= position.coords.accuracy

      this.calcDelta(lat, lon, acc)

    }
  )

   responseJson.map ((x) => this.state.markers.push(x));
 
 
   this.state.markers.map(marker => (console.log(marker.title)))
   this.state.markers.map(marker => (console.log(marker.coordinates)))
  })
   .catch((error) =>{
     console.log("error");
     console.error(error);
   });
}
});
   }
 
  

   onDetails = () =>{

     // alert(this.state.saddress);
     this.props.navigation.navigate('DetailsScreen')

     //this.props.navigation.navigate('Sign', { phone: phone });

   }
 

  render() {
    let {inputScale} = this.state;
    return (
      <View style={styles.container}>
        <MapView
          ref={(mapView) => this._map = mapView}
          style={styles.mapView}
          region={this.state.region}
          showsMyLocationButton={false}
          showsUserLocation={true}
         zoomEnabled={true}
           
          onPress={({nativeEvent}) => this._setRegion(nativeEvent.coordinate)}
          onRegionChange={this._onMapRegionChange}
         // onRegionChangeComplete={this._onMapRegionChangeComplete}
      // onRegionChange={region => this.onRegionChange(region)}
        > 
        {this.state.markers.map(marker => (console.log(marker.title)))}
        {this.state.markers.map(marker => (console.log(marker.coordinates)))}
     
        {this.state.markers.map(marker => (
              <MapView.Marker
                 key={marker.title} coordinate={marker.coordinates}
                 title={marker.title}
               
                // onMarkerPress={saddress => this.setState({saddress: title})}>
                   >
                   
               
            </MapView.Marker>
                ))}
         </MapView>  

        <View style={styles.fullWidthContainer}>
          <AutoCompleteInput
            ref={input => this._input = input}
            apiKey={this.state.apiKey}
            style={[styles.input, {transform: [{scale: inputScale}]}]}
            debounceDuration={this.props.debounceDuration}
          />
        </View>
 


        <TouchableOpacity style={[styles.currentLocBtn, {backgroundColor: this.props.markerColor}]} onPress={this._getCurrentLocation}>
          <MaterialIcons name={'my-location'} color={'white'} size={25}/>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, this.props.actionButtonStyle]}
          onPress={() => this.props.onLocationSelect({...this.state.region, address: this._input.getAddress()})}
        >
          <View>
            <Text style={[styles.actionText, this.props.actionTextStyle]}>{this.props.actionText}</Text>
          </View>
        </TouchableOpacity>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapView: {
    ...StyleSheet.absoluteFillObject
  },
  fullWidthContainer: {
    position: 'absolute',
    width: '100%',
    top: 80,
    alignItems: 'center',
  },
  input: {
    width: '80%',
    padding: 5
  },
  currentLocBtn: {
    backgroundColor: '#000',
    padding: 5,
    borderRadius: 5,
    position: 'absolute',
    bottom: 70,
    right: 10,
  },
  actionText: {
    color: 'white',
    fontSize: 23,
  },
});
