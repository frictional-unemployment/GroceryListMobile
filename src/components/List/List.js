import React from 'react';
import {
  Button, Modal, Picker, ScrollView, View
} from 'react-native';
import Item from './Item/Item';
import NewNameForm from './Forms/NewNameForm';
import NewItemForm from './Forms/NewItemForm';
import EditItemForm from './Forms/EditItemForm';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newNameVisible: false,
      newItemVisible: false,
      editItemVisible: false,
      editItemIndex: -1,
      sortingStyle: 'purchasedLast'
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

    this.sortListItems(this.state.sortingStyle);
  }

  componentDidUpdate() {
    const { navigation, route } = this.props;
    navigation.setOptions({
      title: route.params.listData.listName
    });
  }

  // will sort by unpurchased first then alphabetical
  // considering adding options to sort differently

  sortListItems(type = 'purchasedLast') {
    const { navigation, route } = this.props;
    const { listName, items } = route.params.listData;

    const sortedItems = [...items];

    if (type === 'alphabet') {
      sortedItems.sort((item1, item2) => {
        return item1.name.localeCompare(item2.name);
      });
    } else if (type === 'purchasedFirst') {
      sortedItems.sort((item1, item2) => {
        let output = 0;
        if (item1.purchased === item2.purchased) {
          output = item1.name.localeCompare(item2.name);
        } else if (item1.purchased) {
          output = -1;
        } else {
          output = 1;
        }
        return output;
      });
    } else if (type === 'purchasedLast') {
      sortedItems.sort((item1, item2) => {
        let output = 0;
        if (item1.purchased === item2.purchased) {
          output = item1.name.localeCompare(item2.name);
        } else if (item1.purchased) {
          output = 1;
        } else {
          output = -1;
        }

        return output;
      });
    }

    navigation.setParams({
      listData: {
        listName,
        items: sortedItems
      }
    });
    // this.setState(this.state.sortingStyle)
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

  changeEditItemVisible(visibility, index) {
    this.setState({
      editItemVisible: visibility,
      editItemIndex: index
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
    newListData.items = [item, ...newListData.items];
    navigation.setParams({ listData: newListData });
  }

  togglePurchased(index) {
    const { navigation, route } = this.props;
    const newListData = { ...route.params.listData };
    newListData.items[index].purchased = !newListData.items[index].purchased;
    navigation.setParams({ listData: newListData });
  }

  editItem({ index, name, qty, canceled }) {
    if (!canceled) {
      const { navigation, route } = this.props;
      const newListData = { ...route.params.listData };
      newListData.items[index].name = name;
      newListData.items[index].qty = qty || 1;
      navigation.setParams({ listData: newListData });
    }
    this.setState({
      editItemVisible: false,
      editItemIndex: -1
    });
  }

  deleteItem(index) {
    const { navigation, route } = this.props;
    const newListData = { ...route.params.listData };
    newListData.items[index].items = newListData.items.splice(index, 1);
    navigation.setParams({ listData: newListData });

    this.setState({
      editItemVisible: false,
      editItemIndex: -1
    });
  }

  render() {
    const { route: { params: { listData: { items = [] } } } } = this.props;
    const { newNameVisible, newItemVisible, editItemVisible, editItemIndex } = this.state;

    return (
      <>
        <Picker
          onValueChange={(value) => this.sortListItems(value)}
        >
          <Picker.item label="Alphabetical" value="alphabet" />
          <Picker.item label="Purchased First" value="purchasedFirst" />
          <Picker.item label="Purchased Last" value="purchasedLast" />
        </Picker>
        <ScrollView>
          {
            items.map(({ name, qty, purchased }, index) => (
              <Item
                name={name}
                qty={qty}
                purchased={purchased}
                key={index}
                togglePurchased={() => this.togglePurchased(index)}
                startEdit={() => this.changeEditItemVisible(true, index)}
              />
            ))
          }
          <Modal
            visible={newNameVisible}
            onRequestClose={() => this.changeNewNameVisible(false)}
          >
            <NewNameForm
              commitNewName={(name) => this.changeListName(name)}
              closeModal={() => this.changeNewNameVisible(false)}
            />
          </Modal>
          <Modal
            visible={newItemVisible}
            onRequestClose={() => this.changeNewItemVisible(false)}
          >
            <NewItemForm
              commitNewItem={(item) => this.addNewItem(item)}
              closeModal={() => this.changeNewItemVisible(false)}
            />
          </Modal>
          <Modal
            visible={editItemVisible}
            onRequestClose={() => this.changeEditItemVisible(false, -1)}
          >
            <EditItemForm
              index={editItemIndex}
              item={items[editItemIndex]}
              saveChanges={(item) => this.editItem(item)}
              deleteItem={() => this.deleteItem(editItemIndex)}
            />
          </Modal>
        </ScrollView>
        <Button
          title="Add New Item"
          onPress={() => this.changeNewItemVisible(true)}
          color="green"
        />
      </>
    );
  }
}

export default List;
