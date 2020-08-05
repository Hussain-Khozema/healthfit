import React, { Component } from 'react';
import { Text, View, Picker, TouchableOpacity, TextInput,ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {styles} from './styles'
import {editProfile} from './AccountManager'

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {Age: 22,
                    name:props.route.params.name,
                    weight:props.route.params.weight.toString(),
                    height:props.route.params.height.toString(),
                    date: new Date(props.route.params.birthdate) ,
                    mode: 'date' , 
                    show:false,
                    gender: props.route.params.gender ,
                    activityLevel:props.route.params.activityLevel,
                    loading:false
                };
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
      <View style={{flex:1}}>
        <View style={{flex:0.1}}></View>
        <View>
          <View style={{marginHorizontal:50,flexDirection:'column' } }>
            <Text style={styles.infoTop}>Name:</Text>
            <TextInput style={styles.infoText} onChangeText={(name) => this.setState({name})} placeholder='Enter your Name' placeholderTextColor='grey' underlineColorAndroid='transparent' value={this.state.name}></TextInput>
            <Text style={styles.infoTop}>Date Of Birth:</Text>
            <View style={styles.infoTop}>
                    <TouchableOpacity onPress={this.showDatepicker}><Text style={styles.infoText}>{ this.state.date.toDateString()}</Text></TouchableOpacity>
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
            <Text style={styles.infoTop}>Gender:</Text>
            <Picker
            selectedValue={this.state.gender}
            onValueChange={(itemValue) =>
            this.setState({gender: itemValue})
            }>
                <Picker.Item label="Select Gender" value="Select Gender" />
                <Picker.Item label="M" value="M" />
                <Picker.Item label="F" value="F" />
            </Picker>
            <Text style={styles.infoTop}>Height:</Text>
            <TextInput style={styles.infoText} value={this.state.height} keyboardType='numeric' onChangeText={(height) => this.setState({height})} placeholder='Enter your Height' placeholderTextColor='grey' underlineColorAndroid='transparent'></TextInput>
            <Text style={styles.infoTop}>Weight:</Text>
            <TextInput style={styles.infoText} value={this.state.weight} keyboardType='numeric' onChangeText={(weight) => this.setState({weight})} placeholder='Enter your Weight' placeholderTextColor='grey' underlineColorAndroid='transparent'></TextInput>
            <Text style={styles.infoTop}>Select Fitness level:</Text>
                <Picker
  selectedValue={this.state.activityLevel}
  onValueChange={(itemValue) =>
    this.setState({activityLevel: itemValue})
  }>
                  <Picker.Item label="Days of physical activity per week" value={this.state.activityLevel} />
                  <Picker.Item label="0" value="0-2"/>
                  <Picker.Item label="1-2" value="1-2"/>
                  <Picker.Item label="3-4" value="3-4"/>
                  <Picker.Item label="5-7" value="5-7"/>
                </Picker>
            <TouchableOpacity style={{backgroundColor:'#616161', width:100,height:40,justifyContent: 'center', alignSelf:'flex-end', marginTop:10, borderRadius:5}} onPress={() => {this.setState({loading:true});editProfile(this.state.name,this.state.date.toISOString().slice(0,10),this.state.gender,parseInt(this.state.weight),parseInt(this.state.height),this.state.activityLevel,this.props.navigation) ;}}>
              <Text style={styles.edittext}>Save</Text>
            </TouchableOpacity>
            
          </View>
        </View>      
      </View>
    );
  }
}