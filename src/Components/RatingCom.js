import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconHalf from 'react-native-vector-icons/FontAwesome'
import { fontsAndcolor } from '../Constants/Colors';
const RatingCom = ({ update, key }) => {

  return (
    <View style={{ alignItems: 'center' }}>
      <Stars
        half={false}
        default={key}
        update={update}
        spacing={4}
        starSize={40}
        backgroundColor={"red"}
        count={5}
        fullStar={<Icon name={'star'} size={40} style={[styles.myStarStyle]} />}
        emptyStar={<Icon name={'star'} size={40} style={[styles.myStarStyle, styles.myEmptyStarStyle]} />}
        halfStar={<IconHalf name={'star-half-empty'} size={35} style={[styles.myStarStyle]} />}

      />
    </View>
  )
}

export default RatingCom

const styles = StyleSheet.create({
  myStarStyle: {
    color: fontsAndcolor.PrimaryColor,
    backgroundColor: 'transparent',
    textShadowColor: 'black',
  },
  myEmptyStarStyle: {
    color: 'grey',
  }
});