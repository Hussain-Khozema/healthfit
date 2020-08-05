import {StyleSheet, Dimensions } from 'react-native';
const { width: WIDTH } = Dimensions.get('window')
const styles = StyleSheet.create({
    logoContainer: {
        alignItems: 'center',
        marginBottom: 10
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    logo: {
        width: 120,
        height: 120
    },
    input: {
        width: WIDTH - 55,
        height: 50,
        borderRadius: 5,
        fontSize: 16,
        paddingLeft: 20,
        backgroundColor: 'rgba(0,0,0,0.01)',
        borderColor: 'grey',
        borderWidth: 1,
        color: 'black',
        marginHorizontal: 25,
        justifyContent: 'center',
    },
    inputContainer: {
        marginTop: 20
    },
    btnLogin: {
        width: WIDTH - 55,
        height: 50,
        borderRadius: 5,
        fontSize: 16,
        backgroundColor: '#616161',
        justifyContent: 'center',
        marginTop: 20
    },
    btnRegister: {
        width: WIDTH - 55,
        height: 50,
        borderRadius: 5,
        fontSize: 16,
        backgroundColor: '#9E9E9E',
        justifyContent: 'center',
        marginTop: 10
    },
    btnBack: {
        width: WIDTH - 55,
        height: 50,
        borderRadius: 5,
        fontSize: 16,
        backgroundColor: '#616161',
        justifyContent: 'center',
        marginTop: 10
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    dateText: {
        fontSize: 16,
    },
    forgetPassword: {
        fontSize: 12 ,  textAlign: 'right' , width: WIDTH , marginRight: 55
    },
    picker: {
        width: WIDTH - 55,
        height: 50,
        borderColor: 'black',
        borderWidth: 1,
    },
    infoText:{ fontSize:18 ,borderBottomColor:'gray' , borderBottomWidth:1 ,marginTop:3},
    infoTop:{fontSize:18 ,marginTop:10 , color:'#424242'},
    edittext:{fontSize:20, textAlign: "center", color:'white'}
});

export {styles ,WIDTH}