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
        <Screen
          name="List"
          component={List}
          initialParams={
            {
              listData: {
                listName: 'defaultListName',
                items: [{ name: 'item1', qty: '0', purchased: false }, { name: 'item2', qty: '0', purchased: false }, { name: 'item3', qty: '0', purchased: false }]
              }
            }
          }
        />
        <Screen name="ListOfLists" component={ListOfLists} />
      </Navigator>
    </NavigationContainer>
  );
}
