import {Linking} from 'react-native';

export const sendWhatsApp = (phoneNumber: string, message: string) => {
  const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(
    message,
  )}&phone=${phoneNumber}`;

  Linking.openURL(whatsappUrl);
};
