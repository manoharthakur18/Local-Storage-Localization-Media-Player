import {View, Text, Pressable, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import VideoPlayer from './VideoPlayer';
import AudioPlayer from './AudioPlayer';

const MediaPlayer = () => {
  const [audioVisible, setAudioVisible] = useState(true);
  const [videoVisible, setVideoVisible] = useState(false);
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginBottom: 10,
        }}>
        <Pressable
          style={[
            styles.containerStyle,
            audioVisible && {backgroundColor: '#A710F2'},
          ]}
          onPress={() => {
            setAudioVisible(true);
            setVideoVisible(false);
          }}>
          <Text style={styles.textStyle}>Audio</Text>
        </Pressable>
        <Pressable
          style={[
            styles.containerStyle,
            videoVisible && {backgroundColor: '#A710F2'},
          ]}
          onPress={() => {
            setVideoVisible(true);
            setAudioVisible(false);
          }}>
          <Text style={styles.textStyle}>Video</Text>
        </Pressable>
      </View>
      {audioVisible && <AudioPlayer />}
      {videoVisible && <VideoPlayer />}
    </View>
  );
};

export default MediaPlayer;

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: '#9C9A9D',
    margin: 5,
    paddingHorizontal: 50,
    paddingVertical: 5,
    borderRadius: 50,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});
