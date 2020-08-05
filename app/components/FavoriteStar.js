import React, { useState } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import fav from '../img/fav.png';
import notfav from '../img/notfav.png';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useFocusEffect } from '@react-navigation/native';
import {removeFavorite ,addFavourite} from './FacilitiesManager'
  
export default function FavoriteStar(props) {
const [ loading, setLoading ] = useState(true);
const [ show, setShow ] = useState(false);
const getData = ()=>{this.unsubscribe = firestore().collection('userFavouriteLocations').doc(auth().currentUser.uid).collection(props.colId).doc(props.MarkerInfo.properties.Name).onSnapshot(querySnapshot => { 
  if(querySnapshot != null){
       setShow(querySnapshot.exists);
    }
    else{
      console.log("querySnapshot is null");
    }
      if (loading) {
        setLoading(false);
      }
    });};
    useFocusEffect(
      React.useCallback(() => {
        getData();
        return () => {this.unsubscribe()};
      }, [])
    );
    if(loading)
    { setTimeout(()=>{ getData();},1000);
     return(<View>
     </View>)
    }
    return  (
        <TouchableOpacity style={{alignSelf:'flex-end'}} onPress={()=>{if(show){removeFavorite(props.MarkerInfo.properties.Name , props.colId)}else{addFavourite(props.colId, props.MarkerInfo.properties.Name, props.MarkerInfo.geometry.coordinates[0] ,props.MarkerInfo.geometry.coordinates[1],props.MarkerInfo.properties.description,props.MarkerInfo.properties.ADDRESSSTREETNAME,props.MarkerInfo.properties.ADDRESSPOSTALCODE ); }}}>
    <Image
    style={ {
        width:20,
        height:20,
    
      } }
    source={ show? fav : notfav }
  />
  </TouchableOpacity>
  );
  }