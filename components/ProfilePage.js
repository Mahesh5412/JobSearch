import React from 'react';
import { FlatList, ActivityIndicator, Button,
  StatusBar, Text,StyleSheet, View,Image  } from 'react-native';
import RNExitApp from 'react-native-exit-app';
import AsyncStorage from '@react-native-community/async-storage';
import Entypo from "react-native-vector-icons/Entypo";

export default class ProfilePage extends React.Component {
  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      username : '',
     companyname:'',
     companytype:'',
    }
  }
  
  async componentDidMount(){
    const value = await AsyncStorage.getItem('username');
    try {
      const response = await fetch('http://115.98.3.215:90/jobsearch/login/profilepage.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: value,
        })
      });
      const responseJson = await response.json();
      this.setState({
        isLoading: false,
        dataSource: responseJson.profile,
      }, function () {
      });
    }
    catch (error) {
      console.error(error);
    }
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
   // this.props.navigation.navigate('Auth');
    RNExitApp.exitApp();
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
<View style={{ flex:0.9, backgroundColor: '#FFFFFF',marginTop:'10%',elevation:7, width:'90%',marginLeft:'5%',
       borderRadius:20,borderBottomColor: '#000000',  justifyContent: 'center',
    alignItems: 'center',}}>

<Entypo name={'user'} size={90}  color="#1687B7" />

      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) =><View  style={styles.main}>

 <Text>
<Text style={styles.data}>Username  :  {item.username}{"\n"}{"\n"}</Text>
<Text style={styles.data}>Comanyname  : {item.company_name}{"\n"}{"\n"}</Text>
<Text style={styles.data}>Comanytype  :  {item.company_type} {"\n"}{"\n"}</Text>
<Text style={styles.data}>Comanyphone : {item.company_phone} {"\n"}{"\n"}</Text>
<Text style={styles.data}>Comanyweb  :  {item.company_website}{"\n"}{"\n"}</Text>
<Text style={styles.data}>Comanyaddress  :{item.address}{"\n"}{"\n"}</Text>
</Text>

</View>
}
          keyExtractor={({sno}, index) => sno}
        />

    <Button 
            onPress={this._signOutAsync} 
           title="I'm done, sign me out"
            color= "#1687B7" 
           />
        <StatusBar barStyle="default" />
      </View>
 </View>
    );
  }
}


const styles = StyleSheet.create({
  main:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
data:{
  position:'relative',
  top:'10',
  fontSize:15, 
   fontWeight:'bold', 
},
image:{

   
}

})

