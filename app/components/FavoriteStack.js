import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Favorite from './Favorite';
import LogoTitle from './LogoTitle';
import { Text , TouchableOpacity,Image} from 'react-native';
import {signOut} from './AccountManager';
import GymLocationDetails from './GymLocationDetails';
import IPPTLocationDetails from './IPPTLocationDetails';
import ParksLocationDetails from './ParksLocationDetails';

const Stack = createStackNavigator();


export default function FavoriteStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Favorite" component={Favorite} options= {({ navigation }) => ({
            headerTitleAlign:'center',
            headerTitle: props => <LogoTitle title='Favourites' {...props} />,
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
           <Stack.Screen name="GymLocationDetails" component={GymLocationDetails} options= {({ navigation }) => ({
            headerTitleAlign:'center',
            headerTitle: props => <LogoTitle title='Location Details' {...props} />,
            headerRight:() => (
              <TouchableOpacity onPress={() => {signOut(navigation);}}>
              <Text style={{marginRight:10 , fontSize:17}}>Logout</Text>
            </TouchableOpacity>
              ),
          })}/>
           <Stack.Screen name="IPPTLocationDetails" component={IPPTLocationDetails} options= {({ navigation }) => ({
            headerTitleAlign:'center',
            headerTitle: props => <LogoTitle title='Location Details' {...props} />,
            headerRight:() => (
              <TouchableOpacity onPress={() => {signOut(navigation);}}>
              <Text style={{marginRight:10 , fontSize:17}}>Logout</Text>
            </TouchableOpacity>
              ),
          })}/>
           <Stack.Screen name="ParksLocationDetails" component={ParksLocationDetails} options= {({ navigation }) => ({
            headerTitleAlign:'center',
            headerTitle: props => <LogoTitle title='Location Details' {...props} />,
            headerRight:() => (
              <TouchableOpacity onPress={() => {signOut(navigation);}}>
              <Text style={{marginRight:10 , fontSize:17}}>Logout</Text>
            </TouchableOpacity>
              ),
          })}/>
    </Stack.Navigator>
  );
}
