import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState,useEffect } from 'react'
import { fontsAndcolor } from '../Constants/Colors'
import { images } from '../Constants/images'
const DownloadItem = ({ thumbnail }) => {
    const [imogy, setimogy] = useState()


    useEffect(() => {
        const unicodeSequence = thumbnail?.caption;
        if (unicodeSequence) {
            function decodeUnicodeEscapeSequences(input) {
                return input.replace(/u([0-9a-fA-F]{4})/g, (match, group1) => {
                    return String.fromCodePoint(parseInt(group1, 16));
                });
            }
            const emojis = decodeUnicodeEscapeSequences(unicodeSequence);
            setimogy(emojis)
            console.log("emojisemojis", emojis)
        } else {
            console.warn('No caption found in the thumbnail.');
        }
    }, [thumbnail])


    return (
        <View>
            <View style={styles.videocontainer}>
                <View style={styles.imgParent}>
                    <View style={styles.imgcontainer}>
                        <Image source={{ uri: thumbnail?.thumbnail }} style={styles.img} />
                    </View>
                    <View style={{ paddingLeft: 12 }}>
                        <Text style={styles.videdexc}>@{thumbnail?.username}</Text>
                        <Text numberOfLines={1} style={[styles.videdexc, { marginTop: 10 }]}>{imogy}</Text>
                        <View style={styles.buton}>
                            <Text></Text>
                            <View style={styles.instaView}>
                                <Image source={images.insta} style={{ height: 10, width: 10, resizeMode: 'contain' }} />
                                <Text style={{ fontSize: 12, fontFamily: fontsAndcolor.LIGHT, marginLeft: 4, color: '#000' }}>Instagram</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                    </View>

                </View>
            </View>
        </View>
    )

}
export default DownloadItem

const styles = StyleSheet.create({
    videocontainer: {
        height: 100,
        elevation: 2,
        borderRadius: 10,
        backgroundColor: fontsAndcolor.dowloadvideobg,
        justifyContent: 'center'
    },
    img: {
        borderRadius: 10,
        height: 93,
        marginLeft: 4,
        width: '100%'
    },
    imgcontainer: { height: 100, width: 80, justifyContent: "center" },
    videdexc: {
        width: 220,
        color: '#000',
        fontSize: 14,
        fontFamily: fontsAndcolor.LIGHT,
        // textDecorationLine: 'underline'
    },
    buton: { flexDirection: 'row', justifyContent: 'space-between', width: '67%', top: 4 },
    imgParent: { flexDirection: 'row', alignItems: 'center' },
    instaView: {
        height: 20, width: 80,
        borderRadius: 6,
        marginTop: 6,
        alignItems: 'center',
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#fff'
    }
})