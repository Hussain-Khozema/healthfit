import React, { Component } from 'react';
import { ActivityIndicator, Image, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {styles} from './styles';
import {register} from './AccountManager';


class CreateAccountScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {email: '' , password: '' , confirmPassword: '' , loading:false};
      }

    render() {
        if(this.state.loading)
        {
          return(<View style={{flex: 1, padding: 20}}>
           <ActivityIndicator size="large"/>
         </View>)
        }
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../img/Logo.png')}
                        style={styles.logo}
                    />
                    <Text style={{ fontWeight: 'bold', fontSize: 30 }}>HealthFit</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder={'Email address'} onChangeText={(email) => this.setState({email})} placeholderTextColor={'grey'} underlineColorAndroid='transparent'></TextInput>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder={'Password'} onChangeText={(password) => this.setState({password})} placeholderTextColor={'grey'} underlineColorAndroid='transparent' secureTextEntry={true}></TextInput>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder={'Confirm Password'} onChangeText={(confirmPassword) => this.setState({confirmPassword})} placeholderTextColor={'grey'} underlineColorAndroid='transparent' secureTextEntry={true}></TextInput>
                </View>
                <TouchableOpacity style={styles.btnRegister} onPress={() => {register(this.state.email , this.state.password , this.state.confirmPassword ,  this.props.navigation);}}>
                    <Text style={styles.text}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnBack} onPress={() => {this.setState({loading:true});this.props.navigation.navigate('LoginScreen')}}>
                    <Text style={styles.text}>Back</Text>
                </TouchableOpacity>
            </View>

        );
    }
}

export default CreateAccountScreen
