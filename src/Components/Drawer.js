import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert, ToastAndroid, Share } from 'react-native'
import React, { useState, useEffect } from 'react'
import { fontsAndcolor } from '../Constants/Colors'
import { images } from '../Constants/images'
import ModalComp from './ModalComp'
import IconShare from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesing from 'react-native-vector-icons/AntDesign'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'
import Headermodal from './headermodal'
import Icon from 'react-native-vector-icons/Entypo'
import Inputfield from './Inputfield'
import Button from './Button'
import { sendFeedback, shareApi } from '../Utils/apis'
import DeviceInfo from 'react-native-device-info';
import Loader from './Loader'
import Modal from "react-native-modal";

const Drawer = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [feedbackState, setfeedbackState] = useState(false);
  const [saveModalvalue, setsaveModalvalue] = useState("")
  const [data, setdata] = useState({
    name: '',
    email: '',
    message: '',
    deviceId: '',
    loading: false
  })

  const [err, seterr] = useState({
    nameErr: '',
    emailErr: '',
    messageErr: ''
  })

  useEffect(() => {
    _GetdeviceInfo();
  }, [data.deviceId])


  const _GetdeviceInfo = () => {
    DeviceInfo.getUniqueId().then((responce) => {
      console.log("responponce of device Id", responce)
      setdata({ ...data, deviceId: responce })
    }).catch((error) => {
      console.log("Error", error)
    })

  }
  const onModalclick = (a) => {
    if (a == "share") {
      _shareApp()
      // setModalVisible(true)
      // setsaveModalvalue(a)
    } else if (a == "rate") {
      setModalVisible(true)
      setsaveModalvalue(a)
    } else if (a == "feedback") {
      setModalVisible(true)
      setsaveModalvalue(a)
    } else if (a == "updates") {
      setModalVisible(true)
      setsaveModalvalue(a)
    } else if (a == "payment") {
      setModalVisible(true)
      setsaveModalvalue(a)
    }
    else if (a == "imunity") {
      setModalVisible(true)
      setsaveModalvalue(a)
    }
    else if (a == "intro") {
      setModalVisible(true)
      setsaveModalvalue(a)
    } else if (a == "faqs") {
      setModalVisible(true)
      setsaveModalvalue(a)
    } else if (a == "how") {
      setModalVisible(true)
      setsaveModalvalue(a)
    } else if (a == "suport") {
      setModalVisible(true)
      setsaveModalvalue(a)
    }




  }


  const _sendTobackend = () => {

    if (_validator()) {
      setdata({ ...data, loading: true })
      const userdata = new FormData();
      userdata.append("name", data.name)
      userdata.append("content", data.message)
      userdata.append("device_id", data.deviceId)
      userdata.append("email", data.email)
      sendFeedback(userdata).then((responce) => {
        setdata({ ...data, loading: false })
        ToastAndroid.show('Feedback sent, Thank you!.', ToastAndroid.SHORT);
        setfeedbackState(false)
      }).catch((error) => {
        setdata({ ...data, loading: false })
        console.log("Error", error)
      })
    }

  }


  const _validator = () => {
    if (!data.name && !data.email && !data.message) {
      seterr({ ...err, nameErr: 'txt', emailErr: 'txt', messageErr: 'txt' })
      return false;
    } else if (!data.name) {
      seterr({ ...err, nameErr: 'txt' })
      return false
    }
    else if (!data.message) {
      seterr({ ...err, messageErr: 'txt' })
      return false
    }
    else if (!data.email) {
      seterr({ ...err, emailErr: 'txt' })
      return false
    }
    return true
  }


  const onShare = async (item) => {
    try {
      const result = await Share.share({
        message:
          `${item.setting.content}`
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const _shareApp = () => {
    shareApi().then((responce) => {
      onShare(responce)
    }).catch((error) => {
      console.log("Error", error)
    })

  }



  return (
    <View>
      <ScrollView>
        {data.loading && <Loader />}
        <View style={styles.drawerHeader}>
          <Image source={images.headerlogo} style={styles.logo} />
          <Text style={styles.txt}>Insta Downloader</Text>
        </View>
        <View style={{ width: '70%', marginVertical: 10 }}>
          {["1", "2", "3", "4", "5", "6", "7"].map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                if (index == 0) {
                  onModalclick("intro")
                } else if (index == 1) {
                  onModalclick("share")
                }
                else if (index == 2) {
                  // setfeedbackState(true)
                  onModalclick("how")
                } else if (index == 3) {
                  setfeedbackState(true)
                  // onModalclick("rate")
                } else if (index == 4) {
                  onModalclick("rate")
                  // onModalclick("payment")
                } else if (index == 5) {
                  onModalclick("suport")
                } else if (index == 6) {
                  onModalclick("faqs")
                  // onModalclick("intro")
                } else if (index == 7) {
                  onModalclick("faqs")
                }


              }}
              style={[styles.drawerItems, {
                marginTop: 30, paddingLeft: 10
              }]}>


              {index == 0 ?
                <AntDesing name={"linechart"} size={17} color={fontsAndcolor.PrimaryColor} />
                : index == 1 ?
                  <IconShare name={"share-variant-outline"} size={18} color={fontsAndcolor.PrimaryColor} />
                  : index == 2 ?
                    <Feather name={"download"} size={18} color={fontsAndcolor.PrimaryColor} />
                    : index == 6 ?
                      <AntDesing name={"questioncircleo"} size={16} color={fontsAndcolor.PrimaryColor} />
                      :
                      index == 4 ?
                        <AntDesing name={"staro"} size={17} color={fontsAndcolor.PrimaryColor} />
                        : index == 5 ?
                          <MaterialIcon name={"support-agent"} size={17} color={fontsAndcolor.PrimaryColor} />
                          :
                          index == 3 ?
                            <IconShare name={"file-send-outline"} size={18} color={fontsAndcolor.PrimaryColor} />
                            : index == 7 ?
                              <AntDesing name={"questioncircleo"} size={17} color={fontsAndcolor.PrimaryColor} /> :
                              null}
              <Text style={styles.txt1}>{
                index == 0 ? "Introduction" :
                  index == 1 ? "Share App" :
                    index == 2 ? "How to Download" :
                      index == 3 ? "Send feedback" :
                        index == 4 ? "Rate the app" :
                          index == 5 ? "Suport" :
                            index == 6 ? "FAQS" :
                              null}</Text>
            </TouchableOpacity>
          ))}

        </View>
      </ScrollView>
      <ModalComp

        state={modalVisible}
        modallValue={saveModalvalue}
        onPress={() => setModalVisible(false)}

      />
      <Modal
        //  animationType="slide"
        animationInTiming={1}
        animationOutTiming={1}


        transparent={true}
        style={{ margin: 0 }}
        isVisible={feedbackState}
        onBackButtonPress={() => setfeedbackState(false)}
        onBackdropPress={() => setfeedbackState(false)}
      // animationType="slide"
      // transparent={true}
      // visible={feedbackState}
      // onRequestClose={() => {
      //   Alert.alert('Modal has been closed.');
      //   setModalVisible(!modalVisible);
      // }}
      >
        {/* <ModalOverlay
          onPress={() => setfeedbackState(false)}
        /> */}
        <View style={styles.modalView}>
          <Headermodal
            title={"Send Feedback"}
          // myIcon={<Icon name={"cross"}
          //   onPress={() => setfeedbackState(false)}
          //   size={20} color={fontsAndcolor.PrimaryColor} />}
          />
          <View style={styles.modalParentView}>
            <View style={{ width: '100%' }}>
              <Inputfield
                placeholderTextColor={"grey"}
                newStyle={{
                  height: 50,
                  bottom: 3,
                  borderColor: err.nameErr ? 'red' : 'grey',
                  width: '100%',
                  borderWidth: .3,
                  textAlignVertical: 'top'
                }}

                value={data.name}
                onChangeText={(txt) => {
                  setdata({ ...data, name: txt })
                  seterr({ ...err, nameErr: '' })
                }}
                placeholder={"Name*"}
              />

              <View style={styles.spacer} />
              <Inputfield
                placeholderTextColor={"grey"}
                newStyle={{
                  height: 50,
                  bottom: 3,
                  borderColor: err.emailErr ? 'red' : 'grey',
                  width: '100%',
                  borderWidth: .3,
                  textAlignVertical: 'top'
                }}
                value={data.email}

                onChangeText={(txt) => {
                  setdata({ ...data, email: txt })
                  seterr({ ...err, emailErr: '' })
                }}
                placeholder={"Email (optional)"}
              />
              <View style={styles.spacer} />
              <Inputfield
                placeholderTextColor={"grey"}
                multiline={true}
                value={data.message}
                onChangeText={(txt) => {
                  setdata({ ...data, message: txt })
                  seterr({ ...err, messageErr: '' })
                }}
                newStyle={{
                  height: 150,
                  bottom: 3,
                  borderColor: err.messageErr ? 'red' : 'grey',
                  width: '100%',
                  borderWidth: .3,
                  textAlignVertical: 'top'
                }}
                placeholder={"Message*"}
              />
              {err.messageErr || err.nameErr ? <Text style={{ textAlign: 'center', color: 'red', fontFamily: fontsAndcolor.REGULAR, top: 5 }}>Name and message is required</Text> : null}
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
                  onPress={() => {
                    setfeedbackState(false)
                    // _sendTobackend()
                  }}
                />
                <Button
                  buttonstyle={{
                    width: '45%',
                    height: 40,
                    alignSelf: 'center',
                    bottom: 5
                  }}
                  title={"Send"}
                  onPress={() => {
                    _sendTobackend()
                  }}
                />

              </View>

            </View>

          </View>
        </View>
      </Modal>
    </View>
  )
}

export default Drawer

const styles = StyleSheet.create({
  drawerHeader: {
    height: 150,
    // borderBottomRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: .3,
    borderBottomColor: fontsAndcolor.PrimaryColor
  },
  logo: {
    height: 90,
    width: 90,
    resizeMode: 'contain'
  },
  txt: {
    fontSize: 16,
    fontFamily: fontsAndcolor.SEMI_BOLD,
    marginTop: 6,
    color: '#000'
  },
  txt1: {
    fontSize: 14,
    paddingLeft: 10,
    fontFamily: fontsAndcolor.SEMI_BOLD,
    color: '#000'
  },
  drawerItems: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomColor: 'grey',

    borderBottomWidth: .5
  },
  iconstyle: {
    height: 20,
    width: 20,
    resizeMode: 'contain'
  },
  centeredView: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
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
  spacer: {
    height: 15,
  },
  modalParentView: { flexDirection: 'row', alignItems: 'center', marginTop: '5%', paddingHorizontal: 12 },

})