import React, { useState } from 'react'
import { StyleSheet, View, PermissionsAndroid , Image ,Text, TouchableOpacity } from 'react-native'
import MapView, { PROVIDER_GOOGLE , Marker } from 'react-native-maps'
import parks from '../res/parks-kml.json';
import gyms from '../res/gyms-sg-kml.json';
import ippt from '../res/HSGB_IPPT.json';



const googleMapStyle = [{
  featureType: "administrative",
  elementType: "geometry",
  stylers: [{
    visibility: "off"
  }]
}]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row'
  },
  map: {
    height: '100%',
    flex:2
  }
})

export default function Location(props) {
  const [mapWidth, setMapWidth] = useState('99%')
  const [parkFilter, setParks] = useState(true)
  const [ipptFilter, setIppt] = useState(true)
  const [gymFilter, setGym] = useState(true)

  const checkedbox = require('../img/checkedbox.png')
  const checkbox = require('../img/checkbox.png')
  // Update map style to force a re-render to make sure the geolocation button appears
  const updateMapStyle = () => {
    setMapWidth('100%')
  }

  // Request geolocation in Android since it's not done automatically
  const requestGeoLocationPermission = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
  }
  return (


    <View style={styles.container} >
    <MapView  provider={PROVIDER_GOOGLE}
        mapType='standard'
        customMapStyle={googleMapStyle}
        style={[styles.map, { width: mapWidth }]}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        kmlSrc = '../res/sportsg-sport-facilities-kml.kml'
        onMapReady={() => {
          requestGeoLocationPermission()
          updateMapStyle()
        }}
        onMarkerPress={(e)=>{console.log(e.nativeEvent)}}
        initialRegion={{
          latitude: 1.3147,
          longitude: 103.8454,
          latitudeDelta: 0.6,
          longitudeDelta: 0.3,
        }} >

{parkFilter && parks.features.map((marker,value) => (
    <Marker
      key={value}
      coordinate={{longitude:marker.geometry.coordinates[0] , latitude:marker.geometry.coordinates[1]}}
      title={marker.properties.Name}
      description={marker.properties.description}
      pinColor='green'
      onPress={()=>{props.navigation.navigate('ParksLocationDetails' , marker)}}
    />
  ))}

{gymFilter && gyms.features.map((marker,value) => (
    <Marker
      key={value}
      coordinate={{longitude:marker.geometry.coordinates[0] , latitude:marker.geometry.coordinates[1]}}
      title={marker.properties.Name}
      description={marker.properties.description}
      pinColor='navy'
      onPress={()=>{props.navigation.navigate('GymLocationDetails' , marker)}}
    />
  ))}
  {ipptFilter && ippt.features.map((marker,value) => (
    <Marker
      key={value}
      coordinate={{longitude:marker.geometry.coordinates[0] , latitude:marker.geometry.coordinates[1]}}
      title={marker.properties.Name}
      description={marker.properties.description}
      pinColor='wheat'
      onPress={()=>{props.navigation.navigate('IPPTLocationDetails' , marker)}}
    />
  ))}
</MapView>
{props.route.params.filter &&(<View style = {{flex:1 , justifyContent: 'flex-start',  height: '100%',flexDirection:'column'}}>
  <View style={{height:40 , alignItems: 'center', flexDirection:'row'}}>
    <TouchableOpacity style={{height:40 , alignItems: 'center', flexDirection:'row'}} onPress={() =>setParks(!parkFilter)}>
              <Image
                style={ {marginLeft :10 ,width: 20, height: 20}}
                source={parkFilter ? checkedbox : checkbox}
              />
              <Text style = {{marginLeft:10, color:'green'}}>Parks</Text>
    </TouchableOpacity>

  </View>
  <View style={{height:40 , alignItems: 'center', flexDirection:'row'}}>
    <TouchableOpacity style={{height:40 , alignItems: 'center', flexDirection:'row'}} onPress={() =>setIppt(!ipptFilter)}>
              <Image
                style={ {marginLeft :10 ,width: 20, height: 20}}
                source={ipptFilter ? checkedbox : checkbox}
              />
              <Text style = {{marginLeft:10 , color:'brown'}}>IPPT</Text>
    </TouchableOpacity>

  </View>
  <View style={{height:40 , alignItems: 'center', flexDirection:'row'}}>
    <TouchableOpacity style={{height:40 , alignItems: 'center', flexDirection:'row'}} onPress={() =>setGym(!gymFilter)}>
              <Image
                style={ {marginLeft :10 ,width: 20, height: 20}}
                source={gymFilter ? checkedbox : checkbox}
              />
              <Text style = {{marginLeft:10 , color:'blue'}}>Gyms</Text>
    </TouchableOpacity>

  </View>
    </View>)}
  </View>


  );
}
