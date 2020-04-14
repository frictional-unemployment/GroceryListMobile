import React from 'react';
import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native';

const newItemForm = (props) => {
  const [name, setName] = React.useState('');
  const [qty, setQty] = React.useState(-1);
  const [warningVisible, setWarningVisible] = React.useState(false);

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'yellow',
        height: '100%'
      }}
    >
      <Text>
        Enter item name:
      </Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setName(text)}
      />
      {
        warningVisible ? (
          <Text
            style={{
              color: 'red'
            }}
          >
            Please enter an item name.
          </Text>
        ) : null
      }
      <Text>
        Enter quantity:
      </Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setQty(text)}
        keyboardType="number-pad"
      />
      <TouchableOpacity
        style={[styles.button, styles.blue]}
        onPress={() => {
          if (name.trim().length === 0) {
            setWarningVisible(true);
            return;
          }
          props.commitNewItem({ name, qty });
          props.closeModal();
        }}
      >
        <Text
          style={styles.buttonText}
        >
          ADD ITEM
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.red]}
        onPress={() => {
          props.commitNewItem({ canceled: true });
          props.closeModal();
        }}
      >
        <Text
          style={styles.buttonText}
        >
          CANCEL
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
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

export default newItemForm;
