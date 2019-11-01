import React from 'react';
import { Button, View, Text,TextInput,StyleSheet,Alert,ScrollView,ListView,ActivityIndicator,TouchableOpacity,Image,Dimensions } from 'react-native';
//import { Entypo, Ionicons } from 'react-native-vector-icons';
import Entypo from "react-native-vector-icons/Entypo";
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import Snackbar from 'react-native-snackbar';

const { width, height } = Dimensions.get('window');
export default class SignScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
       showPass:true,
      press:false,
    }
  }
  showPass = () => {
    if(this.state.press== false){
      this.setState({showPass:false,press:true,})
    }
    else{
      this.setState({showPass:true,press:false,})
    }
  }
 isValid() {
    const { username, password } = this.state;
    let valid= false;

    if (username.length>0 && password.length>0) {
      valid=true;
    }
    if(username.length=== 0) {
      alert('please fill the username');}

    else if(password.length===0){
      alert('please fill the password');
    }
      return valid; 
  }

UserLoginFunction = () =>{
  if(this.isValid())
{
    
 
 const { username}  = this.state ;
 const { password }  = this.state ;


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
fetch('http://115.98.3.215:90/jobsearch/login/Login.php', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
 
    username: username,
 
    password: password
 
  })
 
}).then((response) => response.json())
      .then((responseJson) => {

       if(responseJson === 'Data Matched')
        {

          this._signInAsync();
           // this.props.navigation.navigate('Menu', { username: username });
           //alert("Instructions\n1)you can sell your land through our App\n2)You should have details of plot no,city,state,country\n3)Adjust the marker on map ,exact to that location\n4)your details will be verifed");
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
<LinearGradient colors={['#0C5C80', '#1687B7']} style={styles.linearGradient}>
 <Text style={{fontSize:40,position:'relative',top:'20%',color: "#fff", marginLeft:'35%',}}>Login</Text>
</LinearGradient>
<View style={{ flex:0.8, backgroundColor: '#FFFFFF',marginTop:'10%',elevation:7, width:'90%',
       borderRadius:20,borderBottomColor: '#1687B7',}}>

   <View style={styles.inputContainer}>
<Entypo name={'user'} size={30}  color="#1687B7"/>
        <TextInput style={styles.inputs}
           placeholder="Enter username"
 
          onChangeText={username => this.setState({username})}
 
          underlineColorAndroid='transparent'
 
       
        />
    </View>
      <View style={styles.inputContainer}>
<Entypo name={'lock'} size={30}  color="#1687B7" />
        <TextInput style={styles.inputs}
          
          // Adding hint in Text Input using Place holder.
          placeholder="Enter User Password"
 
          onChangeText={password => this.setState({password})}
 
          // Making the Under line Transparent.
          underlineColorAndroid='transparent'
 
       secureTextEntry={this.state.showPass}
        />
        <TouchableOpacity style={styles.eyeIcon} 
          onPress={this.showPass.bind(this)}>
               <Entypo 
               name={this.state.press== false?'eye-with-line':'eye'}
               size={22} color="black" />
          </TouchableOpacity>
          </View>
  <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}  
         onPress={this.UserLoginFunction} color="#2196F3" >
          <Text style={styles.loginText}>Login</Text>

        </TouchableOpacity>
     
       
          <TouchableOpacity  style={[styles.buttonContainer1,styles.RegButton ]} 
         onPress={() => this.props.navigation.navigate('Reg1')}>
            <Text style={styles.RegText}>Register</Text>
        </TouchableOpacity>   

   </View>      
</View>
            
    );
  }

  _signInAsync = async () => {
    const { username }  = this.state ;
    await AsyncStorage.setItem('isLoggedIn', '1');
    await AsyncStorage.setItem('username', username);
    this.props.navigation.navigate('Menu', { username: username });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
 backgroundColor:'white',
 
  },

  inputContainer: {
      backgroundColor: '#FFFFFF',
      //borderRadius:10,
      borderBottomWidth: 1,
      width:'70%',
      height:45,
       //alignItems: 'center',
      marginBottom:10,
      marginLeft:50,
      flexDirection: 'row',
      alignItems:'center',
       marginTop:'10%',
borderBottomColor: '#1687B7' 
  },
 linearGradient: {
    position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: "35%",
  },
inputs:{
      height:45,
      marginLeft:12,
      //border: '#090202',
      flex:1,
  },
  
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:'18%',
    width:'30%',
    borderRadius:10,
    top:10, 
 position:'relative', 
    elevation:10,
  shadowColor: '#000000',
  shadowRadius: 10,
  },
loginButton: {
    backgroundColor: "#fff",
  },
  loginText: {
    color: 'black',
    fontSize:20,
  },
  buttonContainer1: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:'60%',
    width:'30%',
    position:'relative',
    top:-35,
    borderRadius:10,
 elevation:10,
  shadowColor: '#000000',
  shadowRadius: 10,
  },
  RegButton: {
    backgroundColor: "#1687B7",
  },
  RegText: {
    color: 'white',
    fontSize:20,
  },
   

  
});
