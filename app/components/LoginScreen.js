import React, { Component } from 'react';
import { Image, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {styles} from './styles';
import auth from '@react-native-firebase/auth';
import {signIn} from './AccountManager';

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {email: '' , password: ''};
      }

    componentDidMount() {
        // Add listener here
        this.unsubscribe = auth().onAuthStateChanged(user => {
            if (user) {
                this.props.navigation.navigate('View Calorie Chart', { screen: 'CalorieChart' });
            }
            else{
                this.props.navigation.navigate('Logout' ,{screen:'LoginScreen'});
            }
        });
    }

    componentWillUnmount() {
        // Don't forget to unsubscribe when the component unmounts
        this.unsubscribe();
    }

    render() {
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
                    <TextInput style={styles.input} placeholder={'Email address'} placeholderTextColor={'grey'} onChangeText={(email) => this.setState({email})} value={this.state.email} underlineColorAndroid='transparent'></TextInput>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder={'Password'} placeholderTextColor={'grey'} onChangeText={(password) => this.setState({password})} value={this.state.password} underlineColorAndroid='transparent' secureTextEntry={true}></TextInput>
                </View>
                <TouchableOpacity style={styles.btnLogin} onPress={() => {this.unsubscribe();signIn(this.state.email , this.state.password , this) }}>
                    <Text style={styles.text}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnRegister} onPress={() =>{this.unsubscribe(); this.props.navigation.navigate('CreateAccountScreen');}}>
                    <Text style={styles.text}>Register</Text>
                </TouchableOpacity>
            </View>

        );
    }
}

export default LoginScreen
