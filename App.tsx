/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React,{useEffect} from 'react';
import { View, Text,Platform ,StatusBar} from 'react-native'
import Drawer from './src/Nav/drawer'
import { Provider } from 'react-redux'
import { Store, persistor } from './src/Redux/ConfigFile'
import { PersistGate } from 'redux-persist/integration/react'
import PushNotification from "react-native-push-notification"
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { fontsAndcolor } from './src/Constants/Colors';
import analytics from '@react-native-firebase/analytics';


// import Main from './src/Nav/Main'

function App() {


  analytics().logEvent('app_open'); 

 

  useEffect(() => {

    Platform.OS == "android" && _createChannel();
    const unsubscribe = messaging().onMessage(remoteMessage => {
      Platform.OS == "ios" &&

        PushNotificationIOS.addNotificationRequest({

          id: new Date().toString(),
          title: remoteMessage.notification?.title,
          body: remoteMessage.notification?.body,
          category: 'userAction',
          userInfo: remoteMessage.data,
        });
       


    });
    return unsubscribe;
  }, []);

  const _createChannel = () => {
    PushNotification.createChannel(
      {
        channelId: 'fcm_fallback_notification_channel',
        channelName: 'fcm_fallback_notification_channel',
        channelDescription: 'A channel to categorise your notifications',
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      () => { },
    );
  };

 
  

  return (
    <Provider store={Store}>
        <StatusBar
        backgroundColor={fontsAndcolor.PrimaryColor}
      />
      <PersistGate loading={null} persistor={persistor}>
        <View style={{ flex: 1 }}>
          <Drawer />
          {/* <Main /> */}
        </View>
      </PersistGate>
    </Provider>
  
  );
}

export default App;
