import {useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View, useColorScheme} from 'react-native';
import realm from '../db/dbSchema';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { convertToCSV } from '../service/excel/convertToCSV';
import { saveToExcel } from '../service/excel/saveToExcel';
import { colorTheme } from '../service/colorTheme';

export const SubHistory = ({route, navigation}: any) => {
  const isDarkMode = useColorScheme() === 'dark';
  const info = route.params;
  const [subscriptions, setSubscriptions] = useState([]);
  const getSubHistory = () => {
    const subscription: any = realm
      .objects('SubscriptionInfo')
      .filtered('id == $0', info.id)
      .sorted('status');
    setSubscriptions(subscription);
  };
  const exportSubscriptionInfoToExcel = async () => {
    if (subscriptions.length > 0) {
      const csvData = convertToCSV(subscriptions);
      await saveToExcel(csvData,"SubscriptionHistory");
    } else {
      console.log('No data available to export');
    }
  };
  useEffect(() => {
    getSubHistory();
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
    <View style={{backgroundColor: isDarkMode ? "black" :'white'}}>
      <Text style={{textAlign: 'center', color: 'gray'}}>
        Subscription History
      </Text>
      <TouchableOpacity style={{position:'absolute',zIndex:1,right:20}} onPress={exportSubscriptionInfoToExcel}>
        <MaterialCommunityIcons
          name="cloud-download-outline"
          color={'teal'}
          size={26}
          
        />
      </TouchableOpacity>
      <ScrollView style={{height:'100%'}}>
        <View style={{backgroundColor: isDarkMode ? "black" :'white', padding: 20}}>
          {subscriptions.map((item: any, index) => {
            return (
              <View style={styles.card} key={index}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{color: 'gray'}}>Start</Text>
                  <Text style={{color: 'gray'}}>End</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{color: isDarkMode ? "white" : 'black', fontWeight: '500'}}>
                    {item.startDate}
                  </Text>
                  <Text style={{color: isDarkMode ? "white" : 'black', fontWeight: '500'}}>
                    {' '}
                    {item.endDate}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <View>
                    <Text style={{color: isDarkMode ? "white" : 'black', fontWeight: '500'}}>
                      {item.status}
                    </Text>
                    <Text style={{color: 'gray'}}>{item.paymentFrequency}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}>
                    <MaterialCommunityIcons
                      name="currency-inr"
                      color={isDarkMode ? "white" : 'black'}
                      size={24}
                    />
                    <Text
                      style={{color: isDarkMode ? "white" : 'black', fontSize: 22, marginLeft: -5}}>
                      {item.payment}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};


