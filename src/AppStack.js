import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Home';
import Cart from './screens/Cart';
import Payment from './screens/Payment';
import VideoPlayer from './screens/VideoPlayer';
import MediaPlayer from './screens/MediaPlayer';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="MediaPlayer" component={MediaPlayer} />
      <Stack.Screen name="Payment" component={Payment} />
    </Stack.Navigator>
  );
};

export default AppStack;
