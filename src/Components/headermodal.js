import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { fontsAndcolor } from '../Constants/Colors'

const headermodal = ({ title, myIcon }) => {
    return (
        <View>
            <View style={styles.header}>
                {/* <Text></Text> */}
                <Text style={{ 
                    fontFamily: fontsAndcolor.SEMI_BOLD,
                    // left:14,
                    fontSize: 16, color: '#000' }}>{title}</Text>
                {/* <TouchableOpacity style={{height: 40,
              
                    width: 40,alignItems:'center',justifyContent:'center' }}>
                    {myIcon}
                </TouchableOpacity> */}

            </View>
        </View>
    )
}

export default headermodal

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        margin: 15,
        alignItems: 'center',
        justifyContent:'center'
    }
})