import { StyleSheet, Text, View, Image, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fontsAndcolor } from '../Constants/Colors'
import IconDot from 'react-native-vector-icons/Entypo'
import RNFS from 'react-native-fs';
import { setInstaVideoRemove } from '../Redux/Actions/appActionFiles';
import { useDispatch } from 'react-redux'
const DownloadVideo = ({ item, onPress, navigation }) => {
    const [imogy, setimogy] = useState()
    const dispatch = useDispatch()


    useEffect(() => {
        const unicodeSequence = item?.caption;
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
    }, [item])

    const _checkLocalFile = (item) => {
        const filePath = item.localPath
        RNFS.exists(filePath)
            .then(exists => {
                if (exists) {
                    navigation.navigate("Videoscreen", { item: item.localPath })

                } else {

                    setInstaVideoRemove(item.video_id)(dispatch)
                    ToastAndroid.show('Video has been deleted.', ToastAndroid.SHORT);
                }
            })
            .catch(error => {
                console.error(`Error checking file existence: ${error}`);
            });
    }
    return (
        <View style={styles.downloadCard} >
            <View style={styles.cardHandler}>
                <TouchableOpacity onPress={() => _checkLocalFile(item)} style={styles.imageView}>
                    <Image source={{ uri: `file://${item.localPath}` }} style={styles.imgStyle} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => _checkLocalFile(item)}
                    style={styles.textView}>
                    <Text style={{ fontFamily: fontsAndcolor.SEMI_BOLD }}>@{item.username}</Text>
                    <Text numberOfLines={1} style={{ fontFamily: fontsAndcolor.REGULAR, marginTop: 15 }}>{imogy}</Text>
                </TouchableOpacity>
                <View style={styles.dotView}>
                    <TouchableOpacity onPress={onPress} style={{
                        height: 60,
                        alignItems: 'center',
                        paddingTop: 10,
                        // justifyContent:'center',
                        // backgroundColor:'red',
                        width: '100%'
                    }}>
                        <IconDot name={"dots-three-vertical"} size={18} />
                    </TouchableOpacity>
                    <View />
                </View>
            </View>
        </View>
    )
}

export default DownloadVideo

const styles = StyleSheet.create({
    imageView: {
        height: 100,
        //  backgroundColor: 'yellow',
        paddingLeft: 4,
        justifyContent: 'center', width: '25%'
    },
    Playiew: {
        height: 250,
        borderRadius: 10,
        // margin:10,
        //zIndex: 999,
        // alignItems:'center',
        justifyContent: "space-evenly",
        paddingLeft: 10,
        elevation: 2,
        backgroundColor: '#fff',
        width: 250
    },
    cardShare: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        // alignSelf:'center',
        // backgroundColor:'red',
        height: '100%',
        width: '100%'
        // zIndex: 999,
        // alignSelf: 'flex-end',
        // paddingRight: 35, top: 50
    },
    dotView: {
        height: 100,
        alignItems: 'center',
        // backgroundColor:'yellow',
        // paddingTop: 10,
        width: '10%'
    },
    imgStyle: {
        height: 90,
        borderRadius: 10,
        width: "100%"
    },
    text: {
        fontSize: 14,
        borderBottomWidth: .3,
        paddingVertical: 4,
        width: 230,
        borderBottomColor: 'grey',
        fontFamily: fontsAndcolor.SEMI_BOLD,
        color: "#000"
    },
    headingtext: {
        fontSize: 14,
        // borderBottomWidth: .3,
        paddingVertical: 4,
        textAlign: 'center',
        width: 230,
        borderBottomColor: 'grey',
        fontFamily: fontsAndcolor.BOLD,
        color: "#000"
    },

    textView: {
        height: 100,
        // backgroundColor: 'green',
        //  alignItems:"center",
        paddingLeft: 6,
        justifyContent: 'center',

        width: '65%'
    },
    cardHandler: {
        height: 100,
        // backgroundColor: 'red', 
        flexDirection: 'row', width: '100%'
    },
    downloadCard: {
        width: "95%",
        marginHorizontal: 8,
        marginTop: 10,
        marginBottom: 4,
        elevation: 2,
        borderRadius: 10,
        marginRight: 4,
        // zIndex:-50,

        backgroundColor: fontsAndcolor.dowloadvideobg,
        height: 100
    },
    backgroundVideo: {
        height: 200,
        margin: 8,
        borderRadius: 10,
        width: "45%"
        // position: 'absolute',
        // top: 0,
        // flex:1,
        // left: 0,
        // bottom: 0,
        // right: 0,
    },
    video: {
        width: 300,
        // position:'absolute',
        backgroundColor: 'black',
        height: 200,
    },


    container: {
        flex: 1
    },
    img: {
        height: 300,
        resizeMode: 'contain',
        width: 300
    },
    txt: {
        fontSize: 16,
        color: '#000',
        fontFamily: fontsAndcolor.SEMI_BOLD
    },
    subcontainer: {
        // flex:1,
        // justifyContent:'center',
        alignItems: 'center'
    }
})