import React from 'react';
import { Alert, Button, View, Text, TextInput, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';
import model from '../../db/model';

const DBTest = () => {
  const [nextListId, setNextListId] = React.useState(1);
  const [listIdToGet, setListIdToGet] = React.useState();
  const [listNameToGet, setListNameToGet] = React.useState();

  return (
    <View>
      <Text>Database Testing Over here</Text>
      <Text>
        Next List Name: List#
        {nextListId}
      </Text>
      <Button
        title="Create New List"
        style={styles.button}
        onPress={async () => {
          await model.createNewList(`List#${nextListId}`);
          setNextListId(nextListId + 1);
        }}
      />
      <TextInput
        style={styles.inputFields}
        onChangeText={(text) => { setListIdToGet(text); }}
      />
      <Button
        title="Get List By ID"
        style={styles.button}
        onPress={async () => {
          const list = await model.getListById(listIdToGet);
          Alert.alert(JSON.stringify(list));
        }}
      />


      <TextInput
        style={styles.inputFields}
        onChangeText={(text) => { setListNameToGet(text); }}
      />
      <Button
        title="Get List By Name"
        style={styles.button}
        onPress={async () => {
          const list = await model.getListByName(listNameToGet);
          Alert.alert(JSON.stringify(list));
        }}
      />
      <Button
        title="Add to list id: 1"
        style={styles.button}
        onPress={async () => {
          await model.updateListById('1', ['test', 'testube']);
        }}
      />
      <Button
        title="Update List Name for id1 to 'Ralphs'"
        style={styles.button}
        onPress={async () => {
          await model.updateListNameById(1, 'Ralphs');
        }}
      />
      <Button
        title="Delete list id:1"
        style={styles.button}
        onPress={async () => {
          await model.deleteListById(1);
        }}
      />
      <Button
        title="Delete list listName:Ralphs"
        style={styles.button}
        onPress={async () => {
          await model.deleteListByName('Ralphs');
        }}
      />
      <Button
        title="Get just List Names"
        style={styles.button}
        onPress={async () => {
          // const keys = await AsyncStorage.getAllKeys();
          const keys = await model.getListNames();
          Alert.alert(JSON.stringify(keys));
        }}
      />
      <Button
        title="Get it all"
        style={styles.button}
        onPress={async () => {
          const allKeys = await AsyncStorage.getAllKeys();
          const allLists = await AsyncStorage.multiGet(allKeys);
          Alert.alert(JSON.stringify(allLists));
        }}
      />
      <Button
        title="Burn it all"
        style={styles.button}
        onPress={async () => {
          const keys = await model.deleteAll();
          Alert.alert(JSON.stringify(keys));
        }}
      />
    </View>
  );

};

const styles = StyleSheet.create({
  inputFields: {
    height: 30,
    width: '75%',
    borderColor: 'black',
    borderWidth: 1
  },
  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
});

export default DBTest;
