import React from 'react';
import {Button, FlatList,ActivityIndicator, Text,Image, View,StyleSheet    } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Snackbar from 'react-native-snackbar';
export default class FilterList extends React.Component {

  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      designation:this.props.navigation.state.params.designation,
      city:this.props.navigation.state.params.city,
      experience:this.props.navigation.state.params.experience,
      min_salary:this.props.navigation.state.params.min_salary,
          isFetching: false,
    }
  }

  onRefresh() {
    this.setState({ isFetching: true }, function() { this.listLandmarks() });
 }

 componentWillMount()
    {
     this.listLandmarks()
    }
  

    listLandmarks =() =>  {
    const { designation,city,experience,min_salary }  = this.state ;


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


    return fetch('http://115.98.3.215:90/jobsearch/sorting/sorting.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      designation:designation,
      city:city,
      experience:experience,
      min_salary:min_salary,
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({
            isLoading: false,
            isFetching: false,
            dataSource: responseJson.FilterList,
          }, function () {
     });
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
              
              <View style={{padding:5}}><Text style={{fontSize: 20,color:'#1687B7',fontWeight:'bold',}}>{item.designation}</Text></View>
      <View style={{padding:5}}><Text><Text style={styles.Price}>Exp:</Text>{item.experience}</Text></View>
               <View style={{padding:5}}><Text><Text style={styles.Price}>Address:</Text>{item.city},{item.state}</Text></View>
              
               
              
                    
            
              
              <View style={{padding:5}}><Text><Text style={styles.Price}>openings:</Text>{item.no_of_openings}</Text></View>
            
               <View style={{padding:5}}><Text><Text style={styles.Price}>interview date:</Text>{item.date_of_interview}</Text></View>
                 <View style={{padding:5}}><Text><Text style={styles.Price}>qualification:</Text>{item.qualification}</Text></View>
               
               </View>


         


 


     <View >
        <Text></Text>
       <Text style={{fontSize: 15,color:'#1687B7',fontWeight:'bold',}}>  Company Details</Text>
       <Text>  name  : {item.company_name}  | type : {item.company_type} | contact :{item.resumes_email}</Text>
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


});
