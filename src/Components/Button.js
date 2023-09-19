import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { fontsAndcolor } from '../Constants/Colors'

const Button = ({ title, buttonstyle,textstyle,onPress,buttonstate }) => {
    console.log("----------===",buttonstate)
    return (
        <TouchableOpacity disabled={buttonstate} onPress={onPress} style={[styles.button, { ...buttonstyle }]}>
            <Text style={[styles.titlestyle,{...textstyle}]}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    button: {
        height: 50,
        elevation:2,
        marginVertical:5,
        // margin:5,
        borderRadius:5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: fontsAndcolor.PrimaryColor,
        width: '100%'
    },
    titlestyle:{
        color:'#fff',
        fontSize:16,
        fontFamily:fontsAndcolor.MEDIUM,
    }
})