import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useRef, useState} from 'react';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation-locker';

const VideoPlayer = () => {
  const [clicked, setClicked] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);
  const ref = useRef();
  const format = seconds => {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };
  return (
    <View>
      <TouchableOpacity
        style={{
          width: '100%',
          height: fullscreen ? '100%' : 250,
        }}
        onPress={() => {
          setClicked(!clicked);
        }}>
        <Video
          paused={paused}
          source={{
            uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          }}
          ref={ref}
          onProgress={x => {
            setProgress(x);
          }}
          //   ref={ref => {
          //     this.player = ref;
          //   }} // Store reference
          //   onBuffer={this.onBuffer} // Callback when remote video is buffering
          //   onError={this.videoError} // Callback when video cannot be loaded
          style={{
            width: '100%',
            height: fullscreen ? '100%' : 250,
          }}
          resizeMode="contain"
        />
        {clicked && (
          <View
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              backgroundColor: 'rgba(0,0,0,.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {
                  ref.current.seek(progress.currentTime - 10);
                }}>
                <Image
                  style={styles.imgStyle}
                  source={require('../assets/backward.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPaused(!paused);
                }}>
                <Image
                  style={[styles.imgStyle, {marginHorizontal: 50}]}
                  source={
                    paused
                      ? require('../assets/play-button.png')
                      : require('../assets/pause.png')
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  ref.current.seek(progress.currentTime + 10);
                }}>
                <Image
                  style={styles.imgStyle}
                  source={require('../assets/forward.png')}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                position: 'absolute',
                bottom: 0,
                paddingHorizontal: 20,
                alignItems: 'center',
              }}>
              <Text style={{color: 'white'}}>
                {format(progress.currentTime)}
              </Text>
              <Slider
                style={{width: '80%', height: 40}}
                minimumValue={0}
                maximumValue={progress.seekableDuration}
                value={progress.currentTime}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#fff"
                onValueChange={x => {
                  ref.current.seek(x);
                }}
              />
              <Text style={{color: 'white'}}>
                {format(progress.seekableDuration)}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                position: 'absolute',
                top: 10,
                paddingHorizontal: 20,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  if (fullscreen) {
                    Orientation.lockToPortrait();
                  } else {
                    Orientation.lockToLandscape();
                  }
                  setFullscreen(!fullscreen);
                }}>
                <Image
                  style={styles.imgStyle}
                  source={
                    fullscreen
                      ? require('../assets/minimize.png')
                      : require('../assets/maximize.png')
                  }
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default VideoPlayer;
const styles = StyleSheet.create({
  imgStyle: {
    width: 35,
    height: 35,
    tintColor: 'white',
  },
});
