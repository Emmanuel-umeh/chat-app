import React, { Component } from 'react'

import { SafeAreaView, TextInput, View, Text } from 'react-native'

import styles from "../constants/styles"
export default class ChatScreen extends Component {
    
    static navigationOptions =({navigation})=>{
        return{
            title : navigation.getParam("name", null)
        }
    }

    constructor(props){
        super(props)
    }
    render() {
        return (
            <View>
                <Text>
                    Chat Screen with {this.props.route.params.item.name}
                </Text>
                
            </View>
        )
    }
}
