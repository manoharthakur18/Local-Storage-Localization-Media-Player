import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {setupPlayer, addTrack} from '../../musicPlayerServices';
import MusicPlayer from './MusicPlayer';

const AudioPlayer = () => {
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    setup();
  }, []);
  async function setup() {
    let isSetup = await setupPlayer();

    if (isSetup) {
      await addTrack();
    }

    setIsPlayerReady(isSetup);
  }

  if (!isPlayerReady) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <MusicPlayer />
    </View>
  );
};

export default AudioPlayer;
const styles = StyleSheet.create({
  container: {height: '100%', backgroundColor: 'yellow'},
});
