import {
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useEffect, useState} from 'react';
import realm from '../db/dbSchema';
import { Toast } from 'toastify-react-native';
import { colorTheme } from '../service/colorTheme';
//const realm = new Realm({schema: [ContactSchema]});
export const HomeScreen = ({navigation}: any) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [refreshing, setRefreshing] = useState(false);
  const [dueCount, setDueCount] = useState<number>(0);
  const getUserInfo = () => {
    setRefreshing(true);
    const contactsData: any = realm.objects('SubscriptionInfo').filtered('status == $0', "Active");
    const currentDate = new Date();
    const filteredData = contactsData.filter(
      (item: {endDate: string | number | Date}) =>
        new Date(item.endDate) < currentDate,
    );
    setDueCount(filteredData.length);
    setRefreshing(false);
  };
  const handleAllUserBtn = () => {
    navigation.navigate('UserList');
  };
  const handleDueUserBtn = () =>{
    navigation.navigate('SubDueUserList');
  }
  useEffect(() => {
    getUserInfo();
    
  }, []);
  const style = StyleSheet.create({
    HomeCotainer: {
      backgroundColor: isDarkMode ? "black" : 'white',
      // height: '100%',
    },
    FirstBox: {
      backgroundColor: isDarkMode ? colorTheme.BOX_BG : 'white',
      height: 250,
      borderRadius: 15,
      padding: 20,
      shadowColor: isDarkMode ? colorTheme.shadowColor : 'blue',
      shadowOffset: {
        width: 6,
        height: 6,
      },
      // shadowOpacity: 1.8,
      shadowRadius: 7,
      elevation: 5, // Use this for Android shadow
    },
    SecondBox: {
      backgroundColor: isDarkMode ? colorTheme.BOX_BG : 'white',
      borderRadius: 15,
      height: 60,
      flex: 1,
      justifyContent: 'center',
      shadowColor: isDarkMode ? colorTheme.shadowColor : 'blue',
      shadowOffset: {
        width: 6,
        height: 6,
      },
      // shadowOpacity: 1.8,
      shadowRadius: 7,
      elevation: 5, // Use this for Android shadow
    },
  });
  return (
    <View style={{height: '100%', backgroundColor: isDarkMode ? "black" : 'white'}}>
      <StatusBar backgroundColor= {isDarkMode ? 'black' :'white'} barStyle={isDarkMode?"light-content":'dark-content'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{height:'100%'}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getUserInfo} />
        }>
        <View style={[style.HomeCotainer, {padding: 20}]}>
          <TouchableOpacity onPress={handleDueUserBtn} activeOpacity={1}>
          <View style={style.FirstBox}>
            <Text
              style={{
                textAlign: 'center',
                color: 'gray',
                fontSize: 20,
                fontWeight: '900',
              }}>
              Due Date
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                flex: 1,
              }}>
              <View>
                <MaterialCommunityIcons
                  name="account-tie"
                  color={isDarkMode ? "white" : 'black'}
                  size={120}
                />
              </View>
              <View>
                <Text
                  style={{
                    marginRight: 20,
                    fontSize: 40,
                    fontWeight: '900',
                    color: isDarkMode ? "white" : 'black',
                  }}>
                  {dueCount}
                </Text>
              </View>
            </View>
            <Text
              style={{
                textAlign: 'center',
                color: 'gray',
                fontSize: 20,
                fontWeight: '900',
              }}>
              {new Date().toDateString()}
            </Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAllUserBtn} activeOpacity={1}>
            <View style={[style.SecondBox, {marginTop: 20, padding: 15}]}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: '800',
                    color: isDarkMode ? "white" : 'black',
                  }}>
                  All User
                </Text>
                <MaterialCommunityIcons
                  name="chevron-right"
                  color={isDarkMode ? "white" : 'black'}
                  size={26}
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} onPress={()=> navigation.navigate('Attendance')}>
            <View style={[style.SecondBox, {marginTop: 20, padding: 15}]}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: '800',
                    color: isDarkMode ? "white" : 'black',
                  }}>
                  Apply Attendance
                </Text>
                <MaterialCommunityIcons
                  name="chevron-right"
                  color={isDarkMode ? "white" : 'black'}
                  size={26}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};


