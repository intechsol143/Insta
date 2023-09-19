/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Orientation from 'react-native-orientation-locker';
import NetInfo from '@react-native-community/netinfo';
// Initialize NetInfo
NetInfo.configure({});
// Lock the app to portrait mode
Orientation.lockToPortrait();


AppRegistry.registerComponent(appName, () => App);
