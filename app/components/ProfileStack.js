import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LogoTitle from './LogoTitle';
import { Text , TouchableOpacity,Image} from 'react-native';
import ProfilePage from './ProfilePage';
import EditProfile from './EditProfile';
import {signOut} from './AccountManager';

const Stack = createStackNavigator();


export default function ProfileStack() {
  return (
    <Stack.Navigator initialRouteName="ProfilePage">   
      <Stack.Screen name="ProfilePage" component={ProfilePage} options= {({ navigation }) => ({
            headerTitleAlign:'center',
            headerTitle: props => <LogoTitle title='Profile' {...props} />,
            headerLeft : () => (
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                style={ {marginLeft :10 ,width: 35, height: 35}}
                source={require('../img/menu.png')}
              />
            </TouchableOpacity>
            ),
            headerRight:() => (
              <TouchableOpacity onPress={() => {signOut(navigation);}}>
              <Text style={{marginRight:10 , fontSize:17}}>Logout</Text>
            </TouchableOpacity>
              ),
          })}/>    
          <Stack.Screen name="EditProfile" component={EditProfile} options= {({ navigation }) => ({
            headerTitleAlign:'center',
            headerTitle: props => <LogoTitle title='Edit Profile' {...props} />,
            headerRight:() => (
              <TouchableOpacity onPress={() => {signOut(navigation);}}>
              <Text style={{marginRight:10 , fontSize:17}}>Logout</Text>
            </TouchableOpacity>
              ),
          })}/> 
    </Stack.Navigator>
  );
}