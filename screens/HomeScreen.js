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
        await AsyncStorage.clear()
        User.name =  null
        User.phone = null
        this.props.navigation.navigate("Home")

    }




    render() {
        return (
            <View style ={Styles.container}>
                <Text>Welcome {User.phone}</Text>

       <Button title = "Logout">

       </Button>
            </View>
        )
    }
}
