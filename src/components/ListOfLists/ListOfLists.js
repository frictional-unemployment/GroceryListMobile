import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  FlatList,
  SafeAreaView,
  Dimensions,
  ScrollView,
  TextInput,
  Modal,
  Input,
  TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import { setCurrentList } from '../../redux/state/state.actions';
import { sample } from '../../../assets/samplelist';

const ListOfLists = (props) => {
  const { navigation, currentList } = props;
  const [groceryList, setGroceryList] = useState(sample);
  // const [currentList, setCurrentList] = useState('');
  const [modalVisible, toggleModal] = useState(false);
  const [listName, setListName] = useState('');

  useEffect(() => {
    // console.log(groceryList);
  });

  const addNewList = (item, cancelled) => {
    if (cancelled) {
      return true;
    }
    setGroceryList([
      ...groceryList,
      {
        name: item,
      },
    ]);
  };

  const deleteAList = (e) => {
    // const name = e.target.value;
    const name = e;
    console.log('this is e: ', e);
    // const afterDelete = groceryList.filter((item) => item.name !== name);
    // console.log('AFTER DELETE: ', afterDelete);
    setGroceryList(groceryList.filter((item) => item.name !== name));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List of Lists</Text>
      {groceryList ? (
        <View>
          <FlatList
            data={groceryList}
            renderItem={({ item, index }) => {
              index++;
              return (
                <View style={styles.listContainer}>
                  <Text
                    style={styles.listNames}
                    key={index}
                    onPress={() => {
                      props.setCurrentList(item.name);
                      console.log('item.name: ', item.name);
                      console.log('currentList: ', currentList);
                    }}
                  >
                    {item.name}
                  </Text>
                  <Button
                    style={styles.delete}
                    title="DELETE"
                    onPress={() => {
                      console.log('item to delete: ', item.name);
                      console.log('total lists: ', groceryList);
                      deleteAList(item.name);
                    }}
                  >
                    DELETE
                  </Button>
                </View>
              );
            }}
          />

          <Modal
            style={styles.modalContainer}
            animationType="slide"
            transparent
            visible={modalVisible}
            onRequestClose={() => {
              console.log('Modal has been closed.');
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                backgroundColor: 'gray',
                justifyContent: 'center',
                margin: 25,
              }}
            >
              <TextInput
                placeholderTextColor="black"
                style={styles.modalInput}
                name="email"
                placeholder="Enter Group Name"
                autoCapitalize="none"
                onChangeText={(text) => setListName(text)}
              />
              <Button
                title="ADD GROUP"
                onPress={() => {
                  toggleModal(false);
                  addNewList(listName, false);
                }}
              >
                ADD GROUP(S)
              </Button>
              <Button title="CLOSE" onPress={() => toggleModal(false)}>
                CLOSE
              </Button>
            </View>
          </Modal>

          <Button
            title="Create a New List"
            onPress={() => {
              // console.log('button press:', currentList);
              toggleModal(true);
            }}
          >
            CLOSE
          </Button>
          <Button
            title="State of the list"
            onPress={() => {
              console.log('button press:', groceryList);
              // toggleModal(true);
            }}
          >
            CLOSE
          </Button>
        </View>
      ) : (
        <View>
          <Text>No list to display! Please create a new list.</Text>
          <Button
            title="Create a New List"
            // onPress={() => console.log('button press:', currentList)}
          >
            CLOSE
          </Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    // height: '100%',
    // marginTop: 30,
    // flexDirection: 'row',
    justifyContent: 'center',
    // alignContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'blue',
  },

  title: {
    // borderColor: 'red',
    marginTop: 30,
    padding: 20,
    display: 'flex',
    // justifyContent: 'center',
    // alignContent: 'center',
    // alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'red',
    fontSize: 50,
  },

  listContainer: {
    justifyContent: 'space-between',
    backgroundColor: 'yellow',
    padding: 20,
    alignItems: 'flex-start',
    fontSize: 30,
    flexDirection: 'row',
  },

  listNames: {
    fontSize: 30,
  },

  delete: {
    justifyContent: 'flex-end',
  },

  modalContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => ({
  currentList: state.currentList,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentList: (currentList) => dispatch(setCurrentList(currentList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListOfLists);
