import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AddFoodPage from './AddFoodPage';
import ChooseServingPage from './ChooseServingPage'
import LogoTitle from './LogoTitle';
import { Text , TouchableOpacity,Image} from 'react-native';
import {signOut} from './AccountManager';

const Stack = createStackNavigator();

export default function AddFoodStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AddFoodPage" component={AddFoodPage} options= {({ navigation }) => ({
            headerTitleAlign:'center',
            headerTitle: props => <LogoTitle title='Add Intake' {...props} />,
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
          <Stack.Screen name="ChooseServingPage" component={ChooseServingPage} options= {({ navigation }) => ({
            headerTitleAlign:'center',
            headerTitle: props => <LogoTitle title='Add Intake'{...props} />,
            headerRight:() => (
              <TouchableOpacity onPress={() => {signOut(navigation);}}>
              <Text style={{marginRight:10 , fontSize:17}}>Logout</Text>
            </TouchableOpacity>
              ),
          })}/>
    </Stack.Navigator>
  );
}
