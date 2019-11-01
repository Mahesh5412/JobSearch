import React from 'react';
import {Button,FlatList,ActivityIndicator, Text, View,StyleSheet,Dimensions,Image,TouchableHighlight,TextInput,PixelRatio } from 'react-native';
import { Icon } from 'native-base';
import { SearchBar } from 'react-native-elements';
import NetInfo from '@react-native-community/netinfo';
import Snackbar from 'react-native-snackbar';
import Ionicons from "react-native-vector-icons/Ionicons";
import Icons from "react-native-vector-icons/EvilIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
export default class ListScreen extends React.Component {

 constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      data: [],      
      error: null, 
      phone : '',
      isFetching: false,
    }
    this.arrayholder = [];
  }

 onRefresh() {
        this.setState({ isFetching: true }, function() { this.listJobposts() });
     }
  
      componentWillMount()
    {
     this.listJobposts()
    }
  
listJobposts =() => {

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
    return fetch('http://115.98.3.215:90/jobsearch/buyer/listscreen.php')
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({
            isLoading: false,
            isFetching: false,
            data: responseJson.ForLeaseLand,
          }, function () {
     });
     this.arrayholder=responseJson.ForLeaseLand;
    })
    .catch((error) => {
      console.error(error);
    });
}
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


renderHeader = () => {    
  return ( 
 <SearchBar        
      placeholder="Type Here..."        
      lightTheme        
      round        
      onChangeText={text => this.searchFilterFunction(text)}
      value={this.state.text}
      autoCorrect={false}             
    />      
   /* <TextInput 
       style={styles.TextInputStyleClass}
       onChangeText={text => this.searchFilterFunction(text)}
       value={this.state.text}
       underlineColorAndroid='transparent'
       placeholder="Search Here"
      /> */
  );  
};


searchFilterFunction = text => {    
  const newData = this.arrayholder.filter(item => {      
    const itemData = `${item.designation.toUpperCase()} ${item.date_of_interview.toUpperCase()} ${item.qualification.toUpperCase()}
${item.company_name.toUpperCase()} ${item.company_type.toUpperCase()} ${item.resumes_email.toUpperCase()}
${item.city.toUpperCase()} ${item.state.toUpperCase()}`;  
    //${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
 
     const textData = text.toUpperCase();
      
     return itemData.indexOf(textData) > -1;    
  });
  
  this.setState({ data: newData, text:text });  
};

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
          data={this.state.data}
          refreshing={this.state.isFetching}
          onRefresh={() => this.onRefresh()}

       ItemSeparatorComponent = {this.FlatListItemSeparator} 
          renderItem={({item}) =>
               <View style={{flex:1, flexDirection: 'column',paddingTop:5,paddingBottom:13,elevation:3, 
    borderRadius : 5,margin: 10,}} >

           
           <View style={{flex:1, flexDirection: 'row'}}>
                <View style={{flex:1, flexDirection: 'column',paddingTop:5,paddingLeft:15}}>
              
              <View style={{padding:5}}><Text style={{fontSize: 30,color:'#1687B7'}}>{item.designation}</Text></View>
      <View style={{padding:5}}><Text style={styles.span}><Icons name="archive" size={20} color="lightGray"/>{item.experience}</Text></View>
               <View style={{padding:5}}><Text style={styles.span}><Icons name="location" size={20} color="lightGray"/>{item.address},{item.city},{item.state}</Text></View>
              
               
               <View style={{padding:5}}><Text style={styles.span}><Text>openings : </Text>{item.no_of_openings}</Text></View>
            
               <View style={{padding:5}}><Text style={styles.span}><Text>interview date : </Text>{item.date_of_interview}</Text></View>
                 <View style={{padding:5}}><Text style={styles.span}><Text>qualification : </Text>{item.qualification}</Text></View>
               
               </View>


          </View>



     <View style={{padding:5}}>
        <Text></Text>
       <Text style={{color:'#1687B7',fontSize: 20}}>  Company Details</Text>
    <View style={{padding:5}}>
       <Text>  name : {item.company_name}   |  type : {item.company_type}  |  contact : {item.resumes_email} </Text>
</View>
     </View>

 

</View>
          }
          keyExtractor={({sno}, index) => sno}
          ListHeaderComponent={this.renderHeader}
        />
    
      </View>
    );
  }
}

  const deviceWidth = Dimensions.get('window').width
    const deviceHeight = Dimensions.get('window').height
const styles = StyleSheet.create({
MainContainer :{

justifyContent: 'center',
flex:1,
margin: 10,
 backgroundColor: 'white',
},


span:{
  color: 'black',
fontSize: 15,
},



});
