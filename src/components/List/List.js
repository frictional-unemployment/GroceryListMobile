import React from 'react';
import { Button, Modal, View, Text } from 'react-native';
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
    console.log('This is list data', route.params.listData);
    navigation.setOptions({
      title: route.params.listData.listName,
      headerRight: () => {
        return (
          <Button
            title="Change List Name"
            onPress={() => this.changeNewNameVisible(true)}
            color="green"
          />
        );
      },
    });
  }

  componentDidUpdate() {
    const { navigation, route } = this.props;
    console.log('This is list data', route.params.listData);
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
    navigation.setParams({ listData: newListData});
  }

  render() {
    const { route: { params: { listData: { items = [] } } } } = this.props;
    return (
      <View>
        <Text>Test</Text>
        {
          items.map(({ name, qty }, index) => (<Item name={name} qty={qty} key={index} />))
        }
        <Button
          title="Add New Item"
          onPress={() => this.changeNewItemVisible(true)}
          color="green"
        />
        <Modal
          visible={this.state.newNameVisible}
        >
          <NewNameForm
            commitNewName={(name) => this.changeListName(name)}
            closeModal={() => this.changeNewNameVisible(false)}
          />
        </Modal>
        <Modal
          visible={this.state.newItemVisible}
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
