import React, { useState } from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {signOut} from './AccountManager';


export default function CustomDrawerContent(props) {
    const [overviewExpand, setOverviewExpand ] = useState(false);
    const [locationExpand, setLocationExpand ] = useState(false);
    return (
      <DrawerContentScrollView>
        <DrawerItem
          label="Overview"
          style={{backgroundColor: overviewExpand ? 'gray':'white'}}
          onPress={() => {setOverviewExpand(!overviewExpand)}}
        />
        {overviewExpand &&(<DrawerItem
            label="Calorie Chart"
            labelStyle ={{marginLeft:30}}
            onPress={() => props.navigation.navigate('View Calorie Chart')}
          />)}{overviewExpand &&(<DrawerItem
              label="Carbohydrate Chart"
              labelStyle ={{marginLeft:30}}
              onPress={() => props.navigation.navigate('View Carbs Chart')}
            />)}
        <DrawerItem
          label='Locations'
          style={{backgroundColor: locationExpand ? 'gray':'white'}}
          onPress={() => {setLocationExpand(!locationExpand)}}
        />
        {locationExpand &&  (<DrawerItem
          label="All Locations"
          labelStyle ={{marginLeft:30}}
          onPress={() => props.navigation.navigate('View Locations')}
        />
        ) }{locationExpand &&(<DrawerItem
            label="Favourites"
            labelStyle ={{marginLeft:30}}
            onPress={() => props.navigation.navigate('View Favorites')}
          />)}
        <DrawerItem
          label="View Profile"
          onPress={() => props.navigation.navigate('View Profile')}
        />
        <DrawerItem
          label="View Intake"
          onPress={() => props.navigation.navigate('View Intake')}
        />
        <DrawerItem
          label="Add Intake"
          onPress={() => props.navigation.navigate('Add Intake')}
        />
       <DrawerItem
          label="Logout"
          onPress={() => signOut(props.navigation)}
        />
      </DrawerContentScrollView>
    );
  }
