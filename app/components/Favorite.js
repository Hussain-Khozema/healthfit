import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity,ActivityIndicator } from 'react-native';
import upImg from '../img/arrowright.png';
import downImg from '../img/arrowdown.png';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useFocusEffect } from '@react-navigation/native';
import {removeFavorite , goDetails} from './FacilitiesManager'

export default function Favourite(props){

const [ loading, setLoading ] = useState(true);
const [ show, setShow ] = useState(false);
const [ show1, setShow1 ] = useState(false);
const [ show2, setShow2 ] = useState(false);
const [ gymdata, setGymData ] = useState([]);
const [ parkdata, setParkData ] = useState([]);
const [ IPPTdata, setIPPTData ] = useState([]);
const getData = ()=>{
  this.unsubscribe = firestore().collection('userFavouriteLocations').doc(auth().currentUser.uid).collection('ParkLocations').onSnapshot(querySnapshot => {
    if(querySnapshot != null){
      const tempDoc = querySnapshot.docs.map((doc) => {
         return { id: doc.id, ...doc.data() }
       })
       setParkData(tempDoc);
    }
    else{
      console.log("querySnapshot is null");
    }
   
      if (loading) {
        setLoading(false);
      }
    });
       this.unsubscribe1 = firestore().collection('userFavouriteLocations').doc(auth().currentUser.uid).collection('IPPTLocations').onSnapshot(querySnapshot => {
    if(querySnapshot != null){
      const tempDoc = querySnapshot.docs.map((doc) => {
         return { id: doc.id, ...doc.data() }
       })
       setIPPTData(tempDoc);
    }
    else{
      console.log("querySnapshot is null");
    }
     
        if (loading) {
          setLoading(false);
        }
      });

    this.unsubscribe2 = firestore().collection('userFavouriteLocations').doc(auth().currentUser.uid).collection('GymLocations').onSnapshot(querySnapshot => {
      if(querySnapshot != null){
        const tempDoc = querySnapshot.docs.map((doc) => {
           return { id: doc.id, ...doc.data() }
         })
         setGymData(tempDoc);
      }
      else{
        console.log("querySnapshot is null");
      }
         
            if (loading) {
              setLoading(false);
            }
          });
}
useFocusEffect(React.useCallback(() => {
    getData();
    return () => {this.unsubscribe();this.unsubscribe1();this.unsubscribe2();}; // Stop listening for updates whenever the component unmounts
  }, [])
  
  
  );

if(loading)
{
  setTimeout(()=>{ getData();},1000);
 return(<View style={{flex: 1, padding: 20}}>
   <ActivityIndicator size="large"/>
 </View>)
}
    return (
      <View style={styles.MainContainer}>
        {/*Here we will return the view when state is true
        and will return false if state is false*/}

        <TouchableOpacity
                  style={styles.facilityType}
                 onPress={()=>setShow(!show)}
          >
             <Text style={[styles.blackbold]}>Gym</Text>
      <Image
        style={ styles.ImageClass }
        source={ show? downImg : upImg }
      />
        </TouchableOpacity>

      <View style={[styles.textContainer]}>
      {show && gymdata.map((item , index)=>{return(
            <View key={index} style={{flexDirection: 'row'}}>
               <TouchableOpacity style={{flex:0.9,}} onPress={()=>{goDetails(props,"GymLocationDetails" , item)}}>
      <Text style={styles.text}>{item.id}</Text>
              </TouchableOpacity>
              <View style={{
                flex: 0.1,
                justifyContent:'center',
                alignItem: 'flex-end'}}>
                <TouchableOpacity onPress={()=>{removeFavorite(item.id , "GymLocations")}}>
                <Image style={[styles.favImage]} source={require('../img/fav.png')} />
                </TouchableOpacity>
              </View>
            </View>)})}
            </View>
            
            <TouchableOpacity
                  style={styles.facilityType}
                 onPress={()=>setShow1(!show1)}
          >
             <Text style={[styles.blackbold]}>IPPT</Text>
      <Image
        style={ styles.ImageClass }
        source={ show1? downImg : upImg }
      />
        </TouchableOpacity>
      <View style={[styles.textContainer]}>
      {show1 && IPPTdata.map((item , index)=>{return(
            <View key={index} style={{flexDirection: 'row'}}>
              <TouchableOpacity style={{flex:0.9,}} onPress={()=>{goDetails(props,"IPPTLocationDetails" , item)}}>
      <Text style={styles.text}>{item.id}</Text>
              </TouchableOpacity>
              <View style={{
                flex: 0.1,
                justifyContent:'center',
                alignItem: 'flex-end'}}>
                <TouchableOpacity onPress={()=>{removeFavorite(item.id , "IPPTLocations")}}>
                <Image style={[styles.favImage]} source={require('../img/fav.png')} />
                </TouchableOpacity>
              </View>
            </View>)})}
            </View>

            <TouchableOpacity
                  style={styles.facilityType}
                 onPress={()=>setShow2(!show2)}
          >
             <Text style={[styles.blackbold]}>Parks</Text>
      <Image
        style={ styles.ImageClass }
        source={ show2? downImg : upImg }
      />
        </TouchableOpacity>
      <View style={[styles.textContainer]}>
      {show2 && parkdata.map((item , index)=>{return(
            <View key={index} style={{flexDirection: 'row'}}>
              <TouchableOpacity style={{flex:0.9,}} onPress={()=>{goDetails(props,"ParksLocationDetails" , item)}}>
      <Text style={styles.text}>{item.id}</Text>
              </TouchableOpacity>
              <View style={{
                flex: 0.1,
                justifyContent:'center',
                alignItem: 'flex-end'}}>
                <TouchableOpacity onPress={()=>{removeFavorite(item.id , "ParkLocations")}}>
                <Image style={[styles.favImage]} source={require('../img/fav.png')} />
                </TouchableOpacity>
              </View>
            </View>)})}
            </View>
      </View>
    );
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#DDDDDD',
    padding: 20,
    paddingTop: 20
  },
  ImageClass:{
    width: 30,
    height: 30
  },
  blackbold: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30
  },
  text: {
    color: 'black',
    padding: 10,
  },
  facilityType:{
    flexDirection: 'row',
    justifyContent:'space-between',
    padding: 10
  },
  favImage:{
    width:20,
    height:20,

  },
  textContainer:{
    borderRadius: 10,
    backgroundColor:'white'
    },
});
