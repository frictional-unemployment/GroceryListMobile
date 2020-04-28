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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List of Lists</Text>
      {groceryList ? (
        <View>
          <FlatList
            data={sample}
            renderItem={({ item, index }) => {
              index++;
              return (
                <View style={styles.listContainer}>
                  <Text
                    key={index}
                    onPress={() => {
                      props.setCurrentList(item.name);
                      // console.log('currentList: ', item.name);
                      console.log('currentList: ', currentList);
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
              );
            }}
          />
          <Button
            title="current list"
            onPress={() => console.log('button press:', currentList)}
          >
            CLOSE
          </Button>
        </View>
      ) : (
        <Text>No List to see</Text>
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
    padding: 30,
    display: 'flex',
    // justifyContent: 'center',
    // alignContent: 'center',
    // alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'red',
  },

  listContainer: {
    backgroundColor: 'yellow',
    padding: 20,
    alignItems: 'flex-start',
    fontSize: 50,
  },
});

const mapStateToProps = (state) => ({
  currentList: state.currentList,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentList: (currentList) => dispatch(setCurrentList(currentList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListOfLists);
