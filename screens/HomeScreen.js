import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export default class HomeScreen extends Component {
    render() {
        return (
            <View>
                <Text>Home Screen</Text>

                <TouchableOpacity onPress ={this.logout}>

                </TouchableOpacity>
            </View>
        )
    }
}
