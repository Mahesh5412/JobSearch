import React from 'react';
import { Button, Image, Platform, View, Text } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Ionicons from "react-native-vector-icons/Ionicons";
import ListScreen from './buyer/ListScreen';
import SelectLocationScreen from './buyer/SelectLocationScreen';

import FilterList from './buyer/Filter/FilterList';
import FilterScreen from './buyer/Filter/FilterScreen';

import AddListScreen from './seller/AddListScreen';

import MyListScreen from './seller/MyListScreen';
import MyListUpdateScreen from './seller/MyListUpdateScreen';


import ProfilePage from './ProfilePage';


class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "JobSearch",
      headerRight: (
      <View style={{     position: 'relative',left:'-20%'
    }}>
       <Ionicons name="ios-options" size={35} color="#fff"
          onPress={navigation.getParam('increaseCount')}
        />
</View>
      ),
    };
  };

  componentWillMount() {
    this.props.navigation.setParams({ increaseCount: this._increaseCount });
  }

  state = {
    count: 0,
  };

  _increaseCount = () => {
    this.props.navigation.navigate('Details');
  };

  render() {
    return (
            <SelectLocationScreen/>
    );
  }
}


class HomeListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "JobSearch",
      headerRight: (
<View style={{     position: 'relative',left:'-20%'
    }}>
       <Ionicons name="md-funnel" size={30} color="#fff"
          onPress={navigation.getParam('increaseCount')}
        />
</View>
      ),
    };
  };

  componentWillMount() {
    this.props.navigation.setParams({ increaseCount: this._increaseCount });
  }

  state = {
    count: 0,
  };

  _increaseCount = () => {
    this.props.navigation.navigate('Details');
  };

  render() {
    return (
            <ListScreen/>
    );
  }
}



const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen,
   navigationOptions: {
      title: 'FilterList',
      headerStyle: {
        backgroundColor: '#1687B7'
      },
      headerTintColor: '#fff', 
      tabBarVisible:'false',
    },
  },
  Details: { screen: FilterScreen,
    navigationOptions: {
      title:"JobSearch",
      headerStyle: {
        backgroundColor: '#1687B7'
      },
      headerTintColor: '#fff',  
    },
   },
   FilterList: {screen: FilterList,
    navigationOptions: {
      title:"JobSearch",
      headerStyle: {
        backgroundColor: '#1687B7'
      },
      headerTintColor: '#fff',  
    },
   },
});

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

const ListStack = createStackNavigator({
  List: { screen: HomeListScreen ,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#1687B7'
      },
      headerTintColor: '#fff', 
      tabBarVisible:'false',
    },
  },
  Details: { screen: FilterScreen,
    navigationOptions: {
      title:"JobSearch",
      headerStyle: {
        backgroundColor: '#1687B7'
      },
      headerTintColor: '#fff',  
    },
   },
   FilterList: {screen: FilterList,
    navigationOptions: {
      title:"JobSearch",
      headerStyle: {
        backgroundColor: '#1687B7'
      },
      headerTintColor: '#fff',  
    },
   },
});

ListStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

const AddListStack = createStackNavigator({
  AddList: { screen: AddListScreen,
    navigationOptions: {
      title:"JobSearch",
      headerStyle: {
        backgroundColor: '#1687B7'
      },
      headerTintColor: '#fff',  
    },
   },
});

AddListStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

const MyListingsStack = createStackNavigator({
  MyListings: { screen: MyListScreen,
    navigationOptions: {
      title:"JobSearch",
      headerStyle: {
        backgroundColor: '#1687B7'
      },
      headerTintColor: '#fff',  
    },
  },
  MyListUpdate: { screen: MyListUpdateScreen }, 

});

MyListingsStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

const ProfilePageStack = createStackNavigator({
  ProfilePage: { screen: ProfilePage,
    navigationOptions: {
      title:"JobSearch",
      headerStyle: {
        backgroundColor: '#1687B7'
      },
      headerTintColor: '#fff',  
    },
  },
});

const Page2= createAppContainer(createBottomTabNavigator(
  {
   Map: { screen: HomeStack },
    Posts: { screen: ListStack },
    AddPost: { screen: AddListStack },
    MyPosts: { screen: MyListingsStack },
    MyProfile: { screen: ProfilePageStack },
  },
{
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Map') {
          iconName = `${focused ? 'md-map' : 'ios-map'}`;
        } else if (routeName === 'Posts') {
          iconName = `${focused ? 'md-list-box' : 'md-list'}`;
        }else if (routeName === 'AddPost') {
          iconName = `${focused ? 'ios-add-circle' : 'ios-add-circle-outline'}`;
        }else if (routeName === 'MyPosts') {
          iconName = `${focused ? 'ios-heart' : 'ios-heart'}`;
        }else if (routeName === 'MyProfile') {
          iconName = `${focused ? 'ios-person' : 'ios-person'}`;
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
 }),
    tabBarOptions: {
      activeTintColor: '#1687B7',
      inactiveTintColor: 'gray',
    },
  }
));

const AppContainer = createAppContainer(Page2);
export default class Menu extends React.Component {
  render() {
    return <AppContainer/>;
  }
}
