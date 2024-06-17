import {Linking, Platform} from 'react-native';

export const call = (phoneNumber: string) => {
  let phoneUrl = '';
  if (Platform.OS === 'android') {
    phoneUrl = `tel:${phoneNumber}`;
  } else {
    phoneUrl = `telprompt:${phoneNumber}`;
  }
  Linking.openURL(phoneUrl);
};
