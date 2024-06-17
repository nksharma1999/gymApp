import {Linking, Platform} from 'react-native';

export const sendSMS = (phoneNumber: string, message: string) => {
  let smsUrl = '';

  if (Platform.OS === 'android') {
    smsUrl = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
  } else if (Platform.OS === 'ios') {
    smsUrl = `sms:${phoneNumber}&body=${encodeURIComponent(message)}`;
  }

  Linking.openURL(smsUrl);
};
