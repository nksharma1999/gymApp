import {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dropdown} from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker';
import realm from '../db/dbSchema';
import {Toast} from 'toastify-react-native';
import { colorTheme } from '../service/colorTheme';
const data = [
  {label: 'Monthly', value: 'Monthly'},
  {label: 'Yearly', value: 'Yearly'},
  {label: 'Other', value: 'Other'},
];

export const UpdateSubscription = ({route, navigation}: any) => {
  const isDarkMode = useColorScheme() === 'dark';
  const info = route.params;
  // console.log(info.id);

  const [payment, setpayment] = useState<string>('');
  const [addressInput, setAddressInput] = useState<string>('');
  const [paymentFreq, setPaymentFreq] = useState<string>();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dateEnd, setDateEnd] = useState(new Date());
  const [openEnd, setOpenEnd] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const handleAddBtn = () => {
    if(payment===''){
      Toast.warn("Please Enter Amount",'top');
      return;
    }
    if(paymentFreq ==='' || paymentFreq=== undefined){
      Toast.warn("Please Select Payment Frequency",'top');
      return;
    }
    try {
      realm.write(() => {
        realm.create('SubscriptionInfo', {
          id: info.id,
          payment: payment,
          status: 'Active',
          paymentFrequency: paymentFreq,
          startDate: date.toDateString(),
          endDate: dateEnd.toDateString(),
        });
        console.log('Subs Updated');
        Toast.success('Subscription Added');
        resetData();
      });
    } catch (error) {
      Toast.error('Subscription Update Error:', 'top');
    }
  };

  const resetData = () => {
    setpayment('');
    setAddressInput('');
    setDate(new Date());
    setDateEnd(new Date());
  };
  const AddUserPageStyles = StyleSheet.create({
    card: {
      textAlign: 'center',
      marginTop: -140,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 50, // Half of the width and height to make it circular
      margin: 10,
    },
    addNewUserBox: {
      backgroundColor: isDarkMode ? colorTheme.BOX_BG : 'white',
      marginTop: 10,
      padding: 15,
      borderRadius: 10,
      shadowColor: isDarkMode ? colorTheme.shadowColor : 'blue',
      shadowOffset: {
        width: 6,
        height: 6,
      },
      // shadowOpacity: 1.8,
      shadowRadius: 7,
      elevation: 5, // Use this for Android shadow
    },
    Datecontainer: {
      marginTop: 10,
      borderRadius: 6,
      padding: 15,
      backgroundColor: isDarkMode ? colorTheme.BOX_BG : 'white',
      flexDirection: 'row',
      justifyContent: 'space-between',
      // flex:1,
      // justifyContent:'center'
      shadowColor: isDarkMode ? colorTheme.shadowColor : 'blue',
      shadowOffset: {
        width: 6,
        height: 6,
      },
      // shadowOpacity: 1.8,
      shadowRadius: 7,
      elevation: 5, // Use this for Android shadow
    },
    label: {
      fontSize: 18,
      color: 'gray',
      // marginBottom: 20,
    },
    selectedDate: {
      fontSize: 16,
      marginVertical: 20,
    },
    textInputStyle: {
      backgroundColor: isDarkMode ? colorTheme.BOX_BG : 'gray',
      marginTop: 10,
      borderRadius: 6,
      paddingLeft: 40,
      fontWeight: '900',
      textAlign: 'right',
      shadowColor: isDarkMode ? colorTheme.shadowColor : 'blue',
      shadowOffset: {
        width: 6,
        height: 6,
      },
      // shadowOpacity: 1.8,
      shadowRadius: 7,
      elevation: 5, // Use this for Android shadow
    },
    itemTextStyle: {
      color: 'black',
    },
    containerStyle: {
      // backgroundColor:'#363636'
    },
    dropdown: {
      marginTop: 10,
      // margin: 16,
      height: 50,
      borderBottomColor: '#363636',
      borderBottomWidth: 0.5,
      backgroundColor: isDarkMode ? colorTheme.BOX_BG : 'white',
      color: 'black',
      // borderCurve:'circular'
      borderRadius: 6,
      shadowColor: isDarkMode ? colorTheme.shadowColor : 'blue',
      shadowOffset: {
        width: 6,
        height: 6,
      },
      // shadowOpacity: 1.8,
      shadowRadius: 7,
      elevation: 5, // Use this for Android shadow
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      fontSize: 16,
      marginLeft: 16,
      color: 'gray',
    },
    selectedTextStyle: {
      fontSize: 16,
      marginLeft: 16,
      color: isDarkMode ? "white" : 'black',
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });

  return (
    <View style={{backgroundColor: isDarkMode ? 'black' : 'white'}}>
      <ScrollView showsVerticalScrollIndicator={false} style={{height:'100%'}}>
        <View style={{padding: 15, marginTop: 80}}>
          <View style={AddUserPageStyles.addNewUserBox}>
            <MaterialCommunityIcons
              name="card-account-details"
              color={isDarkMode ? "white" : 'black'}
              size={250}
              style={AddUserPageStyles.card}
            />
            <Text style={{color: isDarkMode ? "white" : 'black', textAlign: 'center'}}>{info.id}</Text>
            <View>
              <MaterialCommunityIcons
                name="currency-inr"
                color={isDarkMode ? "white" : 'black'}
                size={26}
                style={{position: 'absolute', zIndex: 1, top: 25, left: 15}}
              />
              <TextInput
                style={AddUserPageStyles.textInputStyle}
                onChangeText={text => setpayment(text)}
                placeholder="Enter Payment"
                placeholderTextColor={ isDarkMode? 'gray':'white'}
                keyboardType="numeric"
                value={payment}
                maxLength={10}></TextInput>
            </View>

            <Dropdown
              style={AddUserPageStyles.dropdown}
              placeholderStyle={AddUserPageStyles.placeholderStyle}
              selectedTextStyle={AddUserPageStyles.selectedTextStyle}
              containerStyle={AddUserPageStyles.containerStyle}
              itemTextStyle={AddUserPageStyles.itemTextStyle}
              activeColor="gray"
              //inputSearchStyle={AddUserPageStyles.inputSearchStyle}
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select Payment Frequency"
              value={paymentFreq}
              onChange={item => {
                setPaymentFreq(item.value);
              }}
            />
            <View style={AddUserPageStyles.Datecontainer}>
              <TouchableOpacity onPress={() => setOpen(true)}>
                <Text>
                  <MaterialCommunityIcons
                    name="calendar-range"
                    color={isDarkMode ? "white" : 'black'}
                    size={25}
                  />
                </Text>
              </TouchableOpacity>
              <Text style={AddUserPageStyles.label}>
                Start- {date.toDateString()}
              </Text>
              <DatePicker
                modal
                open={open}
                date={date}
                mode="date"
                onConfirm={date => {
                  setOpen(false);
                  setDate(date);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </View>
            <View style={AddUserPageStyles.Datecontainer}>
              <TouchableOpacity onPress={() => setOpenEnd(true)}>
                <Text>
                  <MaterialCommunityIcons
                    name="calendar-range"
                    color={isDarkMode ? "white" : 'black'}
                    size={25}
                  />
                </Text>
              </TouchableOpacity>
              <Text style={AddUserPageStyles.label}>
                End- {dateEnd.toDateString()}
              </Text>
              <DatePicker
                modal
                open={openEnd}
                date={dateEnd}
                mode="date"
                onConfirm={date => {
                  setOpenEnd(false);
                  setDateEnd(date);
                }}
                onCancel={() => {
                  setOpenEnd(false);
                }}
              />
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: isDarkMode ? "white" : 'black',
                height: 50,
                marginTop: 10,
                borderRadius: 10,
              }}
              onPress={handleAddBtn}>
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 11,
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: !isDarkMode ? "white" : 'black',
                }}>
                Update
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
