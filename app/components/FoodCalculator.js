import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

async function getFood() {
    const querySnapshot = await firestore()
    .collection('Meal')
    .get();
    const data = querySnapshot.docs.map((documentSnapshot) => {
      return {
        ...documentSnapshot.data(),
        key: documentSnapshot.id,
      };
    });

    const querySnapshot2 = await firestore()
    .collection('Vegetables')
    .get();
    const data2 = querySnapshot2.docs.map((documentSnapshot) => {
      return {
        ...documentSnapshot.data(),
        key: documentSnapshot.id,
      };
    });
    const querySnapshot3 = await firestore()
    .collection('Fruits')
    .get();
    const data3 = querySnapshot3.docs.map((documentSnapshot) => {
      return {
        ...documentSnapshot.data(),
        key: documentSnapshot.id,
      };
    });
    const querySnapshot4 = await firestore()
    .collection('Drinks')
    .get();
    const data4 = querySnapshot4.docs.map((documentSnapshot) => {
      return {
        ...documentSnapshot.data(),
        key: documentSnapshot.id,
      };
    });
    return [data , data2 , data3 , data4];
  }

  function setSearchText(text , foodData , setSearchData){
    let searchText = text;
    let data = foodData;
    searchText = searchText.trim().toLowerCase();
   data = data.filter(l => {
    return l.key.toLowerCase().match( searchText );
   });
   setSearchData(data);
   }
   async function addFood(date,foodName,calories,carbohydrates) {
    try {
      const querySnapshot = await firestore().collection('usersIntake').doc(auth().currentUser.uid).get();
      if(querySnapshot.exists)
      {
        const data = querySnapshot.data();
        let newData = null;
        if(date in data)
        {
          newData = data[date];
          newData.push(foodName);
          newData.push(calories);
          newData.push(carbohydrates);
        }
        else{
          newData = [foodName, calories ,carbohydrates];
        }
        await firestore().collection('usersIntake').doc(auth().currentUser.uid).set({
          [date]:newData,
        }, { merge: true });
      }
      else{
        let newData = null;
        newData = [foodName, calories ,carbohydrates];
        await firestore().collection('usersIntake').doc(auth().currentUser.uid).set({
          [date]:newData,
        }, { merge: true });
      }
      alert("Food Intake added successfully")
      
  } catch (e) {
   alert(e.message);
  }
  }

  function getIntakeData(data){
    let intakeData = [];
  
  const entries = Object.entries(data);
  entries.sort();
  entries.map((item)=>{
    let tempArray = [];
    console.log(item);
  for(let i = 0;i< item[1].length;i+=3)
  {
    tempArray.push([item[1][i], item[1][i+1], item[1][i+2]]);
  }
  let temp = {title:item[0],data:tempArray}
  intakeData.unshift(temp);
  })
  return intakeData;
  }

  function getMonthData(data , isCalorie) {
    
    let itemPos = isCalorie?1:2;
    let monthDataSet = [0,0,0,0,0,0,0,0,0,0,0,0];
    let todayDate = new Date().getFullYear();
    let listData = Object.entries(data);
    for (const [key, value] of listData) {
      if(key.slice(0,4) == todayDate){
        let total = 0;
        for (let i = itemPos; i < value.length; i+=3) {
          total+= value[i];
      }
        monthDataSet[parseInt(key.slice(5,7)) - 1] += total;
      }
    }
    const monthData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          data: monthDataSet
        }
      ]
    }
    var monthSum = 0;
  
  for (let num of monthDataSet){
  
      monthSum = monthSum + num
  }
    return [monthData,monthSum];
  }
  
  function getDayData(data , isCalorie) {
    let itemPos = isCalorie?1:2;
    let dayDataSet = [0, 0, 0, 0, 0, 0, 0];
    let todayDate = new Date();
    let minDate = new Date();
    minDate.setDate(todayDate.getDate() - todayDate.getDay());
    minDate.setHours(0,0,0,0);
    let maxDate = (new Date());
    maxDate.setDate( minDate.getDate() + 6);
    maxDate.setHours(23,59,59,999);
    let listData = Object.entries(data);
    for (const [key, value] of listData) {
      let keyDate = new Date(key);
      if(keyDate >= minDate && keyDate <= maxDate){
        let total = 0;
        for (let i = itemPos; i < value.length; i+=3) {
          total+= value[i];
      }
      dayDataSet[keyDate.getDay()] += total;
      }
    }
    const dayData = {
      labels: ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      datasets: [
        {
          data: dayDataSet
        }
      ]
    }
    var daySum = 0;
  
  for (let num of dayDataSet){
  
      daySum = daySum + num
  }
    return [dayData , daySum];
  }

  const formatAgeGroup = (date)=>{
    let matches = date.match(/\d+/g);
    return matches;
  }
  
  function getRecommended(userAge, userGender, nutriSurveyData){
  
  
    for(i=0;i<29;i++){
    if(userGender == nutriSurveyData.result.records[i].gender.charAt(0)){
      if(userAge > formatAgeGroup(nutriSurveyData.result.records[i].age_group)[0] && formatAgeGroup(nutriSurveyData.result.records[i].age_group)[1] ){
        return "Your recommended daily intake of Carbohydrate is: " + nutriSurveyData.result.records[i].mean;
      }
    }
  }
  
  }
   export {
    getFood,
    setSearchText,
    addFood,
    getIntakeData,
    getMonthData,
    getDayData,
    getRecommended
                          
};