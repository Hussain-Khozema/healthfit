import React, { useState } from 'react';
import {TouchableOpacity, ActivityIndicator, Text, View, Dimensions, ScrollView} from 'react-native';
import {BarChart} from "react-native-chart-kit";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useFocusEffect } from '@react-navigation/native';
import {getDayData , getMonthData , getRecommended} from './FoodCalculator';
import {getAge} from './AccountManager';



const screenWidth = Dimensions.get("window").width;

const chartConfigMonth = {
  backgroundGradientFrom: "white",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "white",
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(1, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  decimalPlaces:0,
  strokeWidth:50,
  barPercentage:0.2
};

const chartConfigDay = {
  backgroundGradientFrom: "white",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "white",
  backgroundGradientToOpacity: 1,
  color: (opacity = 0) => `rgba(1, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  decimalPlaces:0,
  strokeWidth:50,
  barPercentage:0.2
};



export default function CarbsChart(props){

  const [ loading, setLoading ] = useState(true);
  const [ displayMonth, setDisplayMonth ] = useState(false);
  const [ monthData, setMonthData ] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        data: []
      }
    ]
  });
  const [ dayData, setDayData ] = useState({
    labels: ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        data: []
      }
    ]
  });
  const [ monthSum, setMonthSum ] = useState(0);
  const [ daySum, setDaySum ] = useState(0);
  const [nutriSurveyData, setNutriSurveyData] = useState(null);
  const [ personalInfo, setPersonalInfo ] = useState({name:'',birthdate: '' , gender: '' , height:null , weight: null });
  const getData = ()=>{
    fetch('https://data.gov.sg/api/action/datastore_search?resource_id=195a821b-1a3b-44d8-86e7-2040fb9cdc6a')
      .then((response) => response.json())
      .then((json) => setNutriSurveyData(json))
      .catch((error) => console.error(error))


    this.unsubscribe = firestore().collection('usersIntake').doc(auth().currentUser.uid).onSnapshot(querySnapshot => {
    if(querySnapshot != null && querySnapshot.exists){
      let monthTemp = getMonthData(querySnapshot.data() , false);
      setMonthData(monthTemp[0]);
      setMonthSum(monthTemp[1]);
      let dayTemp = getDayData(querySnapshot.data() , false);
      setDayData(dayTemp[0]);
      setDaySum(dayTemp[1]);
      }
      else{
        console.log("querySnapshot is null");
      }
        if (loading) {
          setLoading(false);
        }
      });};
      const getProfileData = ()=>{
        try {
          setLoading(true);
          firestore().collection('users').doc(auth().currentUser.uid).get().then((profileQuery)=>{setPersonalInfo(profileQuery.data())});
        } catch (error) {
          alert(error.message);
        }
          };
  useFocusEffect(
    React.useCallback(() => {
      getData();
      getProfileData();
      return () => {if(this.unsubscribe != undefined)this.unsubscribe()};
    }, [])
  );
  if(loading || nutriSurveyData == null)
  {setTimeout(()=>{ getData();},1000);
   return(<View style={{flex: 1, padding: 20}}>
    <ActivityIndicator size="large"/>
  </View>)
  }
    return (<View style={{flex: 1, backgroundColor:'#EEEEEE',
        flexDirection: 'column',
        }}>

      <View style={{flex:0.1,flexDirection: 'row', justifyContent: 'center',
                alignItems: 'center', paddingTop: 10}}>
      <TouchableOpacity style ={{justifyContent: 'center', alignItems: 'center'}}
                    onPress={() => {setDisplayMonth(false)}}>
                    <View style={{backgroundColor: (!displayMonth)
                        ? "grey"
                        : '#DDDDDD',
                        width: 80,
                        height: 30,
                        alignItems: 'center',
                      justifyContent:'center',
                      flexDirection: 'row',
                    borderRadius: 15,}} >
                      <View style ={{alignItems: 'center'}}>
                      <Text style ={{fontSize:20}}>D</Text>

                      </View></View>

                </TouchableOpacity>

                <TouchableOpacity
                      onPress={() => {setDisplayMonth(true);}}>
                    <View style={{backgroundColor: displayMonth
                      ? "grey"
                      : '#DDDDDD',
                      width: 80,
                      height: 30,
                      alignItems: 'center',
                    justifyContent:'center',
                    flexDirection: 'row',
                  borderRadius: 15}} >
                    <View style ={{alignItems: 'center'}}>
                    <Text style ={{fontSize:20}}>M</Text>

                    </View></View>
                </TouchableOpacity>
      </View>


      <View style={{flex:0.5}}>

      {displayMonth &&<View style={{flex:1}}>

      <Text style={{flex:0.1,fontSize: 20, paddingLeft:10}}>Year to Date Total:</Text>
      <Text style={{flex:0.1,fontSize: 20, paddingLeft:10, paddingBottom: 5}}>{monthSum}</Text>
      <BarChart
      style={{flex:0.9,
          marginVertical: 8,
          borderRadius: 16
        }}
      data={monthData}
      width={screenWidth}
      height={220}
      chartConfig={chartConfigMonth}
      verticalLabelRotation={0}
      showBarTops	={false}
      fromZero={true}
      yAxisInterval={10}
      withHorizontalLabels={true}
      yAxisSuffix={'g'}
    /></View>}
    {(!displayMonth) &&<View style={{flex:1}}>

    <Text style={{flex:0.1,fontSize: 20, paddingLeft: 10}}>Week to Date Total:</Text>
    <Text style={{flex:0.1,fontSize: 20, paddingLeft:10, paddingBottom: 5}}>{daySum}</Text>
    <BarChart
    style={{ flex:0.9,
        marginVertical: 8,
        borderRadius: 16
      }}
    data={dayData}
    width={screenWidth}
    height={220}
    chartConfig={chartConfigDay}
    verticalLabelRotation={0}
    showBarTops	={false}
    fromZero={true}
    yAxisInterval={10}
    withHorizontalLabels={true}
    yAxisSuffix={'g'}
  /></View>}


</View>
<View style={{flex: 0.4}}>
<View style={{ backgroundColor: 'white', borderRadius: 15, padding:20, margin: 10}}>
        <ScrollView>
    <Text style ={{lineHeight:22, fontSize:17,paddingLeft:10}} >{"Hello " + personalInfo.name + "! "+  getRecommended(getAge(personalInfo.birthdate), personalInfo.gender, nutriSurveyData) + "g"}</Text>
          </ScrollView>
          </View></View>



</View>
    );
}
