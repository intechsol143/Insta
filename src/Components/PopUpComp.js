import { StyleSheet, Text, View, TouchableOpacity, ToastAndroid, Alert, Modal, Image, PermissionsAndroid } from 'react-native'
import React, { useState } from 'react'
import { fontsAndcolor } from '../Constants/Colors'
import { useDispatch } from 'react-redux'
import { setDeltedvideos, setInstaVideoRemove } from '../Redux/Actions/appActionFiles'
import Clipboard from "@react-native-clipboard/clipboard";
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob'
import Share from 'react-native-share';
import Button from './Button'
import ModalOverlay from './ModaOverlay'
const PopUpComp = ({ isVisible, item, sharePress, navigation, onClose }) => {
    const dispatch = useDispatch()
    const [isModalVisible, setisModalVisible] = useState(false)
    const [itemonModal, setitemonModal] = useState({})
    const [emogy, setemogy] = useState("")


    const copyToClipboard = (cap) => {
        if (cap == null) {
            Clipboard.setString("");
        } else {
            Clipboard.setString(cap);
        }
        ToastAndroid.show('Text Copied!', ToastAndroid.SHORT);
        onClose(!isVisible)

    };

    const videoPathtoRemove = (item) => {
        const filePath = item.localPath;
        RNFS.unlink(filePath)
            .then(() => {
                ToastAndroid.show('Video has been removed!', ToastAndroid.SHORT);
                onClose(!isVisible)
                console.log(`Video at path ${filePath} removed successfully.`);
            })
            .catch((error) => {
                console.error(`Error removing video at path ${filePath}:`, error);
            });
    }

    async function requestStoragePermission() {
        try {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            ]);

            if (
                granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
                granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
            ) {
                console.log('Storage permissions granted');
            } else {
                console.log('Storage permissions denied');
            }
        } catch (error) {
            console.error('Error requesting storage permissions:', error);
        }
    }

    const handleShareVideo = async (item) => {
        try {
            const fileExists = await RNFetchBlob.fs.exists(item.localPath);
            if (!fileExists) {
                ToastAndroid.show('Video has been removed!', ToastAndroid.SHORT);
                return;
            }
            requestStoragePermission();
            await Share.open({
                title: 'Share Video',
                type: 'video/mp4', // Make sure this matches the actual format of the video
                message: `${item.video_share_text}`,
                url: `file://${item.localPath}`,
            });
        } catch (error) {
            console.error('Error sharing video:', error);
        }
    };


    const handleDecode = (unicodeSequence) => {
        const newImogy = decodeUnicodeEscapeSequences(unicodeSequence);
        setemogy(newImogy)
    };
    function decodeUnicodeEscapeSequences(input) {
        return input.replace(/u([0-9a-fA-F]{4})/g, (match, group1) => {
            return String.fromCodePoint(parseInt(group1, 16));
        });
    }

    const _checkLocalFile = (item) => {

        const filePath = item.localPath
        RNFS.exists(filePath)
            .then(exists => {
                if (exists) {
                    onClose(!isVisible)
                    navigation.navigate("Videoscreen", { item: filePath })
                } else {
                    setInstaVideoRemove(item.video_id)(dispatch)
                    onClose(!isVisible)
                    ToastAndroid.show('Video has been deleted.', ToastAndroid.SHORT);
                }
            })
            .catch(error => {
                console.error(`Error checking file existence: ${error}`);
            });
    }



    return (
        <TouchableOpacity activeOpacity={1} onPress={() => onClose(!isVisible)} style={styles.cardShare}>
            {isVisible ?
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isVisible}

                >

                    <TouchableOpacity activeOpacity={1} onPress={() => onClose(!isVisible)} style={styles.centeredView1}>
                        <View style={{ alignItems: 'center' }}>
                            <View style={styles.Playiew}>
                                <Text style={styles.headingtext}>Options</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        _checkLocalFile(item)
                                    }
                                    }
                                >
                                    <Text style={styles.text}>Play Video</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => handleShareVideo(item)}
                                >
                                    <Text style={styles.text}>Share Video</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => copyToClipboard(item.caption)}>
                                    <Text style={styles.text}>Copy Caption</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    setitemonModal(item)
                                    { item.caption != null ? handleDecode(item.caption) : null }
                                    setisModalVisible(true)
                                    onClose(!isVisible)
                                }
                                }>
                                    <Text style={[styles.text, { borderBottomWidth: 0 }]}>Delete Video</Text>
                                </TouchableOpacity>

                            </View>
                        </View>

                    </TouchableOpacity>
                </Modal>
                : null
            }

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setisModalVisible(!isModalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View>
                            <View>
                                <View style={{ alignItems: 'center' }}>
                                    {/* <Text style={{ fontSize: 16, fontFamily: fontsAndcolor.SEMI_BOLD }}>Are you sure!</Text> */}
                                    <Text style={{
                                        fontSize: 14,
                                        marginTop: 5,
                                        fontFamily: fontsAndcolor.REGULAR
                                    }}>Are you sure to delete this video?</Text>
                                </View>

                                <View>
                                    <View style={{ height: 10 }} />
                                    <View style={styles.downloadCard} >
                                        <View style={styles.cardHandler}>
                                            <View style={styles.imageView}>
                                                <Image source={{ uri: `file://${itemonModal.localPath}` }} style={styles.imgStyle} />
                                            </View>
                                            <TouchableOpacity
                                                disabled={true}
                                                style={styles.textView}>
                                                <Text style={{ fontFamily: fontsAndcolor.SEMI_BOLD }}>@{itemonModal.username}</Text>
                                                <Text numberOfLines={1} style={{ fontFamily: fontsAndcolor.REGULAR, marginTop: 15 }}>{emogy}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => openModal(item)} style={styles.dotView}>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={{ height: 10 }} />
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                                        <Button
                                            title={"Cancel"}
                                            textstyle={{ color: 'black' }}
                                            onPress={() => setisModalVisible(false)}
                                            buttonstyle={{
                                                width: "45%",
                                                backgroundColor: null,
                                                elevation: 0,
                                                height: 40,
                                                borderColor: "red",
                                                borderWidth: .5
                                            }}
                                        />
                                        <Button
                                            buttonstyle={{ width: "45%", height: 40 }}
                                            title={"Delete"}
                                            onPress={() => {
                                                setInstaVideoRemove(itemonModal.video_id)(dispatch)
                                                videoPathtoRemove(itemonModal)
                                                setisModalVisible(false)
                                            }}
                                        />

                                    </View>

                                </View>
                            </View>

                        </View>


                    </View>
                </View>
            </Modal>

        </TouchableOpacity>

    )
}

export default PopUpComp

const styles = StyleSheet.create({
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
        width: 210
    },

    modalView: {
        // height: 170,
        paddingVertical: 10,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    textView: {
        height: 100,
        // backgroundColor: 'green',
        //  alignItems:"center",
        paddingLeft: 6,
        justifyContent: 'center',

        width: '65%'
    },
    imgStyle: {
        height: 90,
        borderRadius: 10,
        width: "100%"
    },
    imageView: {
        height: 100,
        //  backgroundColor: 'yellow',
        paddingLeft: 4,
        justifyContent: 'center', width: '25%'
    },
    cardShare: {
        // position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        top: "10%",
        // alignSelf:'center',
        // backgroundColor:'red',
        // height:Dimensions.get("screen").height-150,
        width: '100%'
        // zIndex: 999,
        // alignSelf: 'flex-end',
        // paddingRight: 35, top: 50
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
    dotView: {
        height: 100,
        alignItems: 'center',
        // backgroundColor:'yellow',
        paddingTop: 10,
        width: '10%'
    },

    centeredView: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        flex: 1,
        justifyContent: 'center'
    },
    centeredView1: {
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
        flex: 1,

        paddingLeft: "15%",
        // alignItems:'center',
        paddingTop: '30%'
        // justifyContent: 'center'
    },
    modalView: {
        // height: 170,
        paddingVertical: 10,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    modalParentView: { flexDirection: 'row', alignItems: 'center', marginTop: '5%', paddingHorizontal: 12 },
    text: {
        fontSize: 14,
        borderBottomWidth: .3,
        paddingVertical: 4,
        width: 190,
        borderBottomColor: 'grey',
        fontFamily: fontsAndcolor.SEMI_BOLD,
        color: "#000"
    },
    headingtext: {
        fontSize: 14,
        // borderBottomWidth: .3,
        paddingVertical: 4,
        // backgroundColor:'red',
        paddingRight: 20,
        textAlign: 'center',
        // width: 230,
        borderBottomColor: 'grey',
        fontFamily: fontsAndcolor.BOLD,
        color: "#000"
    },
})