import { StyleSheet, Text, View, TouchableOpacity, Dimensions, BackHandler, Alert } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Entypo'

const Videoscreen = ({ route, navigation }) => {
    const videoRef = useRef(null);
    const { item } = route.params;
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isSeeking, setIsSeeking] = useState(false);
    const [showControls, setShowControls] = useState(true);
    // const [sliderTime, setSliderTime] = useState(formatTime(0));
    const customStyles = {
        // Change the color of the play/pause button
        playControl: { color: 'red' }, // Change the color to your desired color
        pauseControl: { color: 'green' }, // Change the color to your desired color

        // Change the color of other controls (e.g., seek bar, volume control)
        control: { backgroundColor: 'blue' }, // Change the background color to your desired color
        seekBar: { backgroundColor: 'yellow' }, // Change the background color to your desired color
    };

    // const togglePlayPause = () => {
    //     setIsPlaying(!isPlaying);
    // };
    // const togglePlayPause = () => {
    //     if (isPlaying) {
    //         // If the video is playing, pause it
    //         setIsPlaying(false);
    //     } else {
    //         // If the video is paused or stopped, play it
    //         setIsPlaying(true);
    //         startProgressTracking()
    //     }
    // };

    const handleSeek = (value) => {
        videoRef.current.seek(value);
        setCurrentTime(value);
    };

    const handleSliderChange = (value) => {
        setCurrentTime(value);
        //setSliderTime(value); // Update the sliderTime state
    };



    const handleVideoProgress = (progress) => {
        if (!isSeeking) {
            setCurrentTime(progress.currentTime);
        }
    };

    const handleVideoEnd = () => {
        setIsPlaying(false); // Pause the video
        setCurrentTime(0); // Reset the currentTime to 0
    };





    function handleBackButtonClick() {
        navigation.goBack();
        return true;
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, []);

    const startProgressTracking = () => {
        if (videoRef.current) {
            videoRef.current.seek(currentTime); // Seek to the current time
        }
    };


 

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
        // setShowControls(true); // Show controls when play/pause is toggled
    };




    return (
        <View style={{ flex: 1 }}>

            <Video
                ref={videoRef}
                style={styles.video}
                resizeMode="contain"
                source={{ uri: `file://${item}` }}
                controls={false}
                customStyles={customStyles}
                paused={!isPlaying}
                onProgress={handleVideoProgress}
                progressSliderOptions={{
                    ...styles.slider,
                }}
                onLoad={() => {
                    // Show controls when video is loaded (optional)
                    setShowControls(true);
                }}
                onEnd={handleVideoEnd}
                onTouchStart={() => setShowControls(!showControls)}



            />

           <View style={{ position: 'absolute',height:"100%",width:'100%',alignItems:'center',justifyContent:'center' }}>
                <TouchableOpacity onPress={togglePlayPause} style={styles.playPauseButton}>
                    {isPlaying ? (
                        <Icon name={"controller-paus"} size={50} color={"#fff"} />
                    ) : (
                        <Icon name={"controller-play"} size={50} color={"#fff"} />
                    )}
                </TouchableOpacity>
            </View>



            {/* <Video
                ref={videoRef}
                style={styles.video}
                resizeMode="contain"
                source={{ uri: `file://${item}` }}
                controls={false} 
                customStyles={customStyles}
                paused={!isPlaying}

                onProgress={handleVideoProgress}
                progressSliderOptions={{
                    ...styles.slider,
                }}
                onLoad={(e) => {
                    setDuration(e.duration)
                }}
                onEnd={handleVideoEnd}



            />
            <View style={{ position: 'absolute' }}>
                <TouchableOpacity onPress={togglePlayPause} style={styles.playPauseButton}>
                    {isPlaying ? (
                        <Icon name={"controller-paus"} size={50} color={"#fff"} />
                    ) : (
                        <Icon name={"controller-play"} size={50} color={"#fff"} />
                    )}
                </TouchableOpacity>
            </View>
            <CustomSeekbar
                value={currentTime}
                minimumValue={0}
                maximumValue={duration}
                onValueChange={handleSliderChange}
                onSlidingComplete={handleSeek}


            /> */}




        </View>

    )
}

export default Videoscreen

const styles = StyleSheet.create({
    controlButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
        borderRadius: 8,
    },
    timeText: {

        color: '#fff'
    },

    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 10,
        // bottom: 10,
        justifyContent: 'flex-end'
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    video: {
        flex: 1,
        // width: Dimensions.get("screen").width,
        // height: Dimensions.get("screen").height,
    },
    slider: {
        width: 300,
        // height:20,
        // backgroundColor:'green'
    },
    playPauseButton: {
        // marginTop: 20,
        backgroundColor: 'transparent',
    },
    controls: {
        position: 'absolute',
        bottom: 40
    },
    thumb: {
        width: 20, // Set the desired width for the thumb
        height: 20, // Set the desired height for the thumb
        backgroundColor: 'blue', // Set the desired background color for the thumb
        borderRadius: 10, // Make the thumb circular by setting borderRadius to half of width and height
    },
    track: {
        height: 50, // Set the desired height for the track
        backgroundColor: 'gray', // Set the desired background color for the track
        borderRadius: 5, // Make the track rounded by setting borderRadius
    },
    customTrack: {
        width: '100%', // Match the width of the slider
        height: 10, // Set the desired height for the custom track
        backgroundColor: 'gray', // Set the desired background color for the custom track
        borderRadius: 5, // Make the custom track rounded by setting borderRadius
        position: 'absolute', // Position it above the slider
    },
});