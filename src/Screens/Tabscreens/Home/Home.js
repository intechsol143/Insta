import { StyleSheet, Text, View, ScrollView, ToastAndroid, BackHandler, Dimensions, Alert, PermissionsAndroid, Image, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import Inputfield from '../../../Components/Inputfield'
import Button from '../../../Components/Button'
import { fontsAndcolor } from '../../../Constants/Colors'
import UpdgradeProbuttons from '../../../Components/UpdgradeProbuttons'
import DownloadItem from '../../../Components/DownloadItem'
import Loader from '../../../Components/Loader'
import RNFetchBlob from 'rn-fetch-blob';
import RNFS, { stat } from 'react-native-fs';
import { setInstaVideoRemove, setInstaVideos, setModalValue } from '../../../Redux/Actions/appActionFiles'
import Icon from 'react-native-vector-icons/Entypo'
import { useDispatch } from 'react-redux'
import Header from '../../../Components/Header'
import IconMenue from 'react-native-vector-icons/Feather'
import Clipboard from '@react-native-clipboard/clipboard';
import Progress from 'react-native-progress/Bar'
import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';
import { instaDwonloader, senddeviceId, updateFcm } from '../../../Utils/apis'
import { useSelector } from 'react-redux'
import throttle from 'lodash.throttle';
import { images } from '../../../Constants/images'
import Headermodal from '../../../Components/headermodal'
import IconCheck from 'react-native-vector-icons/AntDesign'
import IconFeather from 'react-native-vector-icons/Feather'
import NetInfo from '@react-native-community/netinfo';
import { requestNotifications, PERMISSIONS } from 'react-native-permissions'
import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics'
const Home = ({ navigation }) => {
  const { videos_result, modalvisible } = useSelector(({ appReducer }) => appReducer);
  const [url, seturl] = useState("")
  const [urlErr, seturlErr] = useState("")
  const [showData, setshowData] = useState(false)
  const [loading, setloading] = useState(false)
  const [thumbnail, setthumbnail] = useState("")
  const [getVideopath, setgetVideopath] = useState()
  const [videos, setvideos] = useState([])
  const [progress, setProgress] = useState(0);
  const [saveLocalvideo, setsaveLocalvideo] = useState("")
  const [progresState, setProgressState] = useState(false)
  const [wentWrong, setwentWrong] = useState("")
  const [alreadyFound, setalreadyFound] = useState()
  const [emogy, setemogy] = useState("")
  const [fieldstate, setfieldstate] = useState(false)
  const [handleDownloadstate, sethandleDownloadstatel] = useState(false)
  const [err1, seterr1] = useState("")
  const [downloadTask, setDownloadTask] = useState(null);
  const [capErr, setcapErr] = useState("")
  const [instLinkValidityErr, setinstLinkValidityErr] = useState("")
  const [againDownload, setagainDownload] = useState(false)
  const dispatch = useDispatch();
  const enableAddsTabs = () => {
    if (url != "") {
      setshowData(true)
      DownLoadVideo(url)
    } else {
      setshowData(false)
      seturl("")

    }

  }



  useEffect(() => {
    // requestPermission();
    requestStoragePermission()
    requestNotifications(['alert', 'sound']).then(({ status, settings }) => {
    });
  }, []);

  // async function requestPermission() {
  //   let deviceVersion = DeviceInfo.getSystemVersion();
  //   console.log("device Version", deviceVersion)
  //   let granted = PermissionsAndroid.RESULTS.DENIED;
  //   if (deviceVersion >= 13) {
  //     granted = PermissionsAndroid.RESULTS.GRANTED;
  //   } else {
  //     granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
  //   }


  // }


  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'This app requires storage permission to manage video files.',
          buttonPositive: 'Allow',
          buttonNegative: 'Deny',
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage permission granted.');
        return true; // Permission granted
      } else {
        console.log('Storage permission denied.');
        return false; // Permission denied
      }
    } catch (error) {
      console.error('Error requesting storage permission:', error);
      return false; // Permission request error
    }
  };








  const saveVideoTodevice = async (video) => {
    let checkVideo = videos_result.find((item) => item.videourl == video.videourl)
    if (checkVideo) {
      ToastAndroid.show('Video Already Downloaded!', ToastAndroid.SHORT);
    }
    else {
      NetInfo.addEventListener((state) => {
        if (!state.isConnected) {
          handleInternetDisconnection1();
        }
      })
      sethandleDownloadstatel(true)
      setProgressState(true)
      try {
        const videoUrl = video.videourl;
        const folderPath = `${RNFetchBlob.fs.dirs.DownloadDir}/InstaDownloader`; // Specify the folder name
        const videoName = video.video_name; // Specify the desired video name
        const videoPath = `${folderPath}/${videoName}`;
        const folderExists = await RNFetchBlob.fs.exists(folderPath);

        if (!folderExists) {
          await RNFetchBlob.fs.mkdir(folderPath);
        }
        const fileExists = await RNFetchBlob.fs.exists(videoPath);
        if (fileExists) {
          const filePathWithoutExtension = videoPath.replace(/\.[^/.]+$/, '');
          const randomNum = Math.floor(Math.random() * 100) + 1;
          const existingFilepath = `${filePathWithoutExtension}-${randomNum}.mp4`;
          const response = await RNFetchBlob.config({
            path: existingFilepath,
          }).fetch('GET', videoUrl)
            .progress(throttledUpdateProgress)
          setloading(false)
          let myPath = response.path();
          setsaveLocalvideo(myPath)
          const existingObject = video;
          const newData = {
            localPath: myPath,
          };
          const updatedObject = {
            ...existingObject,
            ...newData,
          };
          setInstaVideos(updatedObject)(dispatch)
          sethandleDownloadstatel(false)
          ToastAndroid.show('Downloading complete!', ToastAndroid.SHORT);
          setProgressState(false)
        }
        else {
          const response = await RNFetchBlob.config({
            path: videoPath,
            // path: videoPath1,
          }).fetch('GET', videoUrl)
            .progress(throttledUpdateProgress)
          setloading(false)
          let myPath = response.path();
          setsaveLocalvideo(myPath)
          const existingObject = video;
          const newData = {
            localPath: myPath,
          };
          const updatedObject = {
            ...existingObject,
            ...newData,
          };
          setInstaVideos(updatedObject)(dispatch)
          sethandleDownloadstatel(false)
          ToastAndroid.show('Downloading complete!', ToastAndroid.SHORT);
          setProgressState(false)

        }
      }
      catch (error) {
        console.error(error);
        crashlytics().recordError(error);
      }

    }

  };


  //function to handle imogess

  const handleDecode = (unicodeSequence) => {
    const newImogy = decodeUnicodeEscapeSequences(unicodeSequence);
    setemogy(newImogy)
  };
  function decodeUnicodeEscapeSequences(input) {
    return input.replace(/u([0-9a-fA-F]{4})/g, (match, group1) => {
      return String.fromCodePoint(parseInt(group1, 16));
    });
  }

  const haandlecapHandler = (unicodeSequence) => {
    const matches = unicodeSequence.match(instagramRegex2);
    if (matches) {
      const newImogy = decodeUnicodeEscapeSequences(unicodeSequence);
      seturl(newImogy)
      setinstLinkValidityErr("")
    } else {
      // setcapErr("Copy Valid Instagram Link")
      // console.log("No an insta link")
    }

  };
  function decodeUnicodeEscapeSequences(input) {
    return input.replace(/u([0-9a-fA-F]{4})/g, (match, group1) => {
      return String.fromCodePoint(parseInt(group1, 16));
    });
  }



  const instagramRegex2 = /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)/igm;


  const DownLoadVideo = async (a) => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        if (instagramRegex2.test(a)) {
          let checkVideo = videos_result.find((item) => item.link == a)
          if (checkVideo) {
            ToastAndroid.show('Video Already Downloaded!', ToastAndroid.SHORT);
            { checkVideo.caption ? handleDecode(checkVideo?.caption) : null }
            setalreadyFound(checkVideo)
            setfieldstate(true)
          } else {
            setloading(true)
            var regex = /(?:\/reel\/|\/p\/)([a-zA-Z0-9_-]+)/;
            var match = a.match(regex);
            let result = match[1]
            const bodyFormData = new FormData();
            bodyFormData.append('url', result);
            instaDwonloader(bodyFormData).then((responce) => {
              console.log("responce", responce.data)
              setloading(false)
              setthumbnail(responce?.data)
              const newData = {
                ...responce?.data,
                link: a,
              };
              setgetVideopath(newData)
              setvideos([responce?.data, ...videos])
            }).catch((error) => {
              crashlytics().recordError(error)
              setloading(false)
              console.log("errror", error.response)
              // handleInternetDisconnection1();
              if (error.response.data.code == "404") {
                seterr1(error.response.data.message)
              } else if (error.response.data.code == "500") {
                ToastAndroid.show(`${error.response.data.message}`, ToastAndroid.SHORT);
              }

              //
            })

          }

        }

        else {
          setwentWrong("Please enter the valid instagram video link.")
          setloading(false)
          // ToastAndroid.show('check the link!', ToastAndroid.SHORT);
        }
      } else {
        console.log('No internet connection');
        handleInternetDisconnection1();
        // setloading(false)
        // ToastAndroid.show('No------ internet connection', ToastAndroid.SHORT);
      }
    });




  }



  useEffect(() => {
    const interval = setInterval(() => {
    }, 1000);
    setTimeout(() => {
      clearInterval(interval);
      onFinish();
    }, 2000);

    return () => {
      clearInterval(interval); // Cleanup
    };

  }, [])


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // do something
      _GetdeviceInfo();
      // setsaveLocalvideo("")

    });

    return unsubscribe;
  }, [navigation, videos_result, saveLocalvideo]);


  const onFinish = () => {
    fetchCopiedText();

  }

  const _GetdeviceInfo = () => {
    DeviceInfo.getUniqueId().then((responce) => {
      FOrwarddeviceId(responce)
    }).catch((error) => {
      console.log("Error---------", error)
    })

  }



  const FOrwarddeviceId = async (a) => {
    const userdata = new FormData();
    userdata.append('device_id', a)
    senddeviceId(userdata).then((res) => {
      getToken(res?.token);
    }).catch((error) => {
      console.log("Error}}}}}}}}}", error)
    })

  }

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    if (text) {
      haandlecapHandler(text)
    }
    else {
      seturl(text)
    }
  };

  const pasteText = async () => {
    const text = await Clipboard.getString();
    if (text) {
      haandlecapHandler(text)
      checkValidityOfLinks(text)
      setcapErr("")
    } else {
      setcapErr("Nothing to paste")
    }
    // seturl(text)
  }

  const checkValidityOfLinks = (unicodeSequence) => {
    console.log("coming text",unicodeSequence)
    const matches = unicodeSequence.match(instagramRegex2);
    if (matches) {
      const newImogy = decodeUnicodeEscapeSequences(unicodeSequence);
      seturl(newImogy)
    } else {
      // setcapErr("Copy Valid Instagram Link")
      setinstLinkValidityErr("Copy Valid Instagram Link")
      console.log("No an insta link------")
    }

  };


  const getToken = async (usertoken) => {
    let fcmToken = await messaging().getToken();
    if (fcmToken) {
      _updateToken(fcmToken, usertoken);
    }
    messaging().onTokenRefresh(token => {
      _updateToken(token, usertoken);
    });
  };
  const _updateToken = (fcmtoken, usertkn) => {
    const userdata = new FormData();
    userdata.append("fcm_token", fcmtoken)
    updateFcm({ usertkn, userdata }).then((res) => {
      console.log("rsoullll", res)
    }).catch((error) => {
      console.log("Error--======", error.response)
    })

  };

  const handleInternetDisconnection1 = () => {

    setTimeout(() => {
      ToastAndroid.show('No internet connection.', ToastAndroid.SHORT);
      setthumbnail("");
      setProgress(0);
      seturl("");
      setProgressState(false);
      sethandleDownloadstatel(false);
      seturlErr("")
    }, 3000);
    setProgress(0);


  };





  const throttledUpdateProgress = throttle((received, total) => {
    const currentProgress = (received / total) * 100;
    setProgress(currentProgress.toFixed(1));
  }, 1000);


  const [backPressCount, setBackPressCount] = useState(0);
  const [lastBackPress, setLastBackPress] = useState(0);

  useEffect(() => {
    const handleBackButtonPress = () => {
      const currentTime = new Date().getTime();

      if (currentTime - lastBackPress < 2000) {
        BackHandler.exitApp();
      } else {
        setBackPressCount(1);
        setLastBackPress(currentTime);

        ToastAndroid.show('Press back again to exit.', ToastAndroid.SHORT);

        setTimeout(() => {
          setBackPressCount(0);
          setLastBackPress(0);
        }, 2000);
      }

      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonPress);
    };
  }, [backPressCount, lastBackPress]);






  const _checkLocalFile = (a,b) => {
    const filePath = b
    RNFS.exists(filePath)
      .then(exists => {
        if (exists) {
          navigation.navigate("Videoscreen", { item: filePath })
        } else {
          setsaveLocalvideo("")
          setProgress(0)
          // setthumbnail("")
          setInstaVideoRemove(a.video_id)(dispatch)

          ToastAndroid.show('Video has been deleted----.', ToastAndroid.SHORT);
        }
      })
      .catch(error => {
        console.error(`Error checking file existence: ${error}`);
      });
  }

  const _checkLocalFile2 = (video) => {
    const filePath = video.localPath
    RNFS.exists(filePath)
      .then(exists => {
        if (exists) {
          navigation.navigate("Videoscreen", { item: filePath })
        } else {
          setsaveLocalvideo("")
          setProgress(0)
          setfieldstate(false)
          setalreadyFound()
          setInstaVideoRemove(video.video_id)(dispatch)
          ToastAndroid.show('Video has been deleted.', ToastAndroid.SHORT);
        }
      })
      .catch(error => {
        console.error(`Error checking file existence: ${error}`);
      });
  }


  useEffect(() => {
    return () => {
      // Cleanup: Cancel the download task if it exists when the component unmounts
      if (downloadTask) {
        downloadTask.cancel();
      }
    };
  }, [downloadTask]);

  // ...........................check for permisions



  useEffect(() => {
    analytics().logScreenView({ screen_name: 'Home' });
  }, []);




  return (
    <View style={styles.container}>
      <Header
        title={"Home"}
        myIcon={
          <IconMenue name={"menu"}
            color={"#fff"}
            size={22} style={{ margin: 6, marginLeft: 10 }} onPress={() => navigation.openDrawer()} />
        }
      />
      {loading && <Loader />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        style={{ flex: 1 }}>
        <View style={[styles.child, { marginTop: !thumbnail ? -20 : "6%" }]}>
          {thumbnail != "" ? <DownloadItem
            thumbnail={thumbnail}
          /> : null}
          <View style={styles.spacer} />
          {progresState ?
            <View style={styles.container}>
              <Text style={styles.progressText}>Downloading {progress}%</Text>
              <View style={[styles.spacer, { height: 15 }]} />
              <Progress
                progress={progress / 100}
                width={Dimensions.get("screen").width - 20}
                height={5}
                borderRadius={10}
                color="#D92835"
              />
            </View>
            : null}
          {progresState ? <View style={styles.spacer} /> : null}
          {thumbnail ? <View style={styles.twoButton}>
            {['1', "2"].map((item, index) => (
              <UpdgradeProbuttons
                buttonstate={handleDownloadstate}
                onPress={() => {
                  if (saveLocalvideo != "") {
                    _checkLocalFile(thumbnail,saveLocalvideo)
                  } else {
                    saveVideoTodevice(getVideopath)
                  }
                }}
                index={index}
                getlocalPath={saveLocalvideo}
                title1={saveLocalvideo != "" ? "Play Video" : 'Download Video'}
              />
            ))}
          </View> : null}
          <View style={styles.spacer} />
          {!thumbnail && !fieldstate ? <Inputfield
            newStyle={{
              borderColor: urlErr ? 'red' : "grey",
              borderWidth: urlErr ? .3 : .3

            }}
            placeholderTextColor={"grey"}
            placeholder={'Paste URL here...'}
            myIcon={url != "" ? <Icon name={"cross"} size={24} onPress={() => {
              seturl("")
              setwentWrong("")
              seterr1("")
              
            }
            } /> : <IconFeather name={"copy"} onPress={() => pasteText()} size={24} />}
            value={url}
            onChangeText={(txt) => {
              setwentWrong("")
              seterr1("")
              seturl(txt)
              seturlErr("")
              setcapErr("")
              setinstLinkValidityErr("")
              if (url == "") {
                setshowData(false)
              }
            }}

          /> : null}
          {wentWrong ? <Text style={{ fontSize: 12, textAlign: 'center', color: 'red', fontFamily: fontsAndcolor.LIGHT, top: 13 }}>{wentWrong}</Text> : null}
          {err1 ? <Text style={{ fontSize: 12, textAlign: 'center', color: 'red', fontFamily: fontsAndcolor.LIGHT, top: 13 }}>{err1}</Text> : null}
          {capErr ? <Text style={{ fontSize: 12, textAlign: 'center', color: 'red', fontFamily: fontsAndcolor.LIGHT, top: 13 }}>{capErr}</Text> : null}
          {instLinkValidityErr ? <Text style={{ fontSize: 12, textAlign: 'center', color: 'red', fontFamily: fontsAndcolor.LIGHT, top: 13 }}>{instLinkValidityErr}</Text> : null}
          
          <View style={[styles.buttonView, { marginTop: fieldstate ? 0 : !thumbnail ? "6%" : 0 }]}>
            {!fieldstate ? <View>
              {alreadyFound || !thumbnail ? <Button
                // buttonstate={handleDownloadstate}
                onPress={() => {
                  if (url != "") {
                    enableAddsTabs()
                    setshowData(true)
                  }

                  else {
                    setshowData(false)
                    seturlErr("txt")
                  }
                }}

            
                title={"Download Video"}
                buttonstyle={styles.button1}
              /> :
                <Button
                  buttonstate={handleDownloadstate}
                  onPress={() => {
                    seturl("")
                    setProgress(0)
                    setthumbnail("")
                    setshowData(false)
                    setsaveLocalvideo("")
                    setProgressState(false)
                  }}
                  textstyle={{ color: "#000" }}
                  title={"Download another Video"}
                  buttonstyle={styles.button2}
                />}
            </View> : null}


            {alreadyFound ?
              <View>
                <View style={{ marginTop: fieldstate ? 0 : 20 }}>
                  <View style={styles.videocontainer}>
                    <View style={styles.imgParent}>
                      <View style={styles.imgcontainer}>
                        <Image source={{ uri: alreadyFound.thumbnail }} style={styles.img} />
                      </View>
                      <View style={{ paddingLeft: 12 }}>
                        <Text style={styles.videdexc}>@{alreadyFound.username}</Text>
                        <Text numberOfLines={1} style={[styles.videdexc, { marginTop: 10 }]}>{emogy}</Text>
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
                  <View style={{ height: 15 }} />
                  <Button
                    onPress={() => {
                      _checkLocalFile2(alreadyFound)

                    }

                    }
                    title={"Play video"}
                  />
                  <Button
                    textstyle={{ color: '#000' }}
                    onPress={() => {
                      setalreadyFound("")
                      seturl("")
                      setfieldstate(false)
                    }}
                    buttonstyle={{
                      backgroundColor: null,
                      borderWidth: .3,
                      borderColor: fontsAndcolor.PrimaryColor,
                      elevation: 0
                    }}
                    title={"Download another video"}
                  />
                </View>
              </View> : null}


          </View>
          {/* {!thumbnail ? <View style={styles.downloadView}>
            <Text style={styles.txt1}>Tips for downloading video from links</Text>
            <Text style={styles.txt2}>On this app,<Text style={{ fontFamily: fontsAndcolor.SEMI_BOLD, color: "#000" }}>Click on Share option {">"}</Text>   Copy link on the video you want to download</Text>
            <Text style={styles.txt2}>Open <Text style={{ fontFamily: fontsAndcolor.SEMI_BOLD, color: "#000" }}>The App</Text></Text>
            <Text style={{ fontFamily: fontsAndcolor.LIGHT, textAlign: 'center' }}>Link of the video you want to download is autofilled</Text>
            <Text style={{ fontFamily: fontsAndcolor.LIGHT, textAlign: 'center', marginTop: 20 }}>Click on button Download</Text>
            <Text style={[styles.txt1, { marginTop: 10 }]}>Done</Text>
          </View> : null} */}
          <View>

          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalvisible}
          onRequestClose={() => {
            setModalValue(false)(dispatch)
          }}>
          <View style={styles.centeredView}>
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
                  marginTop: "15%",
                  width: '90%',
                  alignSelf: 'center',

                  bottom: 10

                }}
                onPress={() => setModalValue(false)(dispatch)}
                title={"Close"}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>

    </View>

  )
}

export default Home

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  buttonView: {
    marginTop: '5%'
  },
  twoButton: {
    //need to uncomment in future
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  child: {
    paddingHorizontal: 12,
    marginTop: "6%"
  },
  spacer: {
    height: 20
  },
  spacer2: {
    height: 10
  },
  button: {
    width: '45%',
    backgroundColor: 'lightgrey'
  },
  progressText: {
    fontFamily: fontsAndcolor.SEMI_BOLD,
    textAlign: 'center',
  },
  button1: {
    width: '100%',
    elevation: 2,
    // borderWidth:1,
    // borderColor:fontsAndcolor.PrimaryColor,
    backgroundColor: fontsAndcolor.PrimaryColor
  },
  button2: {
    width: '100%',
    elevation: 0,
    borderWidth: 1,
    borderColor: fontsAndcolor.PrimaryColor,
    backgroundColor: null
  },
  downloadView: { alignItems: 'center', marginTop: '10%' },
  txt1: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    fontFamily: fontsAndcolor.SEMI_BOLD
  },
  txt2: {
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 6,
    marginTop: 20,
    fontFamily: fontsAndcolor.LIGHT
  },


  //......................//

  sTitle2: {
    fontSize: 12,
    paddingTop: 4,
    paddingLeft: 8,
    color: '#000',
    fontFamily: fontsAndcolor.LIGHT,
    width: 250
  },
  sTitle: {
    fontSize: 12,
    paddingTop: 4,
    color: '#000',
    fontFamily: fontsAndcolor.LIGHT,
    width: 250
  },
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
  buton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '67%',
    top: 4
  },
  imgParent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  instaView: {
    height: 20, width: 80,
    borderRadius: 6,
    marginTop: 6,
    alignItems: 'center',
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff'
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
  modalParentView: { flexDirection: 'row', alignItems: 'center', marginTop: '5%', paddingHorizontal: 12 },
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