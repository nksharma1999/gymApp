import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  Linking,
  ScrollView,
  RefreshControl,
  useColorScheme,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import realm from '../db/dbSchema';
import {useEffect, useState} from 'react';
import {call} from '../service/call';
import { sendSMS } from '../service/sendSMS';
import { sendWhatsApp } from '../service/sendWhatsApp';
import { colorTheme } from '../service/colorTheme';

export const UserProfile = ({route, navigation}: any) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [refreshing, setRefreshing] = useState(false);
  const info = route.params;
  const [subscriptionInfo, setSubscriptionInfo] = useState({
    payment: 0,
    dueDate: '--/--/----',
  });
  // console.log(info);
  const makePhoneCall = (phoneNumber: string) => {
    call(phoneNumber);
  };
  const sendSMSToUser = (phoneNumber:string) =>{
    sendSMS(phoneNumber,'Hello');
  }
  const sendWhatsAppUser = (phoneNumber:string)=>{
    sendWhatsApp(phoneNumber,"Hello");
  }
  const isSubscriptionExpired =(endDate:string)=>{
    const currentDate = new Date();
    return new Date(endDate) < currentDate;
  }
  const handleUpdateSubBtn = () => {
    navigation.navigate('UpdateSub', {
      id: info.id,
    });
  };
  const handleAttendanceBtn =() =>{
    navigation.navigate('AttendanceHistory', {
      id: info.id,
    });
  }
  const handleEditProfile =() =>{
    navigation.navigate('EditProfile', {
      ...info,
    });
  }
  const handleSubHistoryBtn = () => {
    navigation.navigate('SubHistory', {
      id: info.id,
    });
  };
  const getSubscriptionByIdAndStatus = (id: string, status: string) => {
    setRefreshing(true);
    const subscription: any = realm
      .objects('SubscriptionInfo')
      .filtered('id == $0 AND status == $1', id, status);
    if (subscription.length > 0) {
      setSubscriptionInfo({
        payment: subscription[0].payment,
        dueDate: subscription[0].endDate,
      });
    }
    setRefreshing(false)
    // return subscription.length > 0 ? subscription[0] : null;
  };
  useEffect(() => {
    getSubscriptionByIdAndStatus(info.id, 'Active');
  }, []);
  
  const style = StyleSheet.create({
    userInfoBox: {
      backgroundColor: isDarkMode ? colorTheme.BOX_BG : 'white',
      padding: 10,
      borderRadius: 20,
      shadowColor: isDarkMode ? colorTheme.shadowColor : 'blue',
      shadowOffset: {
        width: 6,
        height: 6,
      },
      // shadowOpacity: 1.8,
      shadowRadius: 7,
      elevation: 5, // Use this for Android shadow
    },
    addressInfoBox: {
      backgroundColor: isDarkMode ? colorTheme.BOX_BG : 'white',
      padding: 15,
      borderRadius: 20,
      marginTop: 10,
      shadowColor: isDarkMode ? colorTheme.shadowColor : 'blue',
      shadowOffset: {
        width: 6,
        height: 6,
      },
      // shadowOpacity: 1.8,
      shadowRadius: 7,
      elevation: 5, // Use this for Android shadow
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 50, // Half of the width and height to make it circular
      margin: 10,
    },
    HomeCotainer: {
      // backgroundColor: 'black',
      // height: '100%',
    },
    FirstBox: {
      backgroundColor: '#363636',
      height: 250,
      borderRadius: 15,
      padding: 20,
    },
    SecondBox: {
      backgroundColor: '#A3EC3E',
      borderRadius: 15,
      height: 60,
      flex: 1,
      justifyContent: 'center',
    },
  });
  return (
    <ScrollView style={{backgroundColor:isDarkMode ? "black" : 'white'}} showsVerticalScrollIndicator={false}  refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={()=> getSubscriptionByIdAndStatus(info.id,"Active")} />
    }>
      <View
        style={{
          backgroundColor: isDarkMode ? "black" : 'white',
          height: '100%',
          padding: 20,
          marginTop: 40,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}>
        <View style={style.userInfoBox}>
          <View style={{alignItems: 'center', marginTop: -70}}>
            <Image
              source={{
                uri:
                  info.image === ''
                    ? 'https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg'
                    : info.image,
              }}
              style={style.image}
            />
          </View>
          <View style={{position: 'absolute', top: 10, right: 10}}>
            <TouchableOpacity onPress={handleEditProfile}>
            <MaterialCommunityIcons
              name="account-edit-outline"
              color={'#A3EC3E'}
              size={26}
            />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontWeight: '900',
              color: 'gray',
            }}>
            {info.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={{color: 'gray'}}>Payment</Text>
            <Text style={{color: 'gray'}}>Due Date</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <MaterialCommunityIcons
                name="currency-inr"
                color={isDarkMode ? "white" : 'black'}
                size={24}
              />
              <Text style={{color: 'gray', fontWeight: '900'}}>
                {subscriptionInfo.payment}
              </Text>
            </View>
            <Text style={{color: isSubscriptionExpired(subscriptionInfo.dueDate) ?'red': isDarkMode ? "white" : 'black', fontWeight: '900'}}>
              {subscriptionInfo.dueDate}
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 17,
                marginRight: 10,
                fontWeight: '900',
                color: isDarkMode ? "white" : 'black',
              }}>
              {info.phone}
            </Text>
            <TouchableOpacity onPress={() => makePhoneCall(info.phone)}>
              <MaterialCommunityIcons
                name="phone"
                color={'#A3EC3E'}
                size={22}
              />
            </TouchableOpacity>
            <TouchableOpacity
              // activeOpacity={1}
              style={{marginLeft: 10}}
              onPress={() => sendSMSToUser(info.phone)}>
              <MaterialCommunityIcons
                name="message-text-outline"
                color={'teal'}
                size={26}
              />
            </TouchableOpacity>

            <TouchableOpacity
              // activeOpacity={1}
              style={{marginLeft: 10}}
              onPress={() => sendWhatsAppUser(info.phone)}>
              <MaterialCommunityIcons
                name="whatsapp"
                color={'teal'}
                size={26}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* <Text style={{color:'gray',textAlign:'center',marginTop:10,fontSize:20,fontWeight:'900'}}>Address</Text> */}
        <View style={style.addressInfoBox}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons
              name="office-building-marker-outline"
              color={'teal'}
              size={36}
            />
            <Text
              style={{
                flexWrap: 'wrap',
                color: isDarkMode ? "white" : 'black',
                marginRight: 40,
                padding: 10,
                textAlign: 'right',
              }}>
              {info.address}
            </Text>
          </View>
        </View>
        {/* <Text style={{color:'gray',textAlign:'center',marginTop:10,fontSize:20,fontWeight:'900'}}>Personal Info</Text> */}
        <View style={style.addressInfoBox}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: 'gray'}}>Gender</Text>
            <Text style={{color: 'gray'}}>DOB</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <Text style={{color: isDarkMode ? "white" : 'black', fontWeight: '900'}}>
              {info.gender}
            </Text>
            <Text style={{color: isDarkMode ? "white" : 'black', fontWeight: '900'}}>{info.dob}</Text>
          </View>
        </View>
        <TouchableOpacity activeOpacity={1} onPress={handleUpdateSubBtn}>
          <View style={style.addressInfoBox}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{color: isDarkMode ? "white" : 'black', fontSize: 15, fontWeight: '900'}}>
                Update Subscription
              </Text>
              <MaterialCommunityIcons
                name="chevron-right"
                color={isDarkMode ? "white" : 'black'}
                size={20}
              />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} onPress={handleSubHistoryBtn}>
          <View style={style.addressInfoBox}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{color: isDarkMode ? "white" : 'black', fontSize: 15, fontWeight: '900'}}>
                Subscription History
              </Text>
              <MaterialCommunityIcons
                name="chevron-right"
                color={isDarkMode ? "white" : 'black'}
                size={20}
              />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} onPress={handleAttendanceBtn}>
          <View style={style.addressInfoBox}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{color: isDarkMode ? "white" : 'black', fontSize: 15, fontWeight: '900'}}>
                Attendance History
              </Text>
              <MaterialCommunityIcons
                name="chevron-right"
                color={isDarkMode ? "white" : 'black'}
                size={20}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};


