import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import List from './src/components/List/List';
import ListOfLists from './src/components/ListOfLists/ListOfLists';

const { Navigator, Screen } = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="ListOfLists" component={ListOfLists} />
        <Screen name="List" component={List} />
      </Navigator>
    </NavigationContainer>
  );
}
