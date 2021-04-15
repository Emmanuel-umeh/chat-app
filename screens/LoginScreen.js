import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import User from '../user'
import styles from "../constants/styles"
import firebase from "firebase"
export default class LoginScreen extends Component{

  constructor(props){
    super(props)
  }


state = {
  phone : "",
  name : ''
}




handleChange =key => val =>{  
  this.setState({
    [key] : val
  })
}

  submitForm = async ()=>{
    if(this.state.phone.length < 10){
      Alert.alert("Error", "Wrong number provided")
    }
    else if(this.state.name.length<3){
      Alert.alert("Error", "Name is too short")
    }else{

      await AsyncStorage.setItem("userPhone", this.state.phone)
    //   console.log("saved the phone number ", this.state.phone)
    User.phone = this.state.phone
   
   await  firebase.database().ref("users/"+User.phone).set({
      name : this.state.name
    })

    this.props.navigation.replace("Home")
    }
  }

  render(){
    return (
      <View  style={styles.container}>
      <TextInput 
      placeholder = "Phone Number"
      style = {styles.input}
      value = {this.state.phone} 
      onChangeText ={this.handleChange('phone')}     />

      <TextInput 
      
      placeholder = "Name"
      style = {styles.input}
      value = {this.state.name}
      onChangeText = {this.handleChange('name')}
      
      />

      <Button title =  "Enter" onPress = {this.submitForm}></Button>
      </View>
    );
  }

}
