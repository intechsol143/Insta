import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { fontsAndcolor } from '../Constants/Colors'

const Header = ({myIcon,title}) => {
    return (
        <View style={styles.headerstyle}>
            {myIcon}
            <Text style={styles.headerTitle}>{title}</Text>
            <Text></Text>

        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    headerTitle:{
        fontSize:16,
        color:'#fff',
        right:6,
        fontFamily:fontsAndcolor.SEMI_BOLD
    },
    headerstyle:{
        height: 70,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        flexDirection:"row",
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:12,
        backgroundColor: fontsAndcolor.PrimaryColor
    }
})