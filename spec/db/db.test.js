import { AsyncStorage } from 'react-native';

import models from '../../db/models';

const mockList = {
  listName: 'list1: Ralphs',
  items: [{
    name: 'hotdogs',
    qty: '12',
    purchased: true
  },
  {
    name: 'buns',
    qty: '12',
    purchased: false
  },
  {
    name: 'mangos',
    qty: '3',
    purchased: true
  }]
};

// afterEach(async () => {
//   await AsyncStorage.flushGetRequests();
//   const keys = await AsyncStorage.getAllKeys();
//   await AsyncStorage.multiRemove(keys);
// });

test('Starts without a tracker.', async () => {
  const tracker = JSON.parse(await AsyncStorage.getItem('TRACKER'));

  expect(tracker).toEqual(null);
});
test('Creates a tracker when one is missing.', async () => {
  await models.createNewList('NewList');

  const tracker = JSON.parse(await AsyncStorage.getItem('TRACKER'));
  expect(Object.keys(tracker)).toContain('NewList');
});

test('Creates new list.', async () => {
  await models.createNewList('NewList');
  const tracker = JSON.parse(await AsyncStorage.getItem('TRACKER'));
  const list = JSON.parse(await AsyncStorage.getItem('1'));
  console.log(tracker);
  expect(tracker.NewList).toEqual(1);
  expect(list.listName).toEqual('NewList');
});

test('Retrieves list by Id.', async () => {
  await models.createNewList('list1: Ralphs');

  const result = models.getListById('1');
  expect(result.listName).toEqual('list1: Ralphs');
});
