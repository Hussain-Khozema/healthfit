import React, { Component } from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {addFood} from './FoodCalculator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  plusminus:{
    fontSize:100, textAlign:'center'
  },
  plusminusbtn:{
    width:110,height: 100,borderColor: 'black', borderWidth: 2,borderRadius: 5,justifyContent: 'center', marginHorizontal: 15
},
  img:{
    width: 150, height: 150, borderColor: 'black', borderWidth: 2,borderRadius: 5, marginTop: 20
  },
  foodname:{
    fontSize:20,textAlign:'center',marginBottom: 5, fontWeight:'bold'
  },
  foodintake:{
    fontSize:20, marginVertical: 5, fontWeight:'bold'
  },
});



export default class ChooseServingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      item:props.route.params
    };
  }
  addFoodItem = ()=>{
    if(this.state.count == 0)
    {
      alert("Unable to add zero servings")
      return;
    }
    let calories = this.state.count * this.state.item.calories;
    let carbohydrates = this.state.count * this.state.item.carbohydrates;
    let date = new Date().toISOString().slice(0,10);
    console.log(date);
    addFood(date,this.state.item.key,calories,carbohydrates );
  }
  onMinus= () => {
    if(this.state.count>0){
    this.setState({
      count: this.state.count - 1
    })
  }
  }

  onPlus= () => {
    this.setState({
      count: this.state.count+ 1
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <View style={{flex: 1, alignSelf:'center'}}>
            <Image style = {styles.img} source = {{uri: this.state.item.uri}}/>
          </View>
          <View>
            <Text style={styles.foodname}>{this.state.item.key}</Text> 
          </View>

          <View style = {{flex:0.5, alignSelf:'center'}}>
            <View style= {{justifyContent:'space-between', flexDirection:'row'}}>
              <Text style={styles.foodintake}>Calorie:</Text>
              <Text style={styles.foodintake}>{this.state.item.calories}</Text>
              </View>
              <View style= {{justifyContent:'space-between', flexDirection:'row'}}>
              <Text style={styles.foodintake}>Carbohydrate:</Text>
              <Text style={styles.foodintake}>{this.state.item.carbohydrates}</Text>
            </View>
          </View>

          <View style={{flex:1, flexDirection:'row',justifyContent:'center'}}>
            <TouchableOpacity style= {styles.plusminusbtn} onPress={this.onMinus}>
              <Text style = {styles.plusminus}>
                -
              </Text>
            </TouchableOpacity>
            <View style={{}}>
              <Text style={{fontSize:40, marginTop:20, marginHorizontal: 20}}>{this.state.count}</Text>
              
            </View> 
            <TouchableOpacity style= {styles.plusminusbtn} onPress={this.onPlus}>
              <Text style = {styles.plusminus}>
                +
              </Text>
            </TouchableOpacity>
          </View>

        </View>
          <View style={{flexDirection:'row',justifyContent:'center',marginBottom: 20}}>
          <TouchableOpacity style= {{width:100,height: 50,borderColor: 'black', borderWidth: 2,borderRadius: 5,fontSize: 16,justifyContent: 'center',marginHorizontal: 15}} onPress={()=>{this.addFoodItem()}}>
            <Text style = {{alignSelf:'center'}}>
              Add 
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};