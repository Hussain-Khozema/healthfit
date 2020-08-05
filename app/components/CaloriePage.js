import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, SectionList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useFocusEffect } from '@react-navigation/native';
import {getIntakeData} from './FoodCalculator';

const styles = StyleSheet.create({
  blackbold: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30
  },
  blacktotal:{
    color:'black',
    fontSize: 20
  },
  black: {
    color: 'black',
    fontSize: 20,
  },
  container: {
    flex: 1
  },
  date:{
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: 'rgba(179,179,179,1.0)',
  },
  foodname:{
    flexDirection: 'row', justifyContent: 'space-between'
  },

});


export default function CaloriePage(props){
  const [ loading, setLoading ] = useState(true);
  const [ intakeData, setIntakeData ] = useState(null);
  const getData = ()=>{ this.unsubscribe = firestore().collection('usersIntake').doc(auth().currentUser.uid).onSnapshot(querySnapshot => { 
    if(querySnapshot != null && querySnapshot.exists){
      setIntakeData(getIntakeData(querySnapshot.data()));
      }
      else{
        console.log("querySnapshot is null");
      }
        if (loading) {
          setLoading(false);
        }
      });
     }
  useFocusEffect(
    React.useCallback(() => {
      getData();
      return () => {if(this.unsubscribe != undefined){this.unsubscribe()}};
    }, [])
  );
  if(loading)
  {setTimeout(()=>{ getData();},1000);
   return(<View style={{flex: 1, padding: 20}}>
    <ActivityIndicator size="large"/>
  </View>)
  }
  if(intakeData == null){
    return( <View style={styles.container}><Text style={{fontSize:18,textAlign:'center' , marginTop:10}}>There are no food intake to display</Text></View>);
  }
    return (

      <View style={styles.container}>
      <SectionList
          sections={intakeData}
          renderItem={({item}) =>
          <View style={{}}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                
        <Text style={{fontSize:20, marginHorizontal:10}}>{item[0]}</Text>
              
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <Text style={{fontSize:20, marginHorizontal:10}}>Calorie</Text>
    <Text style={{fontSize:20, marginHorizontal:10}}>{item[1]}</Text>  
              </View>
            </View>
            <View style={{justifyContent:'flex-end', flexDirection:'row'}}>
              <Text style={{fontSize:20, marginHorizontal:10}}>Carbohydrate</Text>
              <Text style={{fontSize:20, marginHorizontal:10}}>{item[2]}</Text>  
            </View>
          </View>
          
          }
          renderSectionHeader={({section}) => 
          <Text style={styles.date}>{section.title}</Text>
        }
          keyExtractor={(item, index) => index}
        />
       
      </View>
    );
};
