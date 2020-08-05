import React, { Component } from 'react';
import { Picker, Text, View, TextInput, TouchableOpacity,ActivityIndicator } from 'react-native';
import {styles} from './styles'
import DateTimePicker from '@react-native-community/datetimepicker';
import {setProfile} from './AccountManager';


class SetUpProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() , mode: 'date' , show:false, gender: "Select Gender" , activityLevel:"Select Fitness level (days of physical activity per week)", loading:false};
      }
    onChange = (event, selectedDate) => {
        const currentDate = selectedDate || this.state.date;
        this.setState({show:(Platform.OS === 'ios')});
        this.setState({date:currentDate});
      };
    
    showMode = currentMode => {
        this.setState({show:true});
        this.setState({mode:currentMode});
      };
    
    showDatepicker = () => {
        this.showMode('date');
      };
    
    showTimepicker = () => {
        this.showMode('time');
      };
    render() {
      if(this.state.loading)
     {
       return(<View style={{flex: 1, padding: 20}}>
        <ActivityIndicator size="large"/>
      </View>)
     }
        return (
            <View style={styles.container}>
                <View >
                    <Text style={{  fontSize: 30 }}>Set Up Profile</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} onChangeText={(name) => this.setState({name})} placeholder={'Name'} placeholderTextColor={'grey'} underlineColorAndroid='transparent'></TextInput>
                </View>
                <View style={styles.inputContainer}>
                    <TouchableOpacity style={styles.input} onPress={this.showDatepicker}><Text style={styles.dateText}>{"Date of birth: " + this.state.date.toDateString()}</Text></TouchableOpacity>
                </View>
                
      {this.state.show && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={this.state.date}
          mode={this.state.mode}
          is24Hour={true}
          display="default"
          onChange={this.onChange}
        />
      )}
              <View style={[styles.inputContainer , styles.input]}>
                <Picker
  selectedValue={this.state.gender}
  onValueChange={(itemValue) =>
    this.setState({gender: itemValue})
  }>
                  <Picker.Item label="Select Gender" value="Select Gender" />
                  <Picker.Item label="M" value="M" />
                  <Picker.Item label="F" value="F" />
                </Picker>
              </View>
              <View style={[styles.inputContainer , styles.input]}>
                <Picker
  selectedValue={this.state.activityLevel}
  onValueChange={(itemValue) =>
    this.setState({activityLevel: itemValue})
  }>
                  <Picker.Item label="Select Fitness level (days of physical activity per week)" value="Select Fitness level (days of physical activity per week)" />
                  <Picker.Item label="0" value="0-2"/>
                  <Picker.Item label="1-2" value="1-2"/>
                  <Picker.Item label="3-4" value="3-4"/>
                  <Picker.Item label="5-7" value="5-7"/>
                </Picker>
              </View>
              <View style={styles.inputContainer}>
                  <TextInput style={styles.input} onChangeText={(weight) => this.setState({weight})} keyboardType='numeric' placeholder={'Weight(kg)'} placeholderTextColor={'grey'} underlineColorAndroid='transparent'></TextInput>
              </View>
              <View style={styles.inputContainer}>
                  <TextInput style={styles.input} placeholder={'Height(cm)'} onChangeText={(height) => this.setState({height})} placeholderTextColor={'grey'} keyboardType='numeric' underlineColorAndroid='transparent'></TextInput>
              </View>
              <TouchableOpacity style={styles.btnRegister} onPress={() => {this.setState({loading:true});setProfile(this.state.name,this.state.date.toISOString().slice(0,10),this.state.gender,parseInt(this.state.weight),parseInt(this.state.height),this.state.activityLevel,this.props.navigation) ;}}>
                  <Text style={styles.text}>Done</Text>
              </TouchableOpacity>
          </View>

        );
    }
}

export default SetUpProfileScreen