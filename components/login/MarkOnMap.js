import React from 'react';
import {
  View, StyleSheet, Animated, Platform, UIManager,
  TouchableOpacity, Text, ViewPropTypes,ScrollView,TextInput,Button,Alert,
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import MapView, { Marker, ProviderPropType } from 'react-native-maps';
import AutoCompleteInput from "./forsaleview/src/AutoCompleteInput";
import Events from 'react-native-simple-events';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
 import Entypo from "react-native-vector-icons/Entypo";
import PropTypes from 'prop-types';
import fetch from 'react-native-cancelable-fetch';

const PLACE_DETAIL_URL = 'https://maps.googleapis.com/maps/api/place/details/json';
const DEFAULT_DELTA = {latitudeDelta: 0.0922,longitudeDelta: 0.0421,};
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA;
export default class MarkOnMap extends React.Component {
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
     this._getCurrentLocation();
    this.setState({ 
     address : this.props.navigation.state.params.address,
     username : this.props.navigation.state.params.username,
      })
  }

  componentWillUnmount() {
    Events.rm('InputBlur', this.constructor.displayName);
    Events.rm('InputFocus', this.constructor.displayName);
    Events.rm('PlaceSelected', this.constructor.displayName);
  }

  state = {
    apiKey:'AIzaSyATaE4rWC3YNt0hd0x9TgkOJCN9RfzV6mE',
saddress: '',
   phone:'',
   
    inputScale: new Animated.Value(1),
    inFocus: false,
    region: {
      ...DEFAULT_DELTA,
         latitude: 37.78825,
         longitude: -122.4324,
    },
 
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
 onRegionChange(region) {
    this.setState({ region});
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


  addsellerlandmark = () =>{
    
    fetch('http://115.98.3.215:90/jobsearch/login/sellerlandmark.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      address : this.state.address,
      username : this.state.username,
      longitude:this.state.region.longitude.toPrecision(7),
      latitude:this.state.region.latitude.toPrecision(7),
    })

    }).then((response) => response.json())
        .then((responseJson) => {
          // Showing response message coming from server updating records.
          Alert.alert(responseJson);
      if(responseJson=="Successfully Added"){
            this.props.navigation.navigate('Sign');
        }
      }).catch((error) => {
          console.error(error);
        });


  }


  render() {
    let {inputScale} = this.state;
    return (
 
      <View style={styles.container}>

        <MapView
        provider={this.props.provider}
          ref={(mapView) => this._map = mapView}
          style={styles.mapView}  
          //region={this.state.region}
          showsMyLocationButton={true}
          showsUserLocation={false}
          onPress={({nativeEvent}) => this._setRegion(nativeEvent.coordinate)}
          onRegionChange={region=> this.onRegionChange(region)}
           //onRegionChange={region=> this.onRegionChange(region)}
          onRegionChangeComplete={this._onMapRegionChangeComplete}
        />

<Entypo name={'location-pin'} size={30} color={this.props.markerColor} style={{backgroundColor: 'transparent', }}/>
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



  
        <TouchableOpacity activeOpacity = { .4 } style={[styles.TouchableOpacityStyle, styles.registerButton]} onPress={this.addsellerlandmark.bind(this)} style={styles.button} >
   
   <Text style={styles.TextStyle}> Add </Text>

</TouchableOpacity>




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
 bubble: {
   backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
    position:'relative',
    top:'30%',
   
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
button: {
 
   width: '30%',
   backgroundColor: '#1687B7',
   elevation:20,
   borderRadius: 7,
   position:'relative',
   //marginTop:"48%",
   marginLeft:"10%",
   position:'relative',
    top:'20%',
   
 
  },
 
  TextStyle: {
    color: '#fff',
    textAlign: 'center',
   padding: 10,
   
  }

});
