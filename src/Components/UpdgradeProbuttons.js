import { StyleSheet, Text, TouchableOpacity, View, PermissionsAndroid } from 'react-native'
import React from 'react'
import { fontsAndcolor } from '../Constants/Colors'
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob'

const UpdgradeProbuttons = ({ index, onPress, title1, getlocalPath, buttonstate }) => {

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

    const handleShareVideo = async (path) => {
        try {
            // Check if the file exists
            const fileExists = await RNFetchBlob.fs.exists(path);

            if (!fileExists) {
                ToastAndroid.show('Video has been deleted.', ToastAndroid.SHORT);
                return;
            }

            requestStoragePermission();


            await Share.open({
                title: 'Share Video',
                type: 'video/mp4', // Make sure this matches the actual format of the video
                message: 'Check out this video!',
                url: `file://${path}`,
            });
        } catch (error) {
            console.error('Error sharing video:', error);
        }
    };
    return (
        <TouchableOpacity disabled={buttonstate} onPress={index == 0 ? onPress : null} style={[styles.buton, {
            borderWidth: index == 1 && getlocalPath != "" ? 1 : 0,
            elevation: index == 1 ? 0 : 2,
            height: getlocalPath =="" ? 50 : 50,
            width:'50%',
            width: getlocalPath != "" ? "47%" : "100%",
            borderColor: index == 1 ? fontsAndcolor.PrimaryColor : null,
            backgroundColor: index == 0 ? fontsAndcolor.PrimaryColor : null
        }]}>
            {index == 0 ?
                <View>
                    <Text style={styles.txt1}>{title1}</Text>
                </View>
                : getlocalPath == "" ?
                    <View>
                        <Text style={[styles.txt1, { color: 'black', }]}>{"Upgrade to Pro"}</Text>
                        <Text style={[styles.txt1, {
                            fontSize: 10,
                            color: 'black',
                            fontFamily: fontsAndcolor.LIGHT, top: 2
                        }]}>{"Remove ads"}</Text>
                    </View> :
                    
                    <TouchableOpacity
                        onPress={() => handleShareVideo(getlocalPath)}
                        style={{
                            // elevation: 2,
                            height: 50,
                            borderRadius: 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: "100%",
                            borderColor: fontsAndcolor.PrimaryColor,
                            backgroundColor: null
                        }}>
                        <Text style={[styles.txt1, { color: '#000' }]}>Share video</Text>

                    </TouchableOpacity>
            }
        </TouchableOpacity>
    )
}

export default UpdgradeProbuttons

const styles = StyleSheet.create({
    buton: {
        height: 70,
        borderRadius: 5,
        elevation: 2,
        alignItems: 'center', justifyContent: 'center',
        backgroundColor: 'red', width: '47%'
    },
    txt1: {
        fontSize: 14,
        width: 140,
        textAlign: 'center',
        color: '#fff',
        // fontWeight: 'bold',
        fontFamily: fontsAndcolor.SEMI_BOLD
    },
})