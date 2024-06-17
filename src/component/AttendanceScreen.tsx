import {useEffect, useState} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import realm from '../db/dbSchema';
import {Loading} from './Loading';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Toast} from 'toastify-react-native';
import { colorTheme } from '../service/colorTheme';

export const AttendanceScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [useList, setUserList] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const getUserList = () => {
    setRefreshing(true);
    const contactsData: any = realm
      .objects('Contact5')
      .filtered('status == $0', 'Active');
    const results: any = [];
    const currentDate = new Date();
    contactsData.forEach((contact: {image: string; id: any; name: string}) => {
      const attendance = realm
        .objects('Attendance')
        .filtered(
          'id == $0 AND Date == $1',
          contact.id,
          currentDate.toDateString(),
        )
        .sorted('inTime', true)[0];
      if (contact) {
        if (attendance) {
          results.push({
            name: contact.name,
            id: contact.id,
            date: attendance.Date,
            image: contact.image,
            inTime: attendance.inTime,
            outTime: attendance.outTime,
          });
        } else {
          results.push({
            name: contact.name,
            id: contact.id,
            date: '',
            inTime: '',
            outTime: '',
            image: contact.image,
          });
        }
      }
    });
    setUserList(results);
    setRefreshing(false);
    setLoading(false);
  };
  const padZero = (num: number) => (num < 10 ? '0' + num : num);

  const getTimestamp = () => {
    const newDate = new Date();
    const newHours = newDate.getHours();
    const newMinutes = newDate.getMinutes();
    const newSeconds = newDate.getSeconds();

    return `${padZero(newHours)}:${padZero(newMinutes)}:${padZero(newSeconds)}`;
  };
  const handleClockIn = (id: string) => {
    const currentDate = new Date();

    try {
      realm.write(() => {
        realm.create('Attendance', {
          id: id,
          Date: currentDate.toDateString(),
          inTime: getTimestamp(),
          outTime: '',
        });
      });
      Toast.success('Clock In');
      getUserList();
    } catch (error) {
      Toast.error('Clock In Error', 'top');
    }
  };
  const handleClockOut = (id: string) => {
    const currentDate = new Date();
    try {
      realm.write(() => {
        let Attendance = realm
          .objects('Attendance')
          .filtered('id == $0 AND Date == $1', id, currentDate.toDateString())
          .sorted('inTime', true)[0];
        if (Attendance) {
          Attendance.outTime = getTimestamp();
          Toast.success(`Clock Out`);
          getUserList();
        } else {
          Toast.error(`Clock In Not Found`, 'top');
        }
      });
    } catch (error) {
      Toast.error('Clock Out Error', 'top');
    }
  };
  const [SearchInput, setSearchInput] = useState<string>('');
  const filterData = () => {
    const lowercasedTerm = SearchInput.toLowerCase();
    if (lowercasedTerm === '') {
      return useList;
    }
    return useList.filter(
      user =>
        user.name.toLowerCase().includes(lowercasedTerm)
    );
  };
  useEffect(() => {
    getUserList();
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
    Box: {
      backgroundColor: isDarkMode ? colorTheme.BOX_BG : 'white',
      borderRadius: 15,
      paddingRight: 10,
      shadowColor: isDarkMode ? colorTheme.shadowColor : 'blue',
      shadowOffset: {
        width: 6,
        height: 6,
      },
      // shadowOpacity: 1.8,
      shadowRadius: 7,
      elevation: 5, // Use this for Android shadow
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    image: {
      width: 50,
      height: 50,
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
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 10,
              backgroundColor:  isDarkMode ? "black" : 'white',
            }}>
            <TextInput
              style={styles.textInputStyle}
              placeholder="Search"
              value={SearchInput}
              placeholderTextColor={isDarkMode ? "black" : 'white'}
              onChangeText={text => setSearchInput(text)}></TextInput>
          </View>
          <ScrollView
            style={{height: '100%', backgroundColor:  isDarkMode ? "black" : 'white'}}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={getUserList} />
            }>
            <View style={{padding: 10,marginBottom:60, backgroundColor: isDarkMode ? "black" :  'white'}}>
              {filterData().map((val, index) => {
                return (
                  <View style={styles.Box} key={index}>
                    <View>
                      <Image
                        source={{
                          uri: val.image,
                        }}
                        style={styles.image}
                      />
                    </View>

                    <Text style={{color: isDarkMode ? "white" :  'black', textAlign: 'center'}}>
                      {val.name}
                    </Text>
                    {
                      val.inTime === '' || val.outTime !== '' ? (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <TouchableOpacity
                            onPress={() => handleClockIn(val.id)}>
                            <MaterialCommunityIcons
                              name="clock-check"
                              color={'teal'}
                              size={34}
                            />
                          </TouchableOpacity>
                          <Text style={{color: isDarkMode ? "white" : 'black', marginLeft: 10}}>
                            Check In
                          </Text>
                        </View>
                      ) : (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <TouchableOpacity
                            onPress={() => handleClockOut(val.id)}>
                            <MaterialCommunityIcons
                              name="clock-end"
                              color={'teal'}
                              size={34}
                            />
                          </TouchableOpacity>
                          <Text style={{color:isDarkMode ? "white" :  'black', marginLeft: 10}}>
                            Check Out
                          </Text>
                        </View>
                      )
                      // <View>
                      // <View
                      //     style={{
                      //       flexDirection: 'row',
                      //       justifyContent: 'space-between',
                      //     }}>
                      //     <Text style={{color: 'black', textAlign: 'center'}}>
                      //       In Time
                      //     </Text>
                      //     <Text style={{color: 'black', textAlign: 'center'}}>
                      //       Out Time
                      //     </Text>
                      //   </View>
                      //   <View
                      //     style={{
                      //       flexDirection: 'row',
                      //       justifyContent: 'space-between',
                      //     }}>
                      //     <Text style={{color: 'black', textAlign: 'center'}}>
                      //       In Timefhhfghfgf
                      //     </Text>
                      //     <Text style={{color: 'black', textAlign: 'center'}}>
                      //       Out Timefghgrey
                      //     </Text>
                      //   </View>
                      // </View>
                    }
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
};

