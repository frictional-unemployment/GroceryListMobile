import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './src/redux/store';

// import List from './src/components/List/List';
import ListOfLists from './src/components/ListOfLists/ListOfLists';

const { Navigator, Screen } = createStackNavigator();

// const AppNavigator = createStackNavigator(
//   {
//     AllLists: ListOfLists,
//     SingleList: List,
//   },
//   {
//     initialRouteName: 'AllLists',
//     defaultNavigationOptions: {
//       headerShown: false,
//     },
//   }
// );

// const AppContainer = createAppContainer(AppNavigator);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigator>
          <Screen name="ListOfLists" component={ListOfLists} />
        </Navigator>
      </NavigationContainer>
    </Provider>
  );
}
