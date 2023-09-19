import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider'
import { fontsAndcolor } from '../Constants/Colors';
import Icon from 'react-native-vector-icons/Entypo'

const CustomSeekbar = ({ value, minimumValue, maximumValue, onValueChange, onPress, onSlidingComplete, playState }) => {

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  return (
    <View style={styles.sliderContainer}>

      <View>
        <Slider
          // style={styles.slider}
          minimumValue={minimumValue}
          maximumValue={maximumValue}
          onSlidingComplete={onSlidingComplete}
          value={value}
          onValueChange={onValueChange}
          minimumTrackTintColor={fontsAndcolor.PrimaryColor}
          maximumTrackTintColor="grey"
          thumbTintColor={fontsAndcolor.PrimaryColor}
        />
        <Text style={styles.trackValues}>{formatTime(value)}</Text>

      </View>
      {/* <View style={{
        position: 'absolute',
        alignItems: 'center',
        alignSelf:'center',
        justifyContent:'center',
        height:Dimensions.get("screen").height,
   
      }}>
        <TouchableOpacity onPress={onPress} style={styles.playPauseButton}>
          {playState ? (
            <Icon name={"controller-paus"} size={50} color={"#fff"} />
          ) : (
            <Icon name={"controller-play"} size={50} color={"#fff"} />
          )}
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    // backgroundColor: 'grey',

    position: 'absolute', // Position the slider relative to the container
    left: 0,
    // backgroundColor: 'red',
    height: "100%",
    right: 0,
    justifyContent: 'flex-end',

    bottom: 80, // Adjust the bottom position as needed
    paddingHorizontal: 20,
  },
  trackValues: {
    color: 'black', fontSize: 20,
    fontFamily: fontsAndcolor.THIN,
    right: 10,
    alignSelf: "flex-end",
    textAlign: 'right',

    width: 100
  },
  slider: {
    width:Dimensions.get("screen").width-50,
  },
})

export default CustomSeekbar;
