import {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import realm from '../db/dbSchema';
import {convertToCSV} from '../service/excel/convertToCSV';
import {saveToExcel} from '../service/excel/saveToExcel';
import { colorTheme } from '../service/colorTheme';

export const AttendanceHistory = ({route, navigation}: any) => {
  const isDarkMode = useColorScheme() === 'dark';
  const info = route.params;
  const [attedanceHistory, setAttendanceHistory] = useState([]);
//   console.log(info);
  const getUserAttendanceHistory = () => {
    const attendance: any = realm
      .objects('Attendance')
      .filtered('id == $0', info.id)
      .sorted('Date', true);
    setAttendanceHistory(attendance);
  };
  const exportSubscriptionInfoToExcel = async () => {
    // const data = fetchSubscriptionData();
    if (attedanceHistory.length > 0) {
      const csvData = convertToCSV(attedanceHistory);
      await saveToExcel(csvData,"AttendanceHistory");
    } else {
      console.log('No data available to export');
    }
  };
  useEffect(() => {
    getUserAttendanceHistory();
  }, []);

  const styles = StyleSheet.create({
    card: {
      backgroundColor: isDarkMode ? colorTheme.BOX_BG : 'white',
      padding: 20,
      borderRadius: 20,
      shadowColor: isDarkMode ? colorTheme.shadowColor : 'blue',
      shadowOffset: {
        width: 6,
        height: 6,
      },
      // shadowOpacity: 1.8,
      shadowRadius: 7,
      elevation: 5, // Use this for Android shadow
      marginTop: 10,
    },
  });
  return (
    <View style={{backgroundColor: isDarkMode ? "black" : 'white'}}>
      <Text style={{textAlign: 'center', color: 'gray'}}>
        Attendance History
      </Text>
      <TouchableOpacity style={{position:'absolute',zIndex:1,right:20}} onPress={exportSubscriptionInfoToExcel}>
        <MaterialCommunityIcons
          name="cloud-download-outline"
          color={'teal'}
          size={26}
          
        />
      </TouchableOpacity>
      <ScrollView style={{height: '100%'}}>
        <View style={{backgroundColor:isDarkMode ? "black" :  'white', padding: 20}}>
          {attedanceHistory.map((item: any, index) => {
            return (
              <View style={styles.card} key={index}>
                <Text style={{color: 'gray', textAlign: 'center'}}>
                  {item.Date}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{color: 'gray'}}>Clock In</Text>
                  <Text style={{color: 'gray'}}>Clock Out</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{color: isDarkMode ? "white" : 'black', fontWeight: '500'}}>
                    {item.inTime}
                  </Text>
                  <Text style={{color: isDarkMode ? "white" : 'black', fontWeight: '500'}}>
                    {' '}
                    {item.outTime}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};


