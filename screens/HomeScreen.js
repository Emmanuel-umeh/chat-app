import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { Button, Text, TouchableOpacity, View } from 'react-native'
import User from '../user'
import Styles from "../constants/styles"
export default class HomeScreen extends Component {
    constructor(props){
        super(props)
    }

    logout = async()=>{
        console.log("logging out!!")
        await AsyncStorage.clear()
        User.name =  null
        User.phone = null
        this.props.navigation.replace("Login")

    }

    componentDidMount(){
        let dbRef = firebase.database().ref("users")
        dbRef.on('child_added', val =>{
            let person = val.val();
            person.phone = val.key
            this.setState((prevState) =>{
                return {
                    users : [...prevState.users, person]
                }
            })
        })
    }




    render() {
        return (
            <View style ={Styles.container}>
                <Text>Welcome {User.phone}</Text>

       <Button title = "Logout" onPress = {this.logout}>

       </Button>
            </View>
        )
    }
}
