
import React from 'react';
import { Button,FlatList,Image, View,Text,TextInput,StyleSheet,Alert,ScrollView,ListView,ActivityIndicator,TouchableOpacity,PixelRatio } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import NetInfo from '@react-native-community/netinfo';
import Snackbar from 'react-native-snackbar';
export default class MyListScreen extends React.Component {
  constructor(props) { 
    super(props);
    this.state = {
      isLoading: true,
      username : '',
      isFetching: false,
    }
}

onRefresh() {
  this.setState({ isFetching: true }, function() { this.mylist() });
}

componentWillMount()
{
this.mylist()
}

  async mylist(){
 const value = await AsyncStorage.getItem('username');

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
 
  return fetch('http://115.98.3.215:90/jobsearch/seller/mylist.php', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username : value,
  })
 
}).then((response) => response.json())
         .then((responseJson) => {

           this.setState({
             isLoading: false,
             isFetching: false,
             dataSource: responseJson.mylist,
           }, function() {
             // In this block you can do something with new state.
           });
         })
         .catch((error) => {
           console.error(error);
         });
     }
            });
  }
     Deletesellerlandmark =(sno) =>{

     
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
      fetch('http://115.98.3.215:90/jobsearch/seller/deletelist.php', {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
    
        sno : sno
    
      })
    
      }).then((response) => response.json())
      .then((responseJson) => {
    
        // Showing response message coming from server after inserting records.
        Alert.alert(responseJson);
     
this.mylist();
       
      }).catch((error) => {
         console.error(error);
      });
    
    }
   });
  
  
  }

     
 GetsellerlandmarkFunction=(designation,experience,keyskills,no_of_openings,date_of_interview,qualification,salary,sno)=>{
        this.props.navigation.navigate('MyListUpdate', { 
        designation:designation,
        experience:experience,
	keyskills:keyskills, 
	no_of_openings:no_of_openings, 
	date_of_interview:date_of_interview, 
	qualification:qualification,
        salary:salary,
        sno:sno,          
          });     

     }  

 
 
 
 FlatListItemSeparator = () => {
   return (
     <View
       style={{
         height: .5,
         width: "100%",
         backgroundColor: "#000",
       }}
     />
   );
 }
 
render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={styles.MainContainer}>
       
        <FlatList
          data={this.state.dataSource}
          refreshing={this.state.isFetching}
          onRefresh={() => this.onRefresh()}

       ItemSeparatorComponent = {this.FlatListItemSeparator} 
          renderItem={({item}) =>
                <View style={{flex:1, flexDirection: 'column',paddingTop:5,paddingBottom:13,elevation:3, 
    borderRadius : 5,margin: 10,}} >

           
          
             



 <View style={{flex:1, flexDirection: 'column',paddingTop:5,paddingLeft:15}}>
              
              <View style={{padding:5}}><Text style={{fontSize: 20,color:'black',fontWeight: 'bold',}}>{item.designation}</Text></View>
      <View style={{padding:5}}><Text><Text style={styles.Price}>Exp:</Text>{item.experience}</Text></View>
              
               
               </View>

<View style={{flex:1, flexDirection: 'column',paddingTop:5,paddingLeft:15}}>
              
              <View style={{padding:5}}><Text><Text style={styles.Price}>openings:</Text>{item.no_of_openings}</Text></View>
            
               <View style={{padding:5}}><Text><Text style={styles.Price}>interview date:</Text>{item.date_of_interview}</Text></View>
                 <View style={{padding:5}}><Text><Text style={styles.Price}>qualification:</Text>{item.qualification}</Text></View>
               
               </View>

         
  
 <View  style={{position:'relative',marginTop:'5%', 
      borderBottomWidth: 1/ PixelRatio.get(),width:"100%",}}>
</View >
 <View style={{flex:1, flexDirection: 'row',justifyContent: 'space-between'}}>
 <View >
<TouchableOpacity activeOpacity = { .4 }  
    style={[styles.deleteTouchableOpacityStyle, styles.registerButton]} 
    onPress={this.GetsellerlandmarkFunction.bind(this,item.designation,
      item.experience,
      item.keyskills,
      item.no_of_openings,
      item.date_of_interview, 
      item.qualification,
     item.salary,
      item.sno,
     )} >
     <Text style={styles.TextStyle1}> UPDATE </Text>
    </TouchableOpacity>   
    </View>   
    <View  >
    <TouchableOpacity activeOpacity = { .4 }  
    style={[styles.deleteTouchableOpacityStyle, styles.registerButton]} 
    onPress={this.Deletesellerlandmark.bind(this,item.sno)} >
     <Text style={[styles.TextStyle,styles.Delete]}> DELETE </Text>
    </TouchableOpacity>
    </View>
</View>
</View>
          }
          keyExtractor={({sno}, index) => sno}
        />


    
      </View>
    );
  }
}
const styles = StyleSheet.create({
MainContainer :{

justifyContent: 'center',
flex:1,
margin: 10,
 backgroundColor: 'white',
},

imageView: {

    width: '50%',
    height: 100 ,
    margin: 7,
    borderRadius : 7
 
},
Price:{
  color: 'black'
},
TextStyle:{
  //backgroundColor:'red',
  marginLeft:7,
  padding:7,
  //paddingTop:3,
  //paddingBottom:3,
color:'#1687B7',
 borderRadius : 7,
fontSize: 15
},
TextStyle1:{
  //backgroundColor:'green',
  marginLeft:7,
  padding:5,
  //paddingTop:3,
  //paddingBottom:3,
color:'#1687B7',
 borderRadius : 7,
fontSize: 15
},


});


 
 
