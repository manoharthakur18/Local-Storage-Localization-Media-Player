/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import i18next from './src/services/i18next'
import TrackPlayer from 'react-native-track-player';
import { playBackService } from './musicPlayerServices';

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => playBackService);