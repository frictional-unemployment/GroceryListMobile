import React from 'react';
import {
  Button, Modal, Picker, ScrollView, View
} from 'react-native';
import Item from './Item/Item';
import NewNameForm from './Forms/NewNameForm';
import NewItemForm from './Forms/NewItemForm';
import EditItemForm from './Forms/EditItemForm';

import model from '../../../db/model';

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

  /**
   * On start just take the listName and put it
   * as the header.
   */
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

  /**
   * ******* Forgot what this is for
   * I believe this was to reset the header when
   * the user would do a name change for the list
   */
  componentDidUpdate() {
    const { navigation, route } = this.props;
    navigation.setOptions({
      title: route.params.listData.listName
    });
  }

  // will sort by unpurchased first then alphabetical
  // considering adding options to sort differently
  /**
   * Sorts the items within the list. Defaults to sort purchased items last
   * @param {string} type style to sort by. 
   *    Options are 'alphabet', 'purchasedFirst', 'purchasedLast'
   */
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

  /**
   * Changes the visiblity of the modal that changes the listname
   * @param {boolean} visibility state to display the modal
   */
  changeNewNameVisible(visibility) {
    this.setState({
      newNameVisible: visibility
    });
  }

  /**
   * Changes the visiblity of the modal that adds a new item
   * @param {boolean} visibility state to display the modal
   */
  changeNewItemVisible(visibility) {
    this.setState({
      newItemVisible: visibility
    });
  }

  /**
   * Changes the visiblity of the modal that edits an item
   * @param {boolean} visibility state to display the modal
   */
  changeEditItemVisible(visibility, index) {
    this.setState({
      editItemVisible: visibility,
      editItemIndex: index
    });
  }

  /**
   * Changes the name of the current list
   * @param {string} newName the name to set the list to
   */
  changeListName(newName) {
    if (newName.canceled) {
      return;
    }
    const { navigation, route } = this.props;
    const newListData = { ...route.params.listData };
    newListData.listName = newName.name;
    navigation.setParams({ listData: newListData });
  }

  /**
   * Function is used by the newItem modal. Used on submission
   * or cancelation of the form.
   * @param {Item <object>} param0 object that contains item details or a boolean
   *  value for cancelation of the form.
   */
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

  /**
   * Flips the purchased property of the item at the given index within the current list
   * @param {number <int>} index index within the grocery list of the item
   *  thats purchased property will be toggled
   */
  togglePurchased(index) {
    const { navigation, route } = this.props;
    const newListData = { ...route.params.listData };
    newListData.items[index].purchased = !newListData.items[index].purchased;
    navigation.setParams({ listData: newListData });
  }

  /**
   * Funcition is used by the editItem modal.
   * @param {item <object>} param0  Response object from the modal. Has details
   *  for the item, or a canceled property.
   */
  editItem({
    index, name, qty, canceled
  }) {
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

  /**
   * Function to be used by the editItem form. Lets user delete an item from the list
   * @param {number <int>} index index of the item within current list to be deleted.
   */
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
