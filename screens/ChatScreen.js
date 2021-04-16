import React, { Component } from "react";

import { SafeAreaView, TextInput, View, Text, Button, FlatList, Dimensions } from "react-native";

import styles from "../constants/styles";
import User from "../user";
import firebase from "firebase"
export default class ChatScreen extends Component {

  constructor(props) {
  
    super(props);

    
    

    this.state = {
        textMessage : "",
        messageList : [],

        person: {
            name : this.props.route.params.item.name,
            phone : this.props.route.params.item.phone
        }

    }


    
  }


  convertTime = (time)=>{

    let d = new Date(time);
    let c = new Date();
    let result = (d.getHours()<10 ? "0" : '') + d.getHours() + ':'
    result += (d.getMinutes()< 10 ? "0" : '' ) + d.getMinutes();
    if(c.getDay() !== d.getDay())
  }

  static navigationOptions = ( props) => {
    return {
      title: props.route.params.item.name
    };
  };

  componentDidMount(){
    firebase.database().ref('messages').child(User.phone).child(this.state.person.phone)
    .on('child_added', (val)=>{
      this.setState((prevState)=>{
        return{
          messageList : [...prevState.messageList, val.val()]
        }
      })
    })
  }

sendMessage = async()=>{
    if(this.state.textMessage.length> 0){

      let message ={
        message : this.state.textMessage,
        time : firebase.database.ServerValue.TIMESTAMP,
        from : User.phone
    }
        let msgID = firebase.database().ref("messages").
        child(User.phone).child(this.state.person.phone).push(message)
        .key

        console.log({msgID})
        let updates = {}
    

        updates['messages/'+User.phone+'/'+this.state.person.phone+'/'+msgID]
        =
        updates['messages/'+this.state.person.phone+'/'+User.phone+'/'+msgID]
       = 
       firebase.database().ref().update(updates);
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

  renderItem = ({item})=>{
    return(
      <View
      style = {{
        flexDirection : "row",
        width : "100%",
        alignItems : item.from === User.phone ? "flex-end" : "flex-start",
        backgroundColor :  item.from === User.phone ? "#00897b" : "#7cb342",
        borderRadius : 5,
        marginBottom : 10
      }}
      >
        <Text style = {{color : "#fff", padding : 2, fontSize : 16}}>
        {item.message}
        </Text>
        <Text style= {{color : '#eee', padding : 3, fontSize : 12 }}>
{item.time}
        </Text>
        

      </View>
    )
  }
  render() {

    // console.log(this.state)
    let {height, width} = Dimensions.get("window");
    return (
      <SafeAreaView>

        <FlatList
        style = {{
          padding : 10,
          height : height * 0.8

        }}
        
        data = {this.state.messageList}
        renderItem = {this.renderItem}
        keyExtractor = {(item, index) => index.toString()}
        
        />
        <TextInput
          onChangeText={this.handleChange("textMessage")}
          style={styles.input}
          value={this.state.textMessage}
          placeholder ="Type Message..."
        ></TextInput>

        <Button title ="send" onPress = {this.sendMessage}>

        </Button>
      </SafeAreaView>
    );
  }
}
