import React, { Component } from 'react';
import { Alert, Button, Text, TextInput, Keyboard, View, StyleSheet,TouchableOpacity,KeyboardAvoidingView,Dimensions,ScrollView,StatusBar } from 'react-native';

import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';
const { width, height } = Dimensions.get('window');
class FloatingLabelInput extends Component {
  state = {
    isFocused: false,
    isBlur:false,
  };

  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => {
     const { label, ...props } = this.props;
    if(this.props.value==""){
      this.setState({ isFocused: false });
    }
    
  }

  render() {
    const { label, ...props } = this.props;
    const { isFocused } = this.state;

    const labelStyle = {
      position: 'absolute',
      left: 0,
      top: !isFocused ? 15 : 0,
      fontSize: !isFocused ?15 : 14,
      color: !isFocused ? '#8D8989' : '#1687B7',
   borderColor: !isFocused ?'#000' :'#1687B7',
    };
    return (
      <View style={{ paddingTop: 20,position:'relative',
    margintop:10, }}>
        <Text style={labelStyle}>
          {label}
        </Text>
        <TextInput
          {...props}
          style={{ height: 40, fontSize: 15,  borderBottomWidth: 1, width: 250, borderBottomColor:'#1687B7' , }}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          blurOnSubmit
        />
      </View>
    );
  }
}

export default class MyListUpdateScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    
      designation:this.props.navigation.state.params.designation,
      experience:this.props.navigation.state.params.experience,
      keyskills:this.props.navigation.state.params.keyskills,
      no_of_openings:this.props.navigation.state.params.no_of_openings,
      date_of_interview:this.props.navigation.state.params.date_of_interview,
      qualification:this.props.navigation.state.params.qualification,
      username:this.props.navigation.state.params.username,
      salary:this.props.navigation.state.params.salary,
      sno:this.props.navigation.state.params.sno,
    }
  }


isValid() {
    const { designation,experience,keyskills,no_of_openings,date_of_interview,qualification,username,salary} = this.state;
    let valid= false;
    
    if (designation.length!='' &&  experience.length!='' &&  keyskills.length!=''&& no_of_openings.length!=0 &&  date_of_interview.length!=''&&  qualification.length!=''&&  username.length!=''&& salary.length!=''  ) {
      valid=true;
    }
        if (designation.length === 0) {
      alert("please enter designation");
    } 
    else if( experience.length==0){
        alert('please enter experience');
    }
    else if(keyskills.length==0){
        alert('please enter skills');
    }

 else if((no_of_openings.length==0)){
        alert('please enter no.of openings');
    }
    
 else if((date_of_interview.length==0)){
        alert('please enter interview date');
    }
else if((qualification.length==0)){
        alert('please enter qulification');
    }
else if((username.length==0)){
        alert('enter username');
    }
else if((salary.length==0)){
        alert('please enter the salary');
    }

   return valid;
  }
 componentDidMount = () => AsyncStorage.getItem('username').then((value) => this.setState({ 'username': value }))
 
 /* isValid() {
    const { name, username, email,  permanat_address, password ,repassword} = this.state;
    let valid= false;
    
    if (name.length>0 && username.length>0 &&  email.length>0  && permanat_address.length>0 && password.length>0 && password==repassword) {
      valid=true;
    }
        if (name.length === 0) {
      alert("Enter name");
    } else if(!isNaN(name)){
      alert("Please Enter Only Characters");

    }else if(name.length<3 || name.length>15){
      alert("Username must be 3 to 15 Characters");
    }  
    else if(username.length==0){
        alert('please put 10 digit username number');
    }
    else if(username.length !=10){
      alert('please check the username number');
    }
    else if((email.length==0)){
        alert('please put @ in your email');
    }
 else if((email.length==0)){
        alert('please put @ in your email');
    }
 
    else if((permanat_address.length==0)){
        alert('please enter current adress');
    }
    else if((password.length==0)){
      alert('please fill the password');
    }
    else if((repassword.length==0))
    {
      alert('please fill the re-password');
    }
    else if((password != repassword )){
      alert('password and repassword mismatch');
    } 
      return valid;
  }
*/
onRegister = () =>{
  if (this.isValid()) {

  NetInfo.fetch().then(state => {
                console.log("Connection type", state.type);
                console.log(state);
                console.log("Is connected?", state.isConnected);
            
              // NetInfo.getConnectionInfo().then((connectionInfo) => {
      
            //console.log(connectionInfo);
      
                if (state.type=="none") {
      
                  console.log(state.type);
      
                  Snackbar.show({
                    title: 'No Internet Connection',
                    backgroundColor: 'black',
                    duration: Snackbar.LENGTH_LONG,
                  });
        
                }
 else{

      fetch('http://115.98.3.215:90/jobsearch/seller/updatelist.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      username:this.state.username,
      designation: this.state.designation,
      experience: this.state.experience,
      keyskills: this.state.keyskills,
      no_of_openings: this.state.no_of_openings,
      date_of_interview: this.state.date_of_interview,
      qualification:this.state.qualification,
      salary:this.state.salary,
      sno:this.state.sno,
      })
 
      }).then((response) => response.json())
          .then((responseJson) => {
 
          if(responseJson === 'Posted Successfully')
        {

           Alert.alert(responseJson);
        }
        else{
          Alert.alert(responseJson);
        }
 
          }).catch((error) => {
            console.error(error);
          });
 }
});
}
}

  render() {
    return (

        <View style={styles.container}>
    <StatusBar hidden />
        <FloatingLabelInput
          label="Designation"
          value={this.state.designation}
          onChangeText={(designation) => this.setState({ designation})}
          style={styles.input}
        />
       <StatusBar hidden />
        <FloatingLabelInput
          label='experience'
          value={this.state.experience}
          onChangeText={(experience) => this.setState({experience})}
          style={styles.input}
        />
        <StatusBar hidden />
        <FloatingLabelInput
          label='keyskills'
          value={this.state.keyskills}
          onChangeText={(keyskills) => this.setState({keyskills})}
          style={styles.input}
        />
          
       <StatusBar hidden />
        <FloatingLabelInput
          label='no_of_openings'
          value={this.state.no_of_openings}
          onChangeText={(no_of_openings) => this.setState({no_of_openings})}
          style={styles.input}
        />
        <StatusBar hidden />
        <FloatingLabelInput
          label='date_of_interview'
          value={this.state.date_of_interview}
          onChangeText={(date_of_interview) => this.setState({date_of_interview})}
          style={styles.input}
        />
       <StatusBar hidden />
        <FloatingLabelInput
          label='qualification'
          value={this.state.qualification}
          onChangeText={(qualification) => this.setState({qualification})}
          style={styles.input}
        />

        <StatusBar hidden />
        <FloatingLabelInput
          label='salary'
          value={this.state.salary}
          onChangeText={(salary) => this.setState({salary})}
          style={styles.input}
        />

         <TouchableOpacity style={[styles.buttonContainer, styles.registerButton]}  
          onPress={this.onRegister.bind(this)}>
          <Text style={styles.registerText}>Post</Text>
        </TouchableOpacity>
      
         
        
      </View>

    );
  }
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    //justifyContent: 'center',
    backgroundColor: '#fff',
   // padding: 8,
 alignItems: 'center', 
justifyContent: 'center',
  },
  input: {
    width:'70%',
    height: 44,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#1687B7",
    marginTop: 15,
     //marginLeft:'10%',
position:'relative',
    top:20,
  },

 buttonContainer: {
    height:40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
 position:'relative',
    top:'8%',
    marginLeft:'5%',
    width:'40%',
    borderRadius:10,
  },
  registerButton: {
    backgroundColor: "#1687B7",
  },
  registerText: {
    color: 'white',
    fontSize:20,
  }
  
});


