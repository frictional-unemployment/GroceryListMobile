import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';

const newNameForm = (props) => {
  const [newName, setNewName] = React.useState('');

  return (
    <View>
      <Text>
        Enter New Form Name:
      </Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setNewName(text)}
      />
      <Button
        onPress={() => {
          props.commitNewName({ name: newName });
          props.closeModal();
        }}
        title="Enter New Name"
      />
      <Button
        color='red'
        onPress={() => {
          props.commitNewName({ canceled: true });
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

export default newNameForm;
