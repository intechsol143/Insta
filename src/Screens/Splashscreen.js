import { Alert, ImageBackground, StyleSheet, Text, View, ActivityIndicator, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { images } from '../Constants/images'
import * as Progress from 'react-native-progress';
import Loader from '../Components/Loader';
import { fontsAndcolor } from '../Constants/Colors';
import DeviceInfo from "react-native-device-info";
const Splashscreen = ({ navigation }) => {
    const isTablet = DeviceInfo.isTablet();

    if (isTablet) {
        console.log('This device is a tablet.', isTablet);
    } else {
        console.log('This device is not a tablet.');
    }
    const [progress, setProgress] = useState(0);
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    console.log(`Screen width: ${screenWidth}, Screen height: ${screenHeight}`)
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prevProgress) => prevProgress + 0.3); // Increase progress by 20% every second
        }, 1000);

        // After 5 seconds (5000 milliseconds), clear the interval and call onFinish
        setTimeout(() => {
            clearInterval(interval);
            onFinish();
        }, 3000);

        return () => {
            clearInterval(interval); // Cleanup
        };
    }, []);


    const onFinish = () => {
        navigation.navigate("AppDrawerStack")
    }
    return (
        <View style={{ flex: 1, backgroundColor: "#FFF1F2" }}>
            <ImageBackground
                resizeMode={isTablet ? "contain":"cover"}
                source={isTablet ? images.tabletsplash : images.splash} style={[styles.container, { height: screenHeight, width: screenWidth }]}>
                <View style={{
                    flex: 1, alignItems: 'center',
                    paddingBottom:isTablet ? "35%"  : "40%",
                    justifyContent: 'flex-end'
                }}>
                    {/* <Progress.Bar progress={progress} width={200} /> */}
                    {/* <Loader /> */}
                    <View style={{
                        // backgroundColor:fontsAndcolor.dowloadvideobg,
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 50,

                        width: 80, borderRadius: 25
                    }}>
                        {/* <Image source={require("../assets/gifloader.gif")} style={{
                        height:50,width:50}}/> */}
                        <ActivityIndicator
                            color={"#fff"}
                            size={'large'}
                        // animating={progress}
                        />
                        <Text style={{
                            width: 200,
                            textAlign: 'center',
                            fontFamily: fontsAndcolor.REGULAR, top: 20, color: '#fff'
                        }}>Loading...!</Text>

                    </View>


                </View>
            </ImageBackground>
        </View>

    )
}

export default Splashscreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})