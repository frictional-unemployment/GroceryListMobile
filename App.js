import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import List from './src/components/List/List';
import ListOfLists from './src/components/ListOfLists/ListOfLists';
import DBTest from './spec/db/db-page';
import model from '../db/models';

const { Navigator, Screen } = createStackNavigator();

export default async function App() {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen
          name="DBTest"
          component={DBTest}
        />
        <Screen
          name="List"
          component={List}
          initialParams={
            {
              listData: await model.getListById(1)
            }
          }
        />
        <Screen name="ListOfLists" component={ListOfLists} />
      </Navigator>
    </NavigationContainer>
  );
}

/**
 * Database seeding for testing purposes.
 */
const sampleList = {
  listName: 'Ralphs List',
  items: [
    {
      name: 'item1',
      qty: 12,
      purchased: false
    },
    {
      name: 'item2',
      qty: 12,
      purchased: true
    },
    {
      name: 'item3',
      qty: 12,
      purchased: false
    },
  ]
};

model.createNewList(sampleList.listName)
  .then(() => {
    model.updateListByName(sampleList.listName, sampleList.items);
  });
