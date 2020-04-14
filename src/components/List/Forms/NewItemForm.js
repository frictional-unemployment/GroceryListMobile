import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';

const newItemForm = (props) => {
  const [name, setName] = React.useState('');
  const [qty, setQty] = React.useState(-1);
  const [warningVisible, setWarningVisible] = React.useState(false);

  return (
    <View>
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
              visible: warningVisible,
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
      <Button
        onPress={() => {
          if (name.trim().length === 0) {
            setWarningVisible(true);
            return;
          }
          props.commitNewItem({ name, qty });
          props.closeModal();
        }}
        title="Add Item"
      />
      <Button
        color="red"
        onPress={() => {
          props.commitNewItem({ canceled: true });
          props.closeModal();
        }}
        title="Cancel"
      />
    </View>
  );
};

const styles = {
  textInput: {
    width: '50%',
    height: 30,
    borderWidth: 1,
    borderColor: 'black'
  }
};

export default newItemForm;
