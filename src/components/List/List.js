import React from 'react';
import { View, Text, TextInput } from 'react-native';
import Item from './Item/Item';

class List extends React.Component {

  componentDidMount() {
    const { navigation, route } = this.props;
    console.log('This is list data', route.params.listData);
    navigation.setOptions({
      title: route.params.listData.listName
    });
  }

  componentDidUpdate() {
    const { navigation, route } = this.props;
    console.log('This is list data', route.params.listData);
    navigation.setOptions({
      title: route.params.listData.listName
    });
  }

  changeListName(newName) {
    const { navigation, route } = this.props;
    const newListData = { ...route.params.listData };
    newListData.listName = newName;
    navigation.setParams({ listData: newListData });
  }

  render() {
    const { route: { params: { listData: { items = [] } } } } = this.props;
    return (
      <View>
        <Text>Test</Text>
        {
          items.map(({ name, qty }, index) => (<Item name={name} qty={qty} key={index} />))
        }
      </View>
    );
  }
}

export default List;
