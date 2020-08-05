import React, { Component } from 'react';
import {  StyleSheet, Text, View, ScrollView } from 'react-native';
import MapView, { PROVIDER_GOOGLE , Marker } from 'react-native-maps'
import FavoriteStar from './FavoriteStar';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
    },
    map: {
      flex: 1,
      height: '50%',
  },
  textContainer:{
    flex:1,
  },
  horizontalLine:{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingTop:10,
  },
  textHeader: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 20,
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 15,
    alignItems: 'center',
    paddingBottom: 20,
    lineHeight:21
  },
  button: {
    width:'50%',
    height: '50%',
  },
})





export default class ParksLocationDetails extends Component{
  constructor(props) {
    super(props);
    this.state = {MarkerInfo:props.route.params
                };
  }

  render(){
  return (<View style={{flex:1, padding: 20}}>
    <MapView
     provider={PROVIDER_GOOGLE} // remove if not using Google Maps
     style={[styles.map]}
     showsUserLocation={true}
     showsMyLocationButton={true}
     showsCompass={true}
     region={{
       latitude: 1.3147,
       longitude: 103.8454,
       latitudeDelta: 0.6,
       longitudeDelta: 0.3,
     }}
   >
    <Marker
    coordinate={{longitude:this.state.MarkerInfo.geometry.coordinates[0],latitude:this.state.MarkerInfo.geometry.coordinates[1]}}
    title={this.state.MarkerInfo.properties.Name}
    description={this.state.MarkerInfo.properties.description}
    >
    </Marker>
   </MapView>


   <View style={{flex: 1,}}>

      <View>
        <View style={{flexDirection:'row',
        justifyContent: 'space-between',
        alignItem: 'flex-end',
    padding: 10}}>

        <Text style={{fontSize:20,fontWeight: 'bold',}}>{this.state.MarkerInfo.properties.Name}</Text>
           <FavoriteStar colId='ParkLocations' MarkerInfo={this.state.MarkerInfo}/>
        </View>
      </View>

      <View style={{backgroundColor: 'white', borderRadius: 10, padding:20}}>
      <ScrollView>
      <Text style={[styles.textStyle],{paddingBottom:5, fontSize:15}}>Address:</Text>
        <Text style={styles.textStyle}>{((this.state.MarkerInfo.properties.description == null)?"operating hours not known" :this.state.MarkerInfo.properties.description)}</Text>
        </ScrollView>
        </View>
   </View>
   </View>
 );}}
