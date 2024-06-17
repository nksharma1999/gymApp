/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import { PaperProvider } from 'react-native-paper';
import ToastManager from 'toastify-react-native'
export default function Main() {
    return (
      <PaperProvider>
        <App />
        <ToastManager />
     </PaperProvider>
    );
  }

AppRegistry.registerComponent(appName, () => Main);
