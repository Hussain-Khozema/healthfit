import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)
async function register(email, password, confirmPassword, navigation) {
    if(!ValidateEmail(email))
    {
        return;
    }
    else if(email.length <5 || password.length <6){
        alert("password must have at least 6 characters");
        return;
    }
    else if(confirmPassword != password)
    {
        alert("password does not match");
        return
    }
    try {
        await auth().createUserWithEmailAndPassword(email, password);
        navigation.navigate('SetUpProfileScreen')
    } catch (e) {
     alert(e.message);
    }
  }

  function ValidateEmail(mail)
  {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
      return (true)
  }
      alert("You have entered an invalid email address!")
      return (false)
  }
  async function signOut(navigation) {
    try {
        await auth().signOut();
        navigation.navigate('Logout' ,{screen:'LoginScreen'});
    } catch (e) {
     alert(e.message);
    }
  }

  async function editProfile(name,birthdate,gender,weight,height ,activityLevel, navigation) {
    try {
      await firestore().collection('users').doc(auth().currentUser.uid).set({
        name: name,
        birthdate: birthdate,
        gender: gender,
        weight: weight,
        height: height,
        activityLevel:activityLevel
      });
      navigation.navigate('View Profile', { screen: 'ProfilePage' })
  } catch (e) {
   alert(e.message);
  }
  }
  
async function signIn(email, password , _this) {
    if(!ValidateEmail(email))
    {
        return;
    }
    else if(email.length <5 || password.length <6){
        alert("password must have at least 6 characters");
        return;
    }
    try {
        await auth().signInWithEmailAndPassword(email, password);
        _this.setState({email:'',password:''} );
        _this.props.navigation.navigate('View Carbs Chart', { screen: 'CarbsChart' });
    } catch (e) {
     alert("Incorrect username or password");
    }
  }
  async function setProfile(name,birthdate,gender,weight,height ,activityLevel, navigation) {
    try {
      await firestore().collection('users').doc(auth().currentUser.uid).set({
        name: name,
        birthdate: birthdate,
        gender: gender,
        weight: weight,
        height: height,
        activityLevel:activityLevel
      });
      navigation.navigate('View Calorie Chart', { screen: 'CalorieChart' });
  } catch (e) {
   alert(e.message);
  }
  }
  export {
      register,
      signOut,
      editProfile,
      signIn,
      setProfile,
      getAge
                            
};