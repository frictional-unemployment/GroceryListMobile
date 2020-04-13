import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Item from './Item/Item';

const List = ({ route, navigation }) => {
  const { items, listName } = route.params?.listData;

  useEffect(() => {
    navigation.setOptions({
      title: listName
    });
  });

  return (
    <View>
      <Text>Test</Text>
      {
        items.map(({ name, qty }) => (<Item name={name} qty={qty} />))
      }
    </View>
  );
};

export default List;
