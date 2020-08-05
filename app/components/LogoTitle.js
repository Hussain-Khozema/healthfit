import React, {Component} from 'react';
import { Image,Text, View } from 'react-native';

class LogoTitle extends Component {
    render() {
      return (
        <View style={{flex: 1, flexDirection: 'row' , alignItems: 'center'}}>
        <Image
          source={require('../img/Logo.png')}
          style={{ width: 30, height: 30  }}
        />
        <Text style={{ fontWeight:'bold',fontSize:20 , marginHorizontal:5 }}>{this.props.title}</Text>
        </View>
       
      );
    }
  }

  export default LogoTitle