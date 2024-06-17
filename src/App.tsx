/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import {NavigationContainer} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Provider as PaperProvider} from 'react-native-paper';
import {HomeScreen} from './component/Home';
import {AddUser} from './component/AddUser';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {UserProfile} from './component/UserProfile'
import { UpdateSubscription } from './component/UpdateSubscription';
import { SubHistory } from './component/SubHistory';
import { UserListBox } from './component/UserListBox';
import { SubDueUserList } from './component/SubDueUserList';
import { AttendanceScreen } from './component/AttendanceScreen';
import { AttendanceHistory } from './component/AttendanceHistory';
import { EditProfile } from './component/EditProfile';
const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();
const HomeScreen3 = () => {
  return <Text style={{textAlign:'center'}}>Admin Profile</Text>;
};

const Header = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = StyleSheet.create({
    header: {
      paddingTop: 20,
      paddingBottom: 10,
      backgroundColor: isDarkMode? "black":'white',
      alignItems: 'center',
    },
  })
  return (
    <View style={styles.header}>
      <MaterialCommunityIcons name="spa" color={'#FF6E6E'} size={46} />
    </View>
  );
};
function HomeStack() {
  return (
    <Stack.Navigator  screenOptions={{
      headerShown: false,
      animation: 'none', // Disable animation
      
    }}>
      <Stack.Screen name="Home2" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="UserList" component={UserListBox} options={{ headerShown: false }}/>
      <Stack.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }}/>
      <Stack.Screen name="UpdateSub" component={UpdateSubscription} options={{ headerShown: false }} />
      <Stack.Screen name="SubHistory" component={SubHistory} options={{ headerShown: false }} />
      <Stack.Screen name="SubDueUserList" component={SubDueUserList} options={{ headerShown: false }} />
      <Stack.Screen name="Attendance" component={AttendanceScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AttendanceHistory" component={AttendanceHistory} options={{ headerShown: false }} />
      <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'black' : 'white',
  };

  return (
    <PaperProvider>
      <NavigationContainer>
        <View style={styles.container}>
          <Header />
          <Tab.Navigator
            initialRouteName="Home"
            activeColor="#e91e63"
            barStyle={backgroundStyle}>
            <Tab.Screen
              name="Home"
              component={HomeStack}
              options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({color}) => (
                  <MaterialCommunityIcons name="home" color={color} size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="Add"
              component={AddUser}
              options={{
                tabBarLabel: 'Add',

                tabBarIcon: ({color}) => (
                  <MaterialCommunityIcons name="plus" color={color} size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="Profile"
              component={HomeScreen3}
              options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({color}) => (
                  <MaterialCommunityIcons
                    name="account"
                    color={color}
                    size={26}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        </View>
      
      </NavigationContainer>
    </PaperProvider> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  headerText: {
    fontSize: 20,
    color: 'white',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
