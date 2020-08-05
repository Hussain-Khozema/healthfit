import React from 'react';
import LoginStack from './LoginStack'
import CalorieStack from './CalorieStack';
import AddFoodStack from './AddFoodStack';
import {
  createDrawerNavigator
} from '@react-navigation/drawer';
import ProfileStack from './ProfileStack';
import CustomDrawerContent from './CustomDrawerContent'
import LocationStack from './LocationStack'
import CalorieChartStack from './CalorieChartStack'
import CarbsChartStack from './CarbsChartStack'
import FavoriteStack from './FavoriteStack'

const Drawer = createDrawerNavigator();


export default function MyDrawer() {
    return (

      <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />} initialRouteName="Logout">
            <Drawer.Screen name="View Locations" component={LocationStack}/>
            <Drawer.Screen name="View Calorie Chart" component={CalorieChartStack}/>
            <Drawer.Screen name="View Carbs Chart" component={CarbsChartStack}/>
            <Drawer.Screen name="View Intake" component={CalorieStack}/>
            <Drawer.Screen name="Add Intake" component={AddFoodStack}/>
            <Drawer.Screen name="View Profile" component={ProfileStack}/>
            <Drawer.Screen name="View Favorites" component={FavoriteStack}/>
            <Drawer.Screen name="Logout" component={LoginStack} options={{gestureEnabled: false}}/>
      </Drawer.Navigator>
    );
  }
