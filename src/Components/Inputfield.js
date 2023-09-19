import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { fontsAndcolor } from '../Constants/Colors'

const Inputfield = ({ value, onChangeText,placeholderTextColor,myIcon, placeholder, newStyle,newStyle2,newStyle1,homestyle, multiline }) => {
    return (
        <View style={[styles.fieldParent,{...newStyle}]}>
            <TextInput
                value={value}
                multiline={multiline}
                onChangeText={onChangeText}
                autoCapitalize={'none'}
                placeholderTextColor={placeholderTextColor}
                selectionColor={fontsAndcolor.PrimaryColor}
                style={styles.ipfield}
                // style={[styles.ipfield, { ...newStyle,...newStyle2,...newStyle1 }]}
                placeholder={placeholder}
            />
            <View style={{ position: 'absolute', alignSelf: 'flex-end', top: 12, right: 10 }}>
                {myIcon}
            </View>
        </View>
    )
}

export default Inputfield

const styles = StyleSheet.create({
    ipfield: {
        // borderWidth: .3,
        marginVertical: 2,
        color:'black',
        // height:40,
        // backgroundColor: '#fff',
        fontFamily: fontsAndcolor.LIGHT,
        // elevation: 2,
        width: '88%',
        height: 45,
        // backgroundColor:'red',
        // color:'red',
        borderRadius: 3,
        paddingLeft: 10,
        // borderColor: 'grey'
    },
    fieldParent:{
        borderRadius: 3,
        borderWidth: .3,
        borderColor:'grey'
        // borderColor: 'grey',
        // width:'100%',
        // height: newStyle ? 150 :newStyle2 ? 50 :newStyle1 ? 50:homestyle ? 50: 50,
        // backgroundColor: '#fff',
    }
})