import * as React from 'react';
import { Text, View, StyleSheet,TextInput,TouchableOpacity,Alert,PixelRatio,ScrollView,StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
//import FloatLabelTextInput from 'react-native-floating-label-text-input';
import { Dropdown } from 'react-native-material-dropdown';
import SearchableDropdown from 'react-native-searchable-dropdown';


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
      <View style={{ paddingTop: 20,position:'relative',
    margintop:10, }}>
        <Text style={labelStyle}>
          {label}
        </Text>
        <TextInput
          {...props}
          style={{ height: 40, fontSize: 15,  borderBottomWidth:1/ PixelRatio.get(), width:"100%", borderBottomColor:'#1687B7' , }}
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
    companyname: '',
    companytype: '',
    city:'',
   address:'', 
    state:'',
    country:'',
    others:'',
cityLabel:'',
serverData: [],
othercity:'',
    }
  }

isValid() {
    const { companyname,  companytype, cityLabel,address, state} = this.state;
    let valid= false;
    
    if (companyname.length!='' &&  companytype.length!='' &&  cityLabel.length!=''&& address.length!=0 &&  state.length!=''  ) {
      valid=true;
    }
        if (companyname.length === 0) {
      alert("please enter companyname");
    } 
    else if(companytype.length==0){
        alert('select companytype');
    }
    else if(address.length==0){
        alert('enter address');
    }

 else if((cityLabel.length==0)){
        alert('select city');
    }
    
 else if(( state.length==0)){
        alert('select state');
    }

   return valid;
  }

onNext = () =>{
  if(this.isValid()){
 fetch('http://115.98.3.215:90/jobsearch/login/reg1.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
     companyname:this.state.companyname,
       companytype: this.state.companytype,
    city: this.state.cityLabel,
      address: this.state.address,
      state: this.state.state,
         country: this.state.country,
       othercity:this.state.othercity,
       
      })
 
      }).then((response) => response.json())
          .then((responseJson) => {
 
          if(responseJson === 'Posted Successfully')
        {

           this.props.navigation.navigate('Reg2',{ address:this.state.address });
        }
        else{
          Alert.alert(responseJson);
        }
 
          }).catch((error) => {
            console.error(error);
          });
 }
}


handleTextChange = (newText) => this.setState({ value: newText });
  render() {
let data1 = [{value: 'india',}];
let data2= [{value: 'Andhrapradesh'}, {value: 'Arunachalpradesh'},{value: 'Assam'},{value: 'Bihar'},{value: 'Chhattisgarh '},{value: 'Goa'},{value: 'Gujarat'},{value: 'Haryana'},{value: 'Himachal Pradesh'},{value: 'Jammu and Kashmir'},{value: 'Jharkhand'},{value: 'Karnataka'},{value: 'Kerala'},{value: 'Madhya Pradesh '},{value: 'Maharashtra'},{value: ' Manipur '},{value: ' Meghalaya'},{value: ' Mizoram '},{value: 'Nagaland'},{value: 'Odisha'},{value: 'Punjab '},{value: 'Rajasthan'},{value: 'Sikkim '},{value: 'Tamil Nadu '},{value: 'Telangana '},{value: 'Tripura'},{value: 'Uttar Pradesh '},{value: 'Uttarakhand'},{value: 'West Bengal'},];

 let data3= [{value: 'Delhi',}, {value: 'Ahmedabad',},{value: 'Kolkata',},{value: 'Surat',},{value: 'mumbai',},{value: 'Pune',},{value: 'Hyderabad',},{value: 'Vishakapatnam',},{value: 'Bengaluru',},{value: 'Chennai',},{value: 'Srikakulam',},{value: 'others',}]; 
let data4 = [{value: 'IT-software',},{value: 'Automobile',},{value: 'Bankin and Fincial Services',},{value: 'Internet and Ecommerce',},{value: 'Acounting and Finance  ',},{value: 'Electronics',},{value: 'FMCG,Foods',},{value: 'Telcom',},{value: 'Pharma and clinical Rearch',},{value: 'Media,entertainment and Internet',},{value: 'Bpo',},{value: 'Teaching',},{value: 'Real Estate',}];

    
    return (
      <View style={styles.container}>
<LinearGradient colors={['#0C5C80', '#1687B7']} style={styles.linearGradient}>
</LinearGradient>
<View style={{  backgroundColor: '#FFFFFF',marginTop:'20%',elevation:7, width:'90%', height:'85%',
       borderRadius:20,BorderColor:'#000',marginLeft:'5%',}}>
<ScrollView>
      <View  style={{position:'relative', width:'80%',
      height:45,marginLeft:'10%',marginTop:'10%', }}>

<StatusBar hidden />
       <FloatingLabelInput  
       label="Company Name:"
        onChangeText={(companyname) => this.setState({companyname})}
        value={this.state.companyname}
      />
       </View> 
<View  style={{position:'relative',
      width:"80%",left:'10%',padding:5,}}>
     
 <Dropdown 
       label='select company type'    
       data={data4}  
       //value='select one' 
       baseColor='#1687B7'  
       onChangeText={(companytype) => this.setState({companytype})}
      />

       </View> 
<View  style={{
        width:'80%', height:45,marginLeft:'10%',padding:5}}>

     <StatusBar hidden />

       <FloatingLabelInput 
        label="Address:"
        onChangeText={(address) => this.setState({address})}
        value={this.state.address}
      />
       </View> 
 <View  style={{ 
      width:"80%",left:'10%'}}>
    {this.state.cityLabel == 'others'?

 <View>
  <TextInput  style={{height: 50,width:"90%",borderBottomWidth: 1/ PixelRatio.get(), position:'relative',left:'4%',top:'4%', }}
          
           
          
          // Adding hint in Text Input using Place holder.
          placeholder="please enter city"
 
          onChangeText={othercity=>  this.setState({othercity})}
     
          value={this.state.othercity}
          // Making the Under line Transparent.
          />
      </View>
      
:

     <View style={{padding:5}}>
       <Dropdown 
       label='select city'
       baseColor='#1687B7'    
       data={data3}  
      value={this.state.cityLabel}     
       onChangeText={  cityLabel=> this.setState({ cityLabel: cityLabel})}
      />
        </View>
   
}

 </View>
<View  style={{
      width:"80%",left:'10%',padding:5,}}>
      
<Dropdown 
       label='select state'    
       data={data2}  
       //value='select one'
        baseColor='#1687B7'      
       onChangeText={(state) => this.setState({state})}
      />
       </View> 

       <TouchableOpacity  style={[styles.buttonContainer1, ]} 
            onPress={this.onNext.bind(this)}>
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

