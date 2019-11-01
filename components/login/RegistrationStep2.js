import * as React from 'react';
import { Text, View, StyleSheet,TextInput,TouchableOpacity,Alert,ScrollView,StatusBar,PixelRatio } from 'react-native';
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
      companyphone: '',
     alternativephone: '',
     employees:'',
    companywebsite:'',
    address:this.props.navigation.state.params.address,
    }
  }
isValid() {
    const { companyphone, alternativephone, employees,companywebsite} = this.state;
    let valid= false;
if (companyphone.length!='' &&  alternativephone.length!='' && employees.length!=''&& companywebsite.length!='' ) {
      valid=true;
    }
    
   if (companyphone.length === 0) {
      alert("please fill the phone number");
    } 
    else if(isNaN(companyphone)){
        alert('please put 10 digit phone number');
    }
    else if(companyphone.length !=10){
      alert('please check the phone number');
    }
 else if(alternativephone.length==0){
        alert('please fill the alternative phone number');
    }
      else if(isNaN(alternativephone)){
        alert('please put 10 digit phone number');
    }
 else if(alternativephone.length !=10){
      alert('please check the phone number');
    }
    
    else if(employees.length==0){
        alert('enter no.of employees');
    }

   else if((companywebsite.length==0)){
        alert('enter company website');
    }
     if (companyphone.length==10 &&  alternativephone.length==10 &&  employees.length!=''&& companywebsite.length!=0 ) {
      valid=true;
    }
 

   return valid;
  }

onNext = () =>{
 if(this.isValid()){

 fetch('http://115.98.3.215:90/jobsearch/login/reg2.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
     companyphone:this.state.companyphone,
      alternativephone: this.state.alternativephone,
     employees: this.state.employees,
      companywebsite: this.state.companywebsite,
     address:this.state.address,
       
      })
 
      }).then((response) => response.json())
          .then((responseJson) => {
 
          if(responseJson === 'Posted Successfully')
        {

          this.props.navigation.navigate('Reg3',{address:this.state.address});
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
      
<ScrollView>
      <View  style={{position:'relative',marginTop:'10%', height:45,width:'80%',
       marginLeft:'10%',borderBottomWidth:1, borderBottomColor:'#1687B7' ,}}>
<StatusBar hidden />
       <FloatingLabelInput 
        label="Company Phone no:"
        onChangeText={(companyphone) => this.setState({companyphone})}
        value={this.state.companyphone}
      />
      </View> 

      <View  style={{position:'relative',marginTop:'10%',
       marginLeft:'10%',height:45,width:'80%',borderBottomWidth:1, borderBottomColor:'#1687B7'}}>
     <StatusBar hidden />
       <FloatingLabelInput 
        label=" Alternative phone no:"
      onChangeText={(alternativephone) => this.setState({alternativephone})}
        value={this.state.alternativephone}
      />
       </View> 

<View  style={{position:'relative',marginTop:'10%',borderBottomWidth:1,borderBottomColor:'#1687B7' , 
       height:45,width:'80%',marginLeft:'10%',}}>
       <StatusBar hidden />
       <FloatingLabelInput 
        label="No.of Employees:"
        onChangeText={(employees) => this.setState({employees})}
        value={this.state.employees}
      />
       </View> 
      
<View  style={{position:'relative',marginTop:'10%',borderBottomWidth:1,borderBottomColor:'#1687B7' , 
       marginLeft:'10%',height:45,width:'80%',}}>
      <StatusBar hidden />
       <FloatingLabelInput 
        label="Company Website:"
       onChangeText={(companywebsite) => this.setState({companywebsite})}
        value={this.state.companywebsite}
      />
       </View> 
       <TouchableOpacity  style={[styles.buttonContainer1, ]} 
         onPress={this.onNext.bind(this)} >
            <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
</ScrollView>
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
    height:45,
  position:'relative',
    marginTop:'10%',
    marginLeft:'80%',
    width:'60%',
   
  },
   nextText: {
    color: '#1687B7',
    fontSize:20,
  },
  
});

