import React, { Component } from "react";

import { SafeAreaView, TextInput, View, Text, Button } from "react-native";

import styles from "../constants/styles";
export default class ChatScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("name", null),
    };
  };

  constructor(props) {
    super(props);
  }

state = {
    textMessage : ""
}

sendMessage = async()=>{
    if(this.state.textMessage.length> 0){
        let msgID = firebase.database().ref("messages").
        child(User.phone).child(this.state.)
    }
} 


  handleChange = (key)=> (val) =>{
this.setState({
    [key] : val
})
  }
  render() {
    return (
      <View>
        <TextInput
          onChangeText={this.handleChange("textMessage")}
          style={styles.input}
          value={this.state.textMessage}
          placeholder ="Type Message..."
        ></TextInput>

        <Button title ="send">

        </Button>
      </View>
    );
  }
}
