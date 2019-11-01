import * as React from 'react';
import { Text, View, StyleSheet,TextInput,TouchableOpacity,Alert,ScrollView,StatusBar,PixelRatio} from 'react-native';
//import FloatLabelTextInput from 'react-native-floating-label-text-input';
 import LinearGradient from 'react-native-linear-gradient';

class FloatingLabelInput extends React.Component {
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
   //borderColor: !isFocused ?'#000' :'#1687B7',
    };
    return (
      <View style={{ paddingTop: 10,position:'relative',
    margintop:10, }}>
        <Text style={labelStyle}>
          {label}
        </Text>
        <TextInput
          {...props}
          style={{ height: 40, fontSize: 15, }}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          blurOnSubmit
        />
      </View>
    );
  }
}
export default class App extends React.Component {
constructor(props) {
    super(props)
    this.state = {
     username: '',
    password: '',
    email:'',
    repassword:'',
    address:this.props.navigation.state.params.address,
    }
  }


isValid() {
    const {  username,password, email,repassword} = this.state;
    let valid= false;
    
    if ( username.length!='' && password.length!='' && email.length!=''&& password==repassword) {
      valid=true;
    }
        if (username.length === 0) {
      alert("please enter username");
    } 
    else if( password.length==0){
        alert('please enter password');
    }
    else if(email.length==0){
        alert('please enter @ email');
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
onMarkonmap = () => {

 if(this.isValid()){

 fetch('http://115.98.3.215:90/jobsearch/login/reg3.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      username:this.state.username,
      password: this.state.password,
      email: this.state.email,  
   address:this.state.address,
    repassword:this.state.repassword,
      })
 
      }).then((response) => response.json())
          .then((responseJson) => {

          if(responseJson === 'Posted Successfully')
        {
           this.props.navigation.navigate('MarkOnMap',{ address:this.state.address, username:this.state.username});
        }
        else{
           Alert.alert(responseJson);
             }
          }).catch((error) => {
            console.error(error);
          });
 }
}

render() {
    return (
      <View style={styles.container}>
<LinearGradient colors={['#0C5C80', '#1687B7']} style={styles.linearGradient}>
</LinearGradient>
<View style={{  backgroundColor: '#FFFFFF',marginTop:'20%',elevation:7, width:'90%',height:'85%',
       borderRadius:20,BorderColor:'#000',marginLeft:'5%',}}>
       

      <View  style={{position:'relative',marginTop:'10%', borderBottomColor: '#1687B7',
       borderBottomWidth: 1,height:45,width:'80%',marginLeft:'10%',}}>
      <StatusBar hidden />
       <FloatingLabelInput 
        label="Username"
        onChangeText={(username) => this.setState({username})}
        value={this.state.username}
      />
       </View> 
<View  style={{position:'relative',marginTop:'10%', borderBottomColor: '#1687B7',
       borderBottomWidth: 1,height:45,width:'80%',marginLeft:'10%',}}>
      <StatusBar hidden />
       <FloatingLabelInput 
        label="password"
         secureTextEntry={true}
        onChangeText={(password) => this.setState({password})}
        value={this.state.password}
      />
       </View> 
<View  style={{position:'relative',marginTop:'10%', borderBottomColor: '#1687B7',
       borderBottomWidth: 1,height:45,width:'80%',marginLeft:'10%',}}>
       <StatusBar hidden />
       <FloatingLabelInput 
       label="enter email for receiving resume"
        onChangeText={(email) => this.setState({email})}
        value={this.state.email}
      />
       </View> 
<View  style={{position:'relative',marginTop:'10%', borderBottomColor: '#1687B7',
       borderBottomWidth: 1,height:45,width:'80%',marginLeft:'10%',}}>
       <StatusBar hidden />
       <FloatingLabelInput
          value={this.state.repassword}
          onChangeText={(repassword) => this.setState({ repassword })}
          label={'Re-password'}
          secureTextEntry={true}
          style={styles.input}
        />
 </View>
       <TouchableOpacity  style={[styles.buttonContainer1,styles.markButton ]} 
         onPress={this.onMarkonmap.bind(this)}>
            <Text style={styles.nextText}>Mark on Map</Text>
        </TouchableOpacity>



  </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 8,
  },
linearGradient: {
    position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: "35%",
  },
   buttonContainer1: {
    height:40,
justifyContent: 'center',
    alignItems: 'center',
  position:'relative',
    top:20,
    marginLeft:'25%',
    width:'50%',
borderRadius:10,
  },
markButton: {
    backgroundColor: "#1687B7",
  },
   nextText: {
    color: 'white',
    fontSize:20,

  },
  
});

