import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, BackHandler } from 'react-native'
import React, { useState, useEffect } from 'react'
import { images } from '../../../Constants/images'
import { fontsAndcolor } from '../../../Constants/Colors'
import { useSelector } from 'react-redux'
import Header from '../../../Components/Header'
import IconMenue from 'react-native-vector-icons/Feather'
import PopUpComp from '../../../Components/PopUpComp'
import DownloadVideo from '../../../Components/DownloadVideo'
import analytics from '@react-native-firebase/analytics'

const Dowloads = ({ navigation }) => {
  const { videos_result } = useSelector(({ appReducer }) => appReducer);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const reversedVideos = [...videos_result].reverse();
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {

    });

    return unsubscribe;
  }, [videos_result]);


  // const getVideoFiles = async () => {
  //   try {
  //     const { dirs } = RNFetchBlob.fs;
  //     const dirToSave = `${dirs.DownloadDir}/intechsol`;
  //     const files = await RNFS.readDir(dirToSave);

  //     const videoData = [];

  //     for (const file of files) {
  //       if (file.isFile() && file.name.endsWith('.mp4')) {
  //         const thumbnailPath = `${dirToSave}/thumbnails/${file.name.replace('.mp4', '.jpg')}`;
  //         videoData.push({
  //           path: `file://${file.path}`,
  //           thumbnailPath: `file://${thumbnailPath}`,
  //         });
  //       }
  //     }

  //     setmyLocalvideos(videoData)

  //   } catch (error) {
  //     console.error('Error reading video files:', error);
  //     return [];
  //   }
  // };
  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(!isModalVisible);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
  };


  useEffect(() => {
    const handleBackPress = () => {
      // Check if this screen is the active tab
      if (navigation.isFocused()) {
        navigation.goBack()
        // Prevent the app from exiting
        return true;
      }

      // Allow the default behavior (go back) for other screens
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      backHandler.remove();
    };
  }, [navigation]);


  


  useEffect(() => {
    analytics().logScreenView({ screen_name: 'Downloads' });
  }, []);


  return (
    <TouchableOpacity onPress={() => setModalVisible(false)} activeOpacity={1} style={styles.container}>
      <Header
        title={"Downloads"}
        myIcon={
          <IconMenue name={"menu"}
            color={"#fff"}
            size={22} style={{ margin: 6, marginLeft: 10 }} onPress={() => navigation.openDrawer()} />
        }
      />
      <View>
        {reversedVideos?.length > 0 ?
          <View>
            <FlatList
              data={reversedVideos}
              style={{ margin: 5, }}
              contentContainerStyle={{ paddingBottom: 80 }}
              renderItem={({ item }) => {
                return (
                  <DownloadVideo
                    onPress={() => openModal(item)}
                    item={item} navigation={navigation} 
                    />
                  )
              }}

            />
            <PopUpComp
              navigation={navigation}
              isVisible={isModalVisible}
              onClose={closeModal}
              item={selectedItem} />


          </View> :
          <View style={styles.subcontainer}>
            <Image source={images.box} style={styles.img} />
            <Text style={styles.txt}>There is no video downloaded!</Text>
          </View>}




      </View>




    </TouchableOpacity>
  )
}

export default Dowloads

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
    paddingTop: 10,
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
    flex: 1,
    backgroundColor: '#fff'
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