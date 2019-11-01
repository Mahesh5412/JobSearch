import * as React from 'react';

import { Picker, View, StyleSheet, Text,TextInput,ScrollView,TouchableOpacity,Alert,Image,PixelRatio,ImageBackground} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import SearchableDropdown from 'react-native-searchable-dropdown';

var items = [
 
  { id: 1, name: 'pune' },
  { id: 2, name: 'kolkata' },
  { id: 3, name: 'Delhi' },
  { id: 4, name: 'Ahmedabad' },
  { id: 5, name: 'Surat' },
  { id: 6, name: 'mumbai' },
  { id: 7, name: 'Hyderabad' },
  { id: 8, name: 'Bengaluru' },
  { id: 9, name: 'Chennai' },
  { id: 10, name: 'Srikakulam' },
   { id: 11, name: 'Vishakapatnam' },
];


export default class FilterScreen extends React.Component {
  state ={
    designation:"hr",
    city:'',
    experience:'',
     min_salary:'',
  }

  
 isValid() {
    const { designation,city,experience,min_salary} = this.state;
    let valid= false;

if (designation.length!='' && city.length!='' &&  experience.length!=''&& min_salary.length!=0  ) {
      valid=true;
    }
        if (designation.length === 0) {
      alert("select designation");
    } 
    else if(city.length==0){
        alert(' please select  city');
    }
    
 else if((experience.length==0)){
        alert('please enter experience');
    }
    
 else if(( min_salary.length==0)){
        alert('please enter min_salary');
    }
   return valid;
}



    
  onSortCityIn = () => {
if(this.isValid()) {

    const { designation,city,experience,min_salary }  = this.state ;
    this.props.navigation.navigate('FilterList',{
      city:city,
      designation:designation,
      experience:experience,
      min_salary:min_salary,
    }); 
}
  }

 priya(item){
    var text=JSON.stringify(item);
    var obj = JSON.parse(text);
   var  city1=obj.name;
   this.setState({city:city1})
   console.log(this.state.city);

  }


  render() {
    let data1 = [{value: 'hr',}, {value: 'desiner',}];
    let data2= [{value: 'Delhi',}, {value: 'Ahmedabad',},{value: 'Kolkata',},{value: 'Surat',},{value: 'mumbai',},{value: 'Pune',},{value: 'Hyderabad',},{value: 'Vishakapatnam',},{value: 'Bengaluru',},{value: 'Chennai',},{value: 'Srikakulam',},{value: 'others',}]; 

    return (
      <View style={styles.container}>
  <View style={{  backgroundColor: '#FFFFFF',marginTop:'5%',elevation:5, width:'90%', height:'85%',
       borderRadius:20,BorderColor:'#000',marginLeft:'5%',}}>
    
      <View style={{marginTop:8}}>
         <View  style={{height: 50,width:"90%", position:'relative',left:'5%',borderColor: '#1687B7', }}
   >
        <Dropdown 
       //label={this.state.saleLabel}     
       data={data1}  
baseColor='#1687B7'
       value={this.state.designation}      
       onChangeText={ designation => this.setState({ designation: designation})}
      />
        </View>
     <View   >
     <SearchableDropdown
          onTextChange={(text) => console.log(text)}
          //onTextChange={city => this.setState({ city: city})}
         // value={this.state.city}    
          onItemSelect={item => this.priya(item)}
          //onItemSelect called after the selection from the dropdown
          containerStyle={{ padding: 25 }}
          
          textInputStyle={{
            //inserted text style
            padding: 12,
            borderBottomWidth:1,
            borderColor: '#1687B7',
            backgroundColor: '#fff',
            borderRadius:10,
            height: 50,
            width:"115%",
          position:'relative',
           right:'8%',
          }}
          itemStyle={{
            //single dropdown item style
            padding: 10,
            marginTop: 2,
            backgroundColor: '#fff',
            borderColor: '#1687B7',
            borderBottomWidth:1,
            
          }}
          itemTextStyle={{
            //text style of a single dropdown item
            color: '#222',
          }}
          itemsContainerStyle={{
            //items container style you can pass maxHeight
            //to restrict the items dropdown hieght
            height: '50%',
            
          }} 
        
          placeholder={"----Select City-----"}
        
          resetValue={false}
          //reset textInput Value with true and false state
          underlineColorAndroid="transparent"
          items={items}
          //mapping of item array
          
          //To remove the underline from the android input
        />
       
        </View>
       
     < View  style={{marginTop:4}}>
<Text  style={{ position:'relative',left:'7%',top:'2%',color: '#1687B7'}}
          >Exp:</Text>
      <TextInput style={{height: 50,width:"40%",borderBottomWidth: 1, position:'relative',left:'4%',top:'2%',borderColor: '#1687B7',}}
          
          // Adding hint in Text Input using Place holder.
          placeholder="enter experience years"
          onChangeText={(experience) => this.setState({experience})}
          value={this.state.experience}
          keyboardType = 'numeric'
        
          />
          </View>
          < View  style={{marginTop:-58}}>
<Text  style={{position:'relative',left:'57%',top:'-9%',color: '#1687B7' }} >Min salary:</Text>

 <TextInput style={{height: 50,width:"40%",borderBottomWidth: 1, position:'relative',left:'56%',top:'-12%',borderColor: '#1687B7',  }}
          
          // Adding hint in Text Input using Place holder.
          placeholder="enter min salary"
 
          onChangeText={(min_salary) => this.setState({min_salary})}
          value={this.state.min_salary}
          keyboardType = 'numeric'
         
         
        />
        </View>
<View style={{paddingTop:0, position:'relative',
top:'-8%',left:'16%'}}>
        <TouchableOpacity  onPress={this.onSortCityIn.bind(this)} activeOpacity={0.6} style={styles.button} >
 
          <Text style={styles.TextStyle}> Submit </Text>
 
        </TouchableOpacity>
        
</View>
</View>      
      
      </View>
 </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
   // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
    paddingTop: 18,
  },
   button: {
   height:45,
   width: '40%',
   backgroundColor: "#1687B7",
   borderRadius: 7,
   position:'relative',
   marginTop:"15%",
   marginLeft:"10%",
 
  },
  TextStyle: {
    color: '#fff',
    textAlign: 'center',
   padding: 10,
   fontSize:20,

  }
 
});

