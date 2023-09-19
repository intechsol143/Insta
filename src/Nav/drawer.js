/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { View, Text, ScrollView } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
//  import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Home from '../Screens/Tabscreens/Home/Home';
import Dowloads from '../Screens/Tabscreens/Downloads/Dowloads';
import Drawer from '../Components/Drawer';
import Icon from 'react-native-vector-icons/Feather'
import Icon1 from 'react-native-vector-icons/Entypo'
import Icon2 from 'react-native-vector-icons/FontAwesome6'

import IconMenue from 'react-native-vector-icons/Feather'
import { fontsAndcolor } from '../Constants/Colors';
import Videoscreen from '../Screens/Tabscreens/Downloads/VideoPlayscreen/Videoscreen';
import { Appbar } from 'react-native-paper'
import Splashscreen from '../Screens/Splashscreen';
// import TabBar from './Tabs'
const Stack = createNativeStackNavigator()
const DrawerStack = createDrawerNavigator()
const Tab = createMaterialTopTabNavigator()





function AppDrawerStack() {
    return (
        <DrawerStack.Navigator
            drawerContent={props => <Drawer {...props} />}>
            <DrawerStack.Screen name='AppBottomStack' component={AppBottomStack}
                options={{
                    headerShown: false
                    // title: "Home",
                    // headerRight:()=>(
                    //     <Icon2 name={"medal"} style={{marginRight:15}} size={22}/>
                    // )
                }}

            />
        </DrawerStack.Navigator>
    )
}


function AppBottomStack({ navigation }) {
    return (
        <Tab.Navigator
            tabBarPosition='bottom'
        
            tabBarOptions={{
                
                activeTintColor: 'black',
                inactiveTintColor: '#525252',
                // activeBackgroundColor: 'green',
                showIcon: true,
                showLabel: true,
                iconStyle: {
                    width: 'auto',
                    height: 20,
                },
                tabStyle: {
                    backgroundColor: fontsAndcolor.PrimaryColor,
                    borederRadius: 10,
               
                    bottom: 0,
             
                    height: 70,
                    zIndex: 8
                },
            }}
        // screenOptions={({ route }) => ({
        //     lazy: true,
        //     swipeEnabled: true,
        //     tabBarScrollEnabled: true,

        //     tabBarIcon: ({ focused, color, size }) => {
        //         if (route.name === 'Home') {
        //             return (
        //                 <View style={{ alignItems: 'center' }}>
        //                     <Icon1 name={"home"} size={22} color={focused ? "#fff" : "#FF9999"} />
        //                     <Text style={{
        //                         fontSize: 10,
        //                         color: focused ? "#fff" :"#FF9999",
        //                         fontFamily:focused ? fontsAndcolor.BOLD : fontsAndcolor.REGULAR

        //                     }}>Home</Text>
        //                 </View>

        //             );
        //         } else if (route.name === 'Downloads') {
        //             return (
        //                 <View style={{ alignItems: 'center' }}>
        //                     <Icon name={"download"} size={22} color={focused ? "#fff" :"#FF9999"} />
        //                     <Text style={{
        //                         fontSize: 10,
        //                         color: focused ? "#fff" :"#FF9999",
        //                         fontFamily:focused ? fontsAndcolor.BOLD : fontsAndcolor.REGULAR

        //                     }}>Downloads</Text>
        //                 </View>

        //             );
        //         }

        //     },
        //     tabBarActiveTintColor: "#fff",
        //     tabBarInactiveTintColor: 'gray',
        //     tabBarStyle: {
        //         // paddingBottom: 10,

        //         backgroundColor:fontsAndcolor.PrimaryColor,
        //         position: 'absolute',
        //         borderTopLeftRadius:15,
        //         borderTopRightRadius:15,
        //         bottom: 0,
        //         padding: 10,
        //         // width: DEVICE_WIDTH,
        //         height: 70,
        //         zIndex: 8
        //     },
        //     tabBarLabelStyle: {
        //         fontSize: 9,
        //         //   fontFamily: ,
        //     },
        //     headerTitleStyle: {
        //         fontSize: 18,
        //     },

        //     headerTitleAlign: 'center',
        //     headerTintColor: 'black',

        // })}
        >
            <Tab.Screen
                name='Home'
                component={Home}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text style={{
                            fontSize: 10,
                            color: focused ? "#fff" : "#FF9999",
                            fontFamily: focused ? fontsAndcolor.BOLD : fontsAndcolor.REGULAR
                        }}>Home</Text>
                    ),
                    tabBarIcon: ({ focused }) => (
                        <Icon1 name={"home"} size={22} color={focused ? "#fff" : "#FF9999"} />
                    )

                }}

            // options={{
            //     tabBarLabel: "",

            //     headerTintColor: '#fff',
            //     headerTitleStyle:{
            //         fontSize:18,
            //         fontFamily:fontsAndcolor.SEMI_BOLD
            //     },
            //     headerStyle: {
            //         height: 80, backgroundColor: fontsAndcolor.PrimaryColor,
            //         borderBottomLeftRadius: 20,
            //         borderBottomRightRadius: 20
            //     },
            //     headerLeft: () => (
            //         <IconMenue name={"menu"}
            //             color={"#fff"}
            //             size={22} style={{ margin: 6, marginLeft: 10 }} onPress={() => navigation.openDrawer()} />
            //     )
            // }}

            />
            <Tab.Screen
                name='Downloads'
                component={Dowloads}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text style={{
                            fontSize: 10,
                            color: focused ? "#fff" : "#FF9999",
                            fontFamily: focused ? fontsAndcolor.BOLD : fontsAndcolor.REGULAR
                        }}>Downloads</Text>
                    ),
                    tabBarIcon: ({ focused }) => (
                        <Icon name={"download"} size={22} color={focused ? "#fff" : "#FF9999"} />
                    )

                }}

            // options={{
            //     tabBarLabel: "",
            //     headerTintColor: '#fff',
            //     headerStyle: {
            //         height: 80, backgroundColor: fontsAndcolor.PrimaryColor,
            //         borderBottomLeftRadius: 20,
            //         borderBottomRightRadius: 20
            //     },
            //     headerLeft: () => (
            //         <IconMenue name={"menu"}
            //             color={"#fff"}
            //             size={22} style={{ margin: 6, marginLeft: 10 }} onPress={() => navigation.openDrawer()} />
            //     )
            // }}
            />
        </Tab.Navigator>
    )
}


function DrawerNav() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Splash' component={Splashscreen} options={{headerShown:false}}/>
                <Stack.Screen name="AppDrawerStack" component={AppDrawerStack} options={{ headerShown: false }} />
                <Stack.Screen name="Videoscreen" component={Videoscreen}
                    options={{
                        tabBarLabel: "",
                        headerTintColor: '#fff',
                        title: 'Video Clip',
                        headerTitleStyle: {
                            fontSize: 18,
                            fontFamily: fontsAndcolor.SEMI_BOLD
                        },
                        headerStyle: {
                            height: 80, backgroundColor: fontsAndcolor.PrimaryColor,
                            borderBottomLeftRadius: 20,
                            borderBottomRightRadius: 20
                        },

                        // headerShown: false
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default DrawerNav;
