import {SafeAreaView, View, Text} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabNavigator from './src/navigators/TabNavigator';
import SeatBookingScreen from './src/screens/SeatBookingScreen';
import MovieDetailScreen from './src/screens/MovieDetailScreen';
import {StackName} from './src/navigators/Constant';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name={StackName.Tab}
          component={TabNavigator}
          options={{animation: 'default'}}
        />
        <Stack.Screen
          name={StackName.MovieDetail}
          component={MovieDetailScreen}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name={StackName.SeatBooking}
          component={SeatBookingScreen}
          options={{animation: 'slide_from_bottom'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
