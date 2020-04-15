import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

const editItemForm = ({ index, item: { name, qty }, saveChanges, deleteItem }) => {
  const [newName, setNewName] = useState(name);
  const [newQty, setNewQty] = useState(qty);

  // useEffect(() => {
  //   setNewName(name);
  //   setNewQty(qty);
  // }, []);

  // console.log('make sure im not going crazy', newName, newQty);

  const initialName = name;
  const initalQty = qty;

  return (
    <View style={styles.container}>
      <Text>
        Item Name:
      </Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(n) => setNewName(n)}
        value={newName}
      />
      <Text>
        Item Quantity:
      </Text>
      <TextInput
        style={styles.textInput}
        keyboardType="number-pad"
        onChangeText={(q) => setNewQty(q)}
        value={`${newQty}`}
      />
      <TouchableOpacity
        style={[styles.button, styles.blue]}
        onPress={() => {
          saveChanges({ index, name: newName, qty: newQty });
        }}
      >
        <Text
          style={styles.buttonText}
        >
          SAVE CHANGES
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.red]}
        onPress={() => {
          saveChanges({ canceled: true });
        }}
      >
        <Text
          style={styles.buttonText}
        >
          CANCEL
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.red]}
        onPress={() => {
          setNewName(initialName);
          setNewQty(initalQty);
        }}
      >
        <Text
          style={styles.buttonText}
        >
          RESET
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.red]}
        onPress={() => {
          console.log('button pressed!');
          deleteItem();
        }}
      >
        <Text
          style={styles.buttonText}
        >
          DELETE
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  textInput: {
    width: '50%',
    height: 30,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center'
  },
  button: {
    width: '75%',
    borderRadius: 2,
    height: 50,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
  blue: {
    backgroundColor: 'blue'
  },
  red: {
    backgroundColor: 'red'
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  }
};

export default editItemForm;
