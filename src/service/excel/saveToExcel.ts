import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';

import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {PermissionsAndroid, Platform} from 'react-native';
import { Toast } from 'toastify-react-native';

const requestStoragePermission = async () => {
  if (Platform.OS === 'android') {
    const writePermission = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    const readPermission = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    console.log(writePermission,readPermission);
    if (writePermission !== RESULTS.GRANTED) {
      const writeRequest = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
      if (writeRequest !== RESULTS.GRANTED) {
        return false;
      }
    }

    if (readPermission !== RESULTS.GRANTED) {
      const readRequest = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      if (readRequest !== RESULTS.GRANTED) {
        return false;
      }
    }

    return true;
  } else {
    // On iOS, permissions are handled differently and generally not needed for file storage
    return true;
  }
};
export const saveToExcel = async (csvData: any,statingFileName:string) => {
  // const hasPermission = await requestStoragePermission();
  // if (!hasPermission) {
  //   console.log(
  //     'Permission Denied',
  //     'You need to grant storage permissions to save the file.',
  //   );
  //   return;
  // }
  try {
    const currentDate = new Date().getTime();
    const downloadDir = RNFS.DownloadDirectoryPath;
    const path = `${downloadDir}/${statingFileName}_${currentDate}.csv`;

    await RNFS.writeFile(path, csvData, 'utf8');
    // console.log('FILE WRITTEN!', path);
    Toast.success("File Save in download folder")
    // Optionally, you can implement sharing logic here
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      console.warn('User canceled the picker');
    } else {
      console.error(err);
    }
  }
};
