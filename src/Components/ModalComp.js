import { StyleSheet, Text, View, Alert, Image, TouchableOpacity, Share, Linking } from 'react-native'
import React, { useState } from 'react'
import Headermodal from './headermodal'
import Icon from 'react-native-vector-icons/Entypo'
import { fontsAndcolor } from '../Constants/Colors'
import Button from './Button'
import { images } from '../Constants/images'
import IconCheck from 'react-native-vector-icons/AntDesign'
import WhatsAppIcon from 'react-native-vector-icons/FontAwesome5Pro'
import MaterialCoumunity from 'react-native-vector-icons/MaterialCommunityIcons'
import IconUpdate from 'react-native-vector-icons/Feather'
import EmailIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import MailIcon from 'react-native-vector-icons/Ionicons'
import RatingCom from './RatingCom'
import Inputfield from './Inputfield'
// import ModalOverlay from './ModaOverlay'
import Modal from "react-native-modal";
import { rateApi, shareApi } from '../Utils/apis'
import Loader from './Loader'
const ModalComp = ({ state, modallValue, onPress }) => {
    const [stars, setstars] = useState(0)
    const [loading, setloading] = useState(false)
    console.log("starsstars", stars)




    const _rateApp = () => {
        setloading(true)
        rateApi().then((responce) => {
            setloading(false)
            Linking.openURL(responce.setting.content)
            onPress()
        }).catch((error) => {
            setloading(false)

            console.log("Error", error)
        })

    }
    return (
        <View>
            {loading && <Loader />}
            {modallValue == "rate" ?
                <Modal
                    animationInTiming={1}
                    animationOutTiming={1}
                    transparent={true}
                    style={{ margin: 0 }}
                    isVisible={state}
                    onBackButtonPress={() => onPress()}
                    onBackdropPress={() => onPress()}
                >

                    <View
                    >
                        <View style={styles.modalView}>
                            <Headermodal
                                title={"Rate the app"}

                            />
                            <View style={styles.modalParentView}>
                                <View>
                                    <Text style={{
                                        fontFamily: fontsAndcolor.LIGHT,
                                        color: '#000',
                                        textAlign: 'center'
                                    }}>Do you like the app.? Please give 5 star rating to support us.</Text>
                                    <View style={{ height: 20 }} />
                                    <RatingCom
                                        key={stars}
                                        update={(a) => {
                                            setstars(a)
                                        }}
                                    />

                                    <View style={{ flexDirection: 'row', marginTop: '10%', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Button
                                            textstyle={{ color: 'black' }}
                                            buttonstyle={{
                                                width: '45%',
                                                height: 40,
                                                alignSelf: 'center',
                                                bottom: 5,
                                                elevation: 0,
                                                backgroundColor: null,
                                                borderWidth: .5,
                                                borderColor: fontsAndcolor.PrimaryColor
                                            }}
                                            title={"Close"}
                                            onPress={onPress}
                                        />
                                        <Button
                                            buttonstyle={{
                                                width: '45%',
                                                height: 40,
                                                alignSelf: 'center',
                                                bottom: 5
                                            }}
                                            title={"Submit"}
                                            onPress={() => _rateApp()}
                                        />

                                    </View>
                                    {/* <Button
                                        buttonstyle={{
                                            marginTop: "10%",
                                            width: '50%',
                                            height: 40,
                                            alignSelf: 'center',
                                            bottom: 5

                                        }}
                                        title={"Rate Now"}
                                        onPress={onPress}
                                    /> */}
                                </View>

                            </View>
                        </View>
                    </View>

                </Modal>
                : modallValue == "share" ?
                    <Modal
                        // animationType="slide"
                        animationInTiming={1}
                        animationOutTiming={1}
                        transparent={true}
                        isVisible={state}
                        onBackButtonPress={() => onPress()}
                        onBackdropPress={() => onPress()}
                    >
                        <View>
                            <View style={styles.modalView}>
                                <Headermodal
                                    title={"Share"}

                                />
                                <View style={{ width: '100%' }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        paddingVertical: 15,
                                        paddingHorizontal: 24,
                                        alignItems: 'baseline', justifyContent: 'space-around'
                                    }}>
                                        <TouchableOpacity style={{ alignItems: 'center' }}>
                                            <WhatsAppIcon name={"whatsapp-square"} color={"#25D366"} size={45} />
                                            <Text style={styles.txt}>WhatsApp</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ alignItems: 'center' }}>
                                            <Image source={images.insta} style={{
                                                height: 40,
                                                width: 40
                                            }} />
                                            <Text style={[styles.txt, { marginTop: 7 }]}>Instagram</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ alignItems: 'center' }}>
                                            <MaterialCoumunity name={"android-messages"} color={"#25D366"} size={45} />
                                            <Text style={styles.txt}>Messages</Text>
                                        </TouchableOpacity>

                                    </View>
                                    <Button
                                        buttonstyle={{
                                            marginTop: "10%",
                                            width: '50%',
                                            height: 40,
                                            alignSelf: 'center',
                                            bottom: 5

                                        }}
                                        onPress={onPress}
                                        title={"Close"}
                                    />
                                </View>
                            </View>
                        </View>
                    </Modal> : modallValue == "feedback" ?
                        <Modal
                            // animationType="slide"
                            animationInTiming={1}
                            animationOutTiming={1}
                            transparent={true}
                            isVisible={state}
                            onBackButtonPress={() => onPress()}
                            onBackdropPress={() => onPress()}
                        >
                            <View>
                                <View style={styles.modalView}>
                                    <Headermodal
                                        title={"Send Feedback"}
                                    // myIcon={<Icon name={"cross"}
                                    //     onPress={onPress}
                                    //     size={20} color={fontsAndcolor.PrimaryColor} />}
                                    />
                                    <View style={styles.modalParentView}>
                                        <View style={{ width: '100%' }}>
                                            <Inputfield
                                                placeholder={"Name"}
                                            />
                                            {/*
                                            <View style={styles.spacer} />
                                            <Inputfield
                                                placeholder={"Email"}
                                            />
                                            <View style={styles.spacer} />
                                            <Inputfield
                                                placeholder={"Message"}
                                            /> */}
                                            {/* <Button
                                                buttonstyle={{ marginTop: "10%", bottom: 10 }}
                                                title={"Send"}
                                                onPress={onPress}
                                            /> */}
                                        </View>

                                    </View>
                                </View>
                            </View>
                        </Modal>
                        : modallValue == "updates" ?
                            <Modal
                                // animationType="slide"
                                animationInTiming={1}
                                animationOutTiming={1}
                                transparent={true}
                                isVisible={state}
                                onBackButtonPress={() => onPress()}
                                onBackdropPress={() => onPress()}
                            >
                                <View>
                                    <View style={styles.modalView}>
                                        <Headermodal
                                            title={"Searching for updates"}
                                        // myIcon={<Icon name={"cross"}
                                        //     onPress={onPress}
                                        //     size={20} color={fontsAndcolor.PrimaryColor} />}
                                        />
                                        <View style={styles.modalParentView}>
                                            <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                                                <IconUpdate name={"loader"} size={80} color={fontsAndcolor.PrimaryColor} style={{ bottom: 10 }} />
                                                <Text style={{
                                                    fontFamily: fontsAndcolor.LIGHT,
                                                    color: '#000',
                                                    textAlign: 'center'
                                                }}>New update has been installed.</Text>
                                                <Button
                                                    buttonstyle={{ marginTop: "10%", bottom: 10 }}
                                                    title={"Done"}
                                                />
                                            </View>

                                        </View>
                                    </View>
                                </View>
                            </Modal>
                            : modallValue == "payment" ?
                                <Modal
                                    // animationType="slide"
                                    animationInTiming={1}
                                    animationOutTiming={1}
                                    transparent={true}
                                    isVisible={state}
                                    onBackButtonPress={() => onPress()}
                                    onBackdropPress={() => onPress()}
                                >

                                    <View>
                                        <View style={styles.modalView}>
                                            <Headermodal
                                                title={"Payments"}
                                                myIcon={<Icon name={"cross"}
                                                    onPress={onPress}
                                                    size={20} color={fontsAndcolor.PrimaryColor} />}
                                            />
                                            <View style={styles.modalParentView}>
                                                <View>
                                                    <View style={styles.recordParent1}>
                                                        <View style={styles.checkCircle1}>
                                                            <IconCheck name={"check"} color={"#fff"} size={10} />
                                                        </View>
                                                        <View style={styles.itemsView}>
                                                            <Text style={styles.headerTxt}>No ads</Text>
                                                            <Text style={styles.sTitle}>Smoothing experience downloading videos without any ads wasting your time.</Text>
                                                        </View>
                                                    </View>
                                                    <View style={styles.recordParent}>
                                                        <View style={styles.checkCircle1}>
                                                            <IconCheck name={"check"} color={"#fff"} size={10} />
                                                        </View>
                                                        <View style={styles.itemsView}>
                                                            <Text style={styles.headerTxt}>Auto Download</Text>
                                                            <Text style={styles.sTitle}>Smoothing experience downloading videos without any ads wasting your time.</Text>
                                                        </View>
                                                    </View>
                                                    <View style={styles.recordParent}>
                                                        <View style={styles.checkCircle1}>
                                                            <IconCheck name={"check"} color={"#fff"} size={10} />
                                                        </View>
                                                        <View style={styles.itemsView}>
                                                            <Text style={styles.headerTxt}>Multi Download</Text>
                                                            <Text style={styles.sTitle}>Smoothing experience downloading videos without any ads wasting your time.</Text>
                                                        </View>
                                                    </View>
                                                    <View style={styles.recordParent}>
                                                        <View style={styles.checkCircle1}>
                                                            <IconCheck name={"check"} color={"#fff"} size={10} />
                                                        </View>
                                                        <View style={styles.itemsView}>
                                                            <Text style={styles.headerTxt}>Best Price</Text>
                                                            <Text style={styles.sTitle}>Smoothing experience downloading videos without any ads wasting your time.</Text>
                                                        </View>
                                                    </View>

                                                </View>


                                            </View>
                                            <Button
                                                buttonstyle={{
                                                    marginTop: "15%",
                                                    width: '90%',
                                                    alignSelf: 'center',

                                                    bottom: 10

                                                }}
                                                title={"Done"}
                                            />
                                        </View>
                                    </View>
                                </Modal>
                                : modallValue == "imunity" ?
                                    <Modal
                                        // animationType="slide"
                                        animationInTiming={1}
                                        animationOutTiming={1}
                                        transparent={true}
                                        isVisible={state}
                                        onBackButtonPress={() => onPress()}
                                        onBackdropPress={() => onPress()}
                                    >

                                        <View>
                                            <View style={styles.modalView}>
                                                <Headermodal
                                                    title={"Imunity"}

                                                />
                                                <View style={styles.modalParentView}>
                                                    <View>
                                                        <View style={styles.recordParent1}>
                                                            <View style={styles.itemsView2}>
                                                                <View style={styles.checkCircle}>
                                                                    <IconCheck name={"check"} color={"#fff"} size={10} />
                                                                </View>
                                                                <Text style={styles.sTitle2}>Smoothing experience downloading videos without any ads wasting your time.</Text>
                                                            </View>
                                                        </View>
                                                        <View style={styles.recordParent}>
                                                            <View style={styles.itemsView2}>
                                                                <View style={styles.checkCircle}>
                                                                    <IconCheck name={"check"} color={"#fff"} size={10} />
                                                                </View>
                                                                <Text style={styles.sTitle2}>Smoothing experience downloading videos without any ads wasting your time.</Text>
                                                            </View>
                                                        </View>
                                                        <View style={styles.recordParent}>
                                                            <View style={styles.itemsView2}>

                                                                <View style={styles.checkCircle}>
                                                                    <IconCheck name={"check"} color={"#fff"} size={10} />
                                                                </View>
                                                                <Text style={styles.sTitle2}>Smoothing experience downloading videos without any ads wasting your time.</Text>
                                                            </View>
                                                        </View>


                                                    </View>


                                                </View>
                                                {/* <Button
                                                    buttonstyle={{
                                                        marginTop: "15%",
                                                        width: '90%',
                                                        alignSelf: 'center',

                                                        bottom: 10

                                                    }}
                                                    title={"Done"}
                                                /> */}
                                            </View>
                                        </View>
                                    </Modal>

                                    : modallValue == "intro" ?
                                        <Modal
                                            // animationType="slide"
                                            animationInTiming={1}
                                            animationOutTiming={1}
                                            transparent={true}
                                            isVisible={state}
                                            onBackButtonPress={() => onPress()}
                                            onBackdropPress={() => onPress()}
                                        >
                                            {/* <ModalOverlay onPress={onPress} /> */}
                                            <View>
                                                <View style={styles.modalView}>
                                                    <Headermodal
                                                        title={"Introduction"}
                                                    // myIcon={<Icon name={"cross"}
                                                    //     onPress={onPress}
                                                    //     size={20} color={fontsAndcolor.PrimaryColor} />}
                                                    />
                                                    <View style={styles.modalParentView}>
                                                        <View>
                                                            <View style={styles.recordParent1}>
                                                                <View style={styles.itemsView2}>
                                                                    <View style={styles.checkCircle}>
                                                                        <IconCheck name={"check"} color={"#fff"} size={10} />
                                                                    </View>
                                                                    <Text style={styles.sTitle2}>Pro downloader is an application which can download Instagram Public Videos.</Text>
                                                                </View>
                                                            </View>
                                                            <View style={styles.recordParent}>
                                                                <View style={styles.itemsView2}>
                                                                    <View style={styles.checkCircle}>
                                                                        <IconCheck name={"check"} color={"#fff"} size={10} />
                                                                    </View>
                                                                    <Text style={styles.sTitle2}>Copy the video URL from Instagram..</Text>
                                                                </View>
                                                            </View>
                                                            <View style={styles.recordParent}>
                                                                <View style={styles.itemsView2}>
                                                                    <View style={styles.checkCircle}>
                                                                        <IconCheck name={"check"} color={"#fff"} size={10} />
                                                                    </View>
                                                                    <Text style={styles.sTitle2}>App will auto detect the copied link, now click on Download button.</Text>
                                                                </View>
                                                            </View>
                                                            <View style={styles.recordParent}>
                                                                <View style={styles.itemsView2}>
                                                                    <View style={styles.checkCircle}>
                                                                        <IconCheck name={"check"} color={"#fff"} size={10} />
                                                                    </View>
                                                                    <Text style={styles.sTitle2}>Now wait app will download the video and saved to your device..</Text>
                                                                </View>
                                                            </View>


                                                        </View>


                                                    </View>
                                                    <Button
                                                        buttonstyle={{
                                                            marginTop: "15%",
                                                            width: '50%',
                                                            height: 40,
                                                            alignSelf: 'center',

                                                            bottom: 5

                                                        }}
                                                        onPress={onPress}
                                                        title={"Close"}
                                                    />
                                                </View>
                                            </View>
                                        </Modal>
                                        : modallValue == "faqs" ?
                                            <Modal
                                                // animationType="slide"
                                                animationInTiming={1}
                                                animationOutTiming={1}
                                                transparent={true}
                                                isVisible={state}
                                                onBackButtonPress={() => onPress()}
                                                onBackdropPress={() => onPress()}
                                            >
                                                <View>
                                                    <View style={styles.modalView}>
                                                        <Headermodal
                                                            title={"FAQS"}

                                                        />
                                                        <Text style={[styles.txt, { textAlign: 'center' }]}>Comming soon...</Text>
                                                        {/* <Text style={[styles.txt, { textAlign: 'center' }]}>Why can't i download the video?.</Text> */}

                                                        {/* <View style={styles.modalParentView}>
                                                            <View>
                                                                <Text style={[styles.txt, { paddingLeft: 12, fontSize: 12 }]}>There are some reason which cause your download to fail.</Text>
                                                                <View style={{ height: 15 }} />
                                                                <View style={styles.recordParent1}>
                                                                    <View style={styles.itemsView2}>
                                                                        <View style={styles.checkCircle}>
                                                                            <IconCheck name={"check"} color={"#fff"} size={10} />
                                                                        </View>
                                                                        <Text style={styles.sTitle2}>Smoothing experience downloading videos without any ads wasting your time.</Text>
                                                                    </View>
                                                                </View>
                                                                <View style={styles.recordParent}>
                                                                    <View style={styles.itemsView2}>
                                                                        <View style={styles.checkCircle}>
                                                                            <IconCheck name={"check"} color={"#fff"} size={10} />
                                                                        </View>
                                                                        <Text style={styles.sTitle2}>Smoothing experience downloading videos without any ads wasting your time.</Text>
                                                                    </View>
                                                                </View>
                                                                <View style={styles.recordParent}>
                                                                    <View style={styles.itemsView2}>

                                                                        <View style={styles.checkCircle}>
                                                                            <IconCheck name={"check"} color={"#fff"} size={10} />
                                                                        </View>
                                                                        <Text style={styles.sTitle2}>Smoothing experience downloading videos without any ads wasting your time.</Text>
                                                                    </View>
                                                                </View>
                                                                <Text style={[styles.txt, { paddingLeft: 12, fontSize: 12, marginTop: 10 }]}>Where are videos download after being downloads?</Text>
                                                                <Text style={[styles.sTitle2, { paddingLeft: 12, fontSize: 12, marginTop: 10 }]}>They are usualy saved where you want to set the saving location.</Text>

                                                                <Text style={[styles.txt, { paddingLeft: 12, fontSize: 12, marginTop: 10 }]}>Where are videos download after being downloads.</Text>
                                                                <Text style={[styles.sTitle2, {
                                                                    paddingLeft: 12, fontSize: 12,
                                                                    marginBottom: 10,
                                                                    marginTop: 10
                                                                }]}>They are usualy saved where you want to set the saving location.</Text>

                                                            </View>


                                                        </View> */}
                                                        <Button
                                                            buttonstyle={{
                                                                marginTop: "10%",
                                                                width: '50%',
                                                                height: 40,
                                                                alignSelf: 'center',
                                                                bottom: 5

                                                            }}
                                                            onPress={onPress}
                                                            title={"Close"}
                                                        />
                                                    </View>
                                                </View>
                                            </Modal>
                                            : modallValue == "how" ?

                                                <Modal
                                                    // animationType="slide"
                                                    animationInTiming={1}
                                                    animationOutTiming={1}
                                                    transparent={true}
                                                    isVisible={state}
                                                    onBackButtonPress={() => onPress()}
                                                    onBackdropPress={() => onPress()}
                                                >
                                                    <View>
                                                        <View style={styles.modalView}>
                                                            <Headermodal
                                                                title={"How to Download"}

                                                            />
                                                            <View style={styles.modalParentView}>
                                                                <View>
                                                                    <View style={styles.recordParent1}>
                                                                        <View style={styles.itemsView2}>
                                                                            <View style={styles.checkCircle}>
                                                                                <IconCheck name={"check"} color={"#fff"} size={10} />
                                                                            </View>
                                                                            <Text style={styles.sTitle2}>Open Instagram application.</Text>
                                                                        </View>
                                                                    </View>
                                                                    <View style={styles.recordParent}>
                                                                        <View style={styles.itemsView2}>
                                                                            <View style={styles.checkCircle}>
                                                                                <IconCheck name={"check"} color={"#fff"} size={10} />
                                                                            </View>
                                                                            <Text style={styles.sTitle2}>Copy the video link you want to download.</Text>
                                                                        </View>
                                                                    </View>
                                                                    <View style={styles.recordParent}>
                                                                        <View style={styles.itemsView2}>
                                                                            <View style={styles.checkCircle}>
                                                                                <IconCheck name={"check"} color={"#fff"} size={10} />
                                                                            </View>
                                                                            <Text style={styles.sTitle2}>Open Pro Downloader App and the link will be automatically pasted.</Text>
                                                                        </View>
                                                                    </View>

                                                                    <View style={styles.recordParent}>
                                                                        <View style={styles.itemsView2}>
                                                                            <View style={styles.checkCircle}>
                                                                                <IconCheck name={"check"} color={"#fff"} size={10} />
                                                                            </View>
                                                                            <Text style={styles.sTitle2}>Click on Download button and enjoy.</Text>
                                                                        </View>
                                                                    </View>

                                                                </View>


                                                            </View>
                                                            <Button
                                                                buttonstyle={{
                                                                    marginTop: "10%",
                                                                    width: '50%',
                                                                    height: 40,
                                                                    alignSelf: 'center',
                                                                    bottom: 5

                                                                }}
                                                                onPress={onPress}
                                                                title={"Close"}
                                                            />
                                                        </View>
                                                    </View>
                                                </Modal>
                                                : modallValue == "suport" ?
                                                    <Modal
                                                        // animationType="slide"
                                                        animationInTiming={1}
                                                        animationOutTiming={1}
                                                        transparent={true}
                                                        isVisible={state}
                                                        onBackButtonPress={() => onPress()}
                                                        onBackdropPress={() => onPress()}
                                                    >
                                                        <View>
                                                            <View style={styles.modalView}>
                                                                <Headermodal
                                                                    title={"Suport"}
                                                                />
                                                                <Text style={[styles.txt, { textAlign: 'center' }]}>Comming soon...</Text>
                                                                {/* <Text style={[styles.txt, { textAlign: 'center' }]}>Why can't i download the video?.</Text> */}

                                                                {/* <View style={styles.modalParentView}>
                                                            <View>
                                                                <Text style={[styles.txt, { paddingLeft: 12, fontSize: 12 }]}>There are some reason which cause your download to fail.</Text>
                                                                <View style={{ height: 15 }} />
                                                                <View style={styles.recordParent1}>
                                                                    <View style={styles.itemsView2}>
                                                                        <View style={styles.checkCircle}>
                                                                            <IconCheck name={"check"} color={"#fff"} size={10} />
                                                                        </View>
                                                                        <Text style={styles.sTitle2}>Smoothing experience downloading videos without any ads wasting your time.</Text>
                                                                    </View>
                                                                </View>
                                                                <View style={styles.recordParent}>
                                                                    <View style={styles.itemsView2}>
                                                                        <View style={styles.checkCircle}>
                                                                            <IconCheck name={"check"} color={"#fff"} size={10} />
                                                                        </View>
                                                                        <Text style={styles.sTitle2}>Smoothing experience downloading videos without any ads wasting your time.</Text>
                                                                    </View>
                                                                </View>
                                                                <View style={styles.recordParent}>
                                                                    <View style={styles.itemsView2}>

                                                                        <View style={styles.checkCircle}>
                                                                            <IconCheck name={"check"} color={"#fff"} size={10} />
                                                                        </View>
                                                                        <Text style={styles.sTitle2}>Smoothing experience downloading videos without any ads wasting your time.</Text>
                                                                    </View>
                                                                </View>
                                                                <Text style={[styles.txt, { paddingLeft: 12, fontSize: 12, marginTop: 10 }]}>Where are videos download after being downloads?</Text>
                                                                <Text style={[styles.sTitle2, { paddingLeft: 12, fontSize: 12, marginTop: 10 }]}>They are usualy saved where you want to set the saving location.</Text>

                                                                <Text style={[styles.txt, { paddingLeft: 12, fontSize: 12, marginTop: 10 }]}>Where are videos download after being downloads.</Text>
                                                                <Text style={[styles.sTitle2, {
                                                                    paddingLeft: 12, fontSize: 12,
                                                                    marginBottom: 10,
                                                                    marginTop: 10
                                                                }]}>They are usualy saved where you want to set the saving location.</Text>

                                                            </View>


                                                        </View> */}
                                                                <Button
                                                                    buttonstyle={{
                                                                        marginTop: "10%",
                                                                        width: '50%',
                                                                        height: 40,
                                                                        alignSelf: 'center',
                                                                        bottom: 5

                                                                    }}
                                                                    onPress={onPress}
                                                                    title={"Close"}
                                                                />
                                                            </View>
                                                        </View>
                                                    </Modal>
                                                    : null
            }

        </View>

    )
}

export default ModalComp

const styles = StyleSheet.create({
    centeredView: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        // backgroundColor: 'red',
        flex: 1,

        justifyContent: 'center'
    },
    modalView: {
        // height: 170,
        paddingVertical: 10,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    modalParentView: { flexDirection: 'row', alignItems: 'center', marginTop: '5%', paddingHorizontal: 12 },
    txt: {
        fontSize: 14,
        fontFamily: fontsAndcolor.SEMI_BOLD,
        color: '#000'
    },
    spacer: {
        height: 15,
    },
    checkCircle: {
        height: 15,
        marginTop: 5,
        width: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15, backgroundColor: fontsAndcolor.PrimaryColor
    },
    checkCircle1: {
        height: 15,
        // marginTop:5,
        width: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15, backgroundColor: fontsAndcolor.PrimaryColor
    },
    imageIcon: {
        height: 15,
        width: 15,
        top: 2,
        resizeMode: 'contain'
    },
    headerTxt: {
        fontSize: 12,
        color: '#000',
        fontFamily: fontsAndcolor.BOLD
    },
    sTitle: {
        fontSize: 12,
        paddingTop: 4,
        color: '#000',
        fontFamily: fontsAndcolor.LIGHT,
        width: 250
    },
    sTitle2: {
        fontSize: 12,
        paddingTop: 4,
        paddingLeft: 8,
        color: '#000',
        fontFamily: fontsAndcolor.LIGHT,
        width: 250
    },
    itemsView: {
        paddingLeft: 10,
    },
    itemsView2: {
        paddingLeft: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    recordParent: { flexDirection: 'row', marginTop: 10 },
    recordParent1: { flexDirection: 'row', marginTop: 0 }
})