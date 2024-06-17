import {useEffect, useState} from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Loading} from './Loading';
import realm from '../db/dbSchema';
import { call } from '../service/call';
import { sendSMS } from '../service/sendSMS';
import { sendWhatsApp } from '../service/sendWhatsApp';
import { colorTheme } from '../service/colorTheme';
interface props {
  navigation: any;
}
interface userMetaData {
  id: 'string';
  name: 'string';
  phone: 'string';
  gender: 'string';
  address: 'string';
  dob: 'string';
  dateDOJ: 'string';
  status: 'string';
  image: 'string';
}
export const UserListBox = ({navigation}: props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [useList, setUserList] = useState<userMetaData[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const getUserInfo = () => {
    setRefreshing(true);
    const contactsData: any = realm.objects('Contact5');
    setUserList(contactsData);
    setRefreshing(false);
    setLoading(false);
    // if (realm) {
    //   realm.close();
    // }
  };
  const makePhoneCall = (phoneNumber: string) => {
    call(phoneNumber);
  };
  const sendSMSToUser = (phoneNumber:string) =>{
    sendSMS(phoneNumber,'Hello');
  }
  const sendWhatsAppUser = (phoneNumber:string)=>{
    sendWhatsApp(phoneNumber,"Hello");
  }
  const handleViewUserProfile = (info: userMetaData) => {
    navigation.navigate('UserProfile', {
      ...info,
    });
  };
  const [loading, setLoading] = useState<boolean>(true);
  const [SearchInput, setSearchInput] = useState<string>('');
  const filterData = () => {
    const lowercasedTerm = SearchInput.toLowerCase();
    if (lowercasedTerm === '') {
      return useList;
    }
    return useList.filter(
      user =>
        user.name.toLowerCase().includes(lowercasedTerm) ||
        user.phone.includes(SearchInput),
    );
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  const styles = StyleSheet.create({
    textInputStyle: {
      backgroundColor: !isDarkMode ? "black" : 'white',
      // marginTop: 10,
      borderRadius: 26,
  
      color: isDarkMode ? "black" : 'white',
      width: '100%',
      // textAlign:'right'
      paddingLeft: 20,
    },
    box: {
      backgroundColor: isDarkMode ? colorTheme.BOX_BG : 'white',
      marginTop: 10,
      padding: 5,
      borderRadius: 10,
      shadowColor: isDarkMode ? colorTheme.shadowColor : 'blue',
      shadowOffset: {
        width: 6,
        height: 6,
      },
      // shadowOpacity: 1.8,
      shadowRadius: 7,
      elevation: 5, // Use this for Android shadow
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center'
    },
    image: {
      width: 90,
      height: 90,
      borderRadius: 50, // Half of the width and height to make it circular
      margin: 10,
      // borderColor:'b',
      // borderWidth:1,
      
    },
  });
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <View style={{backgroundColor: isDarkMode ? "black" : 'white'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 10,
              backgroundColor: isDarkMode ? "black" : 'white',
            }}>
            <TextInput
              style={styles.textInputStyle}
              placeholder="Search"
              value={SearchInput}
              placeholderTextColor={isDarkMode ? "black" : 'white'}
              onChangeText={text => setSearchInput(text)}></TextInput>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} style={{height:'100%'}}>
            <View
              style={{marginBottom: 70, padding: 10, backgroundColor: isDarkMode ? "black" : 'white'}}>
              {filterData().map((val: userMetaData, index) => {
                return (
                  <TouchableOpacity
                    activeOpacity={1}
                    key={index}
                    onPress={() => handleViewUserProfile(val)}>
                    <View key={index} style={styles.box}>
                      <Image
                        source={{
                          uri:val.image
                        }}
                        style={styles.image}
                      />
                      <View>
                        <Text
                          style={{
                            textAlign: 'center',
                            fontSize: 20,
                            fontWeight: '900',
                            color: 'gray',
                            marginBottom: 10,
                          }}>
                          {val.name}
                        </Text>
                        {/* <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <MaterialCommunityIcons
                              name="account-plus"
                              color={'#A3EC3E'}
                              size={26}
                            />
                            <Text style={{marginLeft: 5, color: 'black'}}>
                              {val.dateDOJ}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <MaterialCommunityIcons
                              name="credit-card-outline"
                              color={'black'}
                              size={26}
                            />
                            <Text style={{marginLeft: 5, color: 'black'}}>
                              {val.status}
                            </Text>
                          </View>
                        </View> */}
                        <View style={{marginTop: 10}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'flex-end',
                            }}>
                            <Text style={{marginRight: 10, color: isDarkMode ? "white" : 'black'}}>
                              {val.phone}
                            </Text>

                            <TouchableOpacity
                              onPress={() => makePhoneCall(val.phone)}>
                              <MaterialCommunityIcons
                                name="phone"
                                color={'#A3EC3E'}
                                size={26}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              // activeOpacity={1}
                              style={{marginLeft:10}}
                              onPress={() => sendSMSToUser(val.phone)}>
                              <MaterialCommunityIcons
                                name="message-text-outline"
                                color={'teal'}
                                size={26}
                              />
                            </TouchableOpacity>

                            <TouchableOpacity
                              // activeOpacity={1}
                              style={{marginLeft:10}}
                              onPress={() => sendWhatsAppUser(val.phone)}>
                              <MaterialCommunityIcons
                                name="whatsapp"
                                color={'teal'}
                                size={26}
                              />
                            </TouchableOpacity>
                            
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
};


