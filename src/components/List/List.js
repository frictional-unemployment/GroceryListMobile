import React from 'react';
import {
  Button, Modal, View, Text
} from 'react-native';
import Item from './Item/Item';
import NewNameForm from './Forms/NewNameForm';
import NewItemForm from './Forms/NewItemForm';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newNameVisible: false,
      newItemVisible: false
    };
  }

  componentDidMount() {
    const { navigation, route } = this.props;
    navigation.setOptions({
      title: route.params.listData.listName,
      headerRight: () => (
        <Button
          title="Change List Name"
          onPress={() => this.changeNewNameVisible(true)}
          color="green"
        />
      )

    });
  }

  componentDidUpdate() {
    const { navigation, route } = this.props;
    navigation.setOptions({
      title: route.params.listData.listName
    });
  }

  changeNewNameVisible(visibility) {
    this.setState({
      newNameVisible: visibility
    });
  }

  changeNewItemVisible(visibility) {
    this.setState({
      newItemVisible: visibility
    });
  }

  changeListName(newName) {
    if (newName.canceled) {
      return;
    }
    const { navigation, route } = this.props;
    const newListData = { ...route.params.listData };
    newListData.listName = newName.name;
    navigation.setParams({ listData: newListData });
  }

  addNewItem({ name, qty = 1, canceled }) {
    if (canceled) {
      return;
    }
    const { navigation, route } = this.props;
    const item = { name, qty, purchased: false };
    const newListData = { ...route.params.listData };
    newListData.items.push(item);
    navigation.setParams({ listData: newListData });
  }

  togglePurchased(index) {
    const { navigation, route } = this.props;
    const newListData = { ...route.params.listData };
    newListData.items[index].purchased = !newListData.items[index].purchased;
    navigation.setParams({ listData: newListData });

    // this.forceUpdate();
  }

  render() {
    const { route: { params: { listData: { items = [] } } } } = this.props;
    const { newNameVisible, newItemVisible } = this.state;

    return (
      <View>
        <Text>Test</Text>
        {
          items.map(({ name, qty, purchased }, index) => (
            <Item
              name={name}
              qty={qty}
              purchased={purchased}
              key={index}
              togglePurchased={() => this.togglePurchased(index)}
            />
          ))
        }
        <Button
          title="Add New Item"
          onPress={() => this.changeNewItemVisible(true)}
          color="green"
        />
        <Modal
          visible={newNameVisible}
        >
          <NewNameForm
            commitNewName={(name) => this.changeListName(name)}
            closeModal={() => this.changeNewNameVisible(false)}
          />
        </Modal>
        <Modal
          visible={newItemVisible}
        >
          <NewItemForm
            commitNewItem={(item) => this.addNewItem(item)}
            closeModal={() => this.changeNewItemVisible(false)}
          />
        </Modal>
      </View>
    );
  }
}

export default List;
