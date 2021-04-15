import React, { Component } from "react";

import { SafeAreaView, TextInput, View, Text, Button } from "react-native";

import styles from "../constants/styles";
import User from "../user";
export default class ChatScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("name", null),
    };
  };

  constructor(props) {

    super(props);

    this.state = {
        textMessage : "",

        person: {
            name : this.props.navigation.getParam('name'),
            phone : this.props.navigation.getParam('phone')
        }

    }
    
  }


sendMessage = async()=>{
    if(this.state.textMessage.length> 0){
        let msgID = firebase.database().ref("messages").
        child(User.phone).child(this.state.person.phone).push()
        .key

        let updates = {}
        let message ={
            message : this.state.textMessage,
            time : firebase.database.ServerValue.TIMESTAMP,
            from : User.phone
        }

        updates['messages/' + User.phone + '/' +this.state.person.phone +'/' + msgID]
        =
        updates['messages/' + this.state.person.phone + '/' +User.phone +'/' + msgID]
       = 
       firebase.database().ref().update();
       this.setState({
           textMessage : ''
       })

    }
} 


  handleChange = (key)=> (val) =>{
this.setState({
    [key] : val
})
  }
  render() {

    console.log(this.props.navigation.getParam('name'))
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
