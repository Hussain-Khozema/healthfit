import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CaloriePage from './CaloriePage';
import LogoTitle from './LogoTitle';
import { Text , TouchableOpacity,Image} from 'react-native';
import {signOut} from './AccountManager';

const Stack = createStackNavigator();

export default function CalorieStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CaloriePage" component={CaloriePage} options= {({ navigation }) => ({
            headerTitleAlign:'center',
            headerTitle: props => <LogoTitle title='Food Intake' {...props} />,
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
    </Stack.Navigator>
  );
}