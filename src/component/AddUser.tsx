import {useState} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {Button, TextInput} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import uuid from 'react-native-uuid';
import ImagePicker from 'react-native-image-crop-picker';
import realm from '../db/dbSchema';
import { Toast } from 'toastify-react-native';
import { colorTheme } from '../service/colorTheme';

const data = [
  {label: 'Male', value: 'Male'},
  {label: 'Female', value: 'Female'},
  {label: 'Other', value: 'Other'},
];

//const realm = new Realm({schema: [ContactSchema]});
// uuid

const defaultImage = 'https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg'
export const AddUser = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [image, setImage] = useState<string>(defaultImage);

  const [nameInput, setNameInput] = useState<string>('');
  const [phoneInput, setPhoneInput] = useState<string>('');
  const [addressInput, setAddressInput] = useState<string>('');
  const [gender, setGender] = useState<string>();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dateDOJ, setDateDOJ] = useState(new Date());
  const [openDOJ, setOpenDOJ] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const handleAddBtn = () => {
    if(nameInput===''||phoneInput===''||addressInput===''|| gender===''){
      Toast.warn("Please Enter Input",'top')
      return;
    }
    if(phoneInput.length!==10){
      Toast.warn("Phone Number Invalid",'top');
      return;
    }
    try {
      const newId = uuid.v4();
      realm.write(() => {
        realm.create('Contact5', {
          id: newId,
          name: nameInput,
          phone: phoneInput,
          gender: gender,
          address: addressInput,
          dob: date.toDateString(),
          dateDOJ: dateDOJ.toDateString(),
          image: image,
          status: 'Active',
        });
      });
      Toast.success('User Added')
    } catch (error) {
      Toast.error('Enter All Info','top')
    }
  };

  const resetData = () => {
    setNameInput('');
    setPhoneInput('');
    setAddressInput('');
    setDate(new Date());
    setDateDOJ(new Date());
    setImage(defaultImage)
  };
  const selectImage = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      includeBase64: true,
      cropperCircleOverlay: true,
      avoidEmptySpaceAroundImage: true,
      freeStyleCropEnabled: true,
    })
      .then(image => {
        const data2 = `data:${image.mime};base64,${image.data}`;
        setImage(data2);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const AddUserPageStyles = StyleSheet.create({
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
      backgroundColor: isDarkMode ? colorTheme.BOX_BG : 'white',
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
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: isDarkMode ? 'black' :'white'}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={resetData} />
      }>
      <View style={{padding: 15, marginTop: 18}}>
        <View style={AddUserPageStyles.addNewUserBox}>
          <View style={{alignItems: 'center', marginTop: -70}}>
            <TouchableOpacity onPress={selectImage}>
              <Image
                source={{
                  uri: image,
                }}
                style={AddUserPageStyles.image}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontWeight: '800',
              marginBottom: 0,
              color: 'gray',
            }}>
            New Customer
          </Text>
          <View>
            <MaterialCommunityIcons
              name="account"
              color={isDarkMode ? "white" : 'black'}
              size={26}
              style={{position: 'absolute', zIndex: 1, top: 25, left: 15}}
            />
            <TextInput
              style={AddUserPageStyles.textInputStyle}
              placeholder="Enter Name"
              value={nameInput}
              onChangeText={text => setNameInput(text)}></TextInput>
          </View>
          <View>
            <MaterialCommunityIcons
              name="phone"
              color={isDarkMode ? "white" : 'black'}
              size={26}
              style={{position: 'absolute', zIndex: 1, top: 25, left: 15}}
            />
            <TextInput
              style={AddUserPageStyles.textInputStyle}
              onChangeText={text => setPhoneInput(text)}
              placeholder="Enter Phone"
              keyboardType="numeric"
              value={phoneInput}
              maxLength={10}></TextInput>
          </View>
          {/* <TextInput
          style={AddUserPageStyles.textInputStyle}
          onChangeText={text => seSPlan(text)}
          placeholder="Subscription Month Number"
          keyboardType="numeric"
          value={sPlan?.toString()}
          maxLength={10}></TextInput> */}
          {/* <TextInput
          style={styles.textInputStyle}
          onChangeText={text => setAmount(text)}
          placeholder="Payment Amount"
          keyboardType="numeric"
          value={amount?.toString()}
          maxLength={10}></TextInput> */}
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
            placeholder="Select Gender"
            value={gender}
            onChange={item => {
              setGender(item.value);
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
            <Text style={AddUserPageStyles.label}>DOB- {date.toDateString()}</Text>
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
            <TouchableOpacity onPress={() => setOpenDOJ(true)}>
              <Text>
                <MaterialCommunityIcons
                  name="calendar-range"
                  color={isDarkMode ? "white" : 'black'}
                  size={25}
                />
              </Text>
            </TouchableOpacity>
            <Text style={AddUserPageStyles.label}>DOJ- {dateDOJ.toDateString()}</Text>
            <DatePicker
              modal
              open={openDOJ}
              date={dateDOJ}
              mode="date"
              onConfirm={date => {
                setOpenDOJ(false);
                setDateDOJ(date);
              }}
              onCancel={() => {
                setOpenDOJ(false);
              }}
            />
          </View>

          <View>
            <MaterialCommunityIcons
              name="office-building-marker-outline"
              color={isDarkMode ? "white" : 'black'}
              size={26}
              style={{position: 'absolute', zIndex: 1, top: 25, left: 15}}
            />
            <TextInput
              style={AddUserPageStyles.textInputStyle}
              placeholder="Enter Address"
              value={addressInput}
              onChangeText={text => setAddressInput(text)}></TextInput>
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
              ADD
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
        style={{backgroundColor: 'blue', height: 50}}
        onPress={fetchContacts}>
        <Text
          style={{
            textAlign: 'center',
            marginTop: 11,
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          Get Data
        </Text>
      </TouchableOpacity> */}
        </View>
      </View>
    </ScrollView>
  );
};


