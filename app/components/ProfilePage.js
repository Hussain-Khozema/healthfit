import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {styles} from './styles'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Text, View, TouchableOpacity , Image,ActivityIndicator } from 'react-native';
import {getAge} from './AccountManager';

export default function ProfilePage(props) {
  const [ loading, setLoading ] = useState(true);
  const [ personalInfo, setPersonalInfo ] = useState({name:'',birthdate: '' , gender: '' , height:null , weight: null });
  const getData = ()=>{this.unsubscribe = firestore().collection('users').doc(auth().currentUser.uid).onSnapshot(querySnapshot => {
    if(querySnapshot != null && querySnapshot.data() != null){
      setPersonalInfo(querySnapshot.data());
    }
    else{
      console.log("querySnapshot is null");
    }
    

    if (loading) {
      setLoading(false);
    }
  });}
  useFocusEffect(React.useCallback(() => {
    getData();
    return () => {this.unsubscribe()}; // Stop listening for updates whenever the component unmounts
  }, []));
  if(loading)
  {
    setTimeout(()=>{ getData();},1000);
    return(<View style={{flex: 1, padding: 20}}>
      <ActivityIndicator size="large"/>
    </View>)
  }
    return (
      <View style={{flex:1}}>
        <View style={{flex:0.05}}></View>
        <View style={{flex:0.15}}><Image style={{height:100, alignSelf:"center",width:100, borderWidth:2,borderColor:'#424242', borderRadius:150/2}} source={require('../img/emptyProfile.png')} ></Image></View>
        <View style={{flex:0.75 }}>
          <View style={{marginTop:20,marginHorizontal:50} }>
            <Text style={styles.infoTop}>Name:</Text>
            <Text style={styles.infoText}>{personalInfo.name}</Text>
            <Text style={styles.infoTop}>Age:</Text>
            <Text style={styles.infoText}>{getAge(personalInfo.birthdate)}</Text>
            <Text style={styles.infoTop}>Gender:</Text>
            <Text style={styles.infoText}>{personalInfo.gender}</Text>
            <Text style={styles.infoTop}>Height:</Text>
            <Text style={styles.infoText}>{personalInfo.height}</Text>
            <Text style={styles.infoTop}>Weight:</Text>
            <Text style={styles.infoText}>{personalInfo.weight}</Text>
            <Text style={styles.infoTop}>BMI:</Text>
            <Text style={styles.infoText}>{(personalInfo.weight/((personalInfo.height/100) * (personalInfo.height/100)))}</Text>
            <TouchableOpacity style={{backgroundColor:'#616161', width:100,height:40,justifyContent: 'center', alignSelf:'flex-end', marginTop:10, borderRadius:5}} onPress={()=>{props.navigation.navigate('EditProfile', personalInfo)}}>
              <Text style={styles.edittext}>Edit</Text>
            </TouchableOpacity>
            <Text style={styles.infoTop}> </Text>
          </View>
        </View>      
      </View>
    );
}