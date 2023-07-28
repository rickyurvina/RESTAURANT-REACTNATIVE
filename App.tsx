import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  StyleSheet,
} from 'react-native';
import FormPlate from './src/views/FormPlate';
import Menu from './src/views/Menu';
import NewOrder from './src/views/NewOrder';
import OrderProgress from './src/views/OrderProgress';
import PlateDetail from './src/views/PlateDetail';
import OrderResume from './src/views/OrderResume';

import FirebaseState from './src/context/firebase/firebaseState';

import OrderState from './src/context/orders/ordersState';
import { NativeBaseProvider, extendTheme } from "native-base";


const Stack = createNativeStackNavigator();
const newColorTheme = {
  brand: {
    900: "#8287af",
    800: "#7c83db",
    700: "#b3bef6",
  },
};
const theme = extendTheme({ colors: newColorTheme });
function App(): JSX.Element {


  return (
    <NativeBaseProvider theme={theme}>
      <FirebaseState>
        <OrderState>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#FFDA00',

                },
                headerTitleStyle: {
                  fontWeight: 'bold',
                }
              }}
            >
              <Stack.Screen name="NewOrder" component={NewOrder} options={{ title: 'NewOrder' }} />
              <Stack.Screen name="Menu" component={Menu} options={{ title: 'Menu' }} />
              <Stack.Screen name="PlateDetail" component={PlateDetail} options={{ title: 'PlateDetail' }} />
              <Stack.Screen name="FormPlate" component={FormPlate} options={{ title: 'FormPlate' }} />
              <Stack.Screen name="OrderResume" component={OrderResume} options={{ title: 'OrderResume' }} />
              <Stack.Screen name="OrderProgress" component={OrderProgress} options={{ title: 'OrderProgress' }} />
            </Stack.Navigator>
          </NavigationContainer>
        </OrderState>
      </FirebaseState>
    </NativeBaseProvider>

  );
}

const styles = StyleSheet.create({

});

export default App;
