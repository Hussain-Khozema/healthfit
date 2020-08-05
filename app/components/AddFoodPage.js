import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity,TextInput, FlatList, Dimensions } from 'react-native';
import {getFood , setSearchText} from './FoodCalculator';
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column'
    },
    img:{
      height: 150,justifyContent:'center',borderColor: 'black', borderWidth: 2,borderRadius: 5, margin: 5
    },
    category:{
      textAlign:'center', fontSize:18, fontWeight:'bold'
    }
  });

const WIDTH = Dimensions.get('window').width

  
  export default function AddFoodPage(props) {
    const [foodData, setFoodData] = React.useState(null);
    const [ loading, setLoading ] = useState(true);
    const [currentTab, setcurrentTab] = React.useState(0);
    const [searchData, setSearchData] = React.useState(null);

    useEffect(() => {
        if(loading){
            getFood().then((data)=>{
                setFoodData(data);
                setSearchData(data[0]);
                setLoading(false);
            });
        }
      });

      if(loading)
      {
        return(<View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontSize: 40, fontWeight:'bold'}}>Loading</Text>
       </View>);
      }


    return (
    <View style={{flex:1}}>
        <View style={{ flexDirection:'row', height: 40, borderColor: 'gray', borderWidth: 2 ,marginVertical:10,marginHorizontal:10, alignContent:'center'}} >
          <Image source={require('../img/search.png')}
          style={{ width: 30, height: 30 , alignSelf:'center' , marginLeft:7}}/>
            <TextInput
                style={{ height: 40,paddingLeft:10 , textAlignVertical:'center'}}
                onChangeText={text => setSearchText(text ,foodData[currentTab] , setSearchData)}
                placeholder="Search Food"
            />
        </View>
        <View style={{flexDirection: 'row' , marginBottom:10}}>
            <TouchableOpacity style={{flex:0.25,height:20}} onPress={()=>{setcurrentTab(0);setSearchData(foodData[0]);}}>
                <Text style={styles.category}>Meals</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flex:0.25,height:20, width:50}} onPress={()=>{setcurrentTab(1);setSearchData(foodData[1]);}}>
                <Text style={styles.category}>Vegetables</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flex:0.25,height:20, width:50}} onPress={()=>{setcurrentTab(2);setSearchData(foodData[2]);}}>
                <Text style={styles.category}>Fruits</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{textAlign:'center',flex:0.25,height:20, width:50}} onPress={()=>{setcurrentTab(3);setSearchData(foodData[3]);}}>
                <Text style={styles.category}>Drinks</Text>
            </TouchableOpacity>

        </View>



        <FlatList
            style = {{flex:0.8}}
            data = {searchData}
            numColumns = {2}
            renderItem={({item, index}) => (

                <View>
                    <TouchableOpacity onPress={()=>{props.navigation.navigate('ChooseServingPage' , item)}}>
                      <Image style = {[styles.img, {width: (WIDTH/2 - 10)}]} source = {{uri:item.uri}}/>
                      </TouchableOpacity>
                    <Text style={{textAlign:'center', fontSize:18}}>{item.key}</Text>
                </View>

                )}
            keyExtractor={(item, index) => index.toString()}

        />

    </View>
    );
};
