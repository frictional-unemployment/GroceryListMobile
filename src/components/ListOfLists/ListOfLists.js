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
  const { navigation } = props;
  const [groceryList, setGroceryList] = useState(sample);
  // const [currentList, setCurrentList] = useState('');

  return (
    <View>
      <Text>List of Lists</Text>
      {groceryList ? (
        <View>
          <FlatList
            data={sample}
            renderItem={({ item, index }) => {
              index++;
              return (
                <View>
                  <Text
                    key={index}
                    onPress={() => {
                      props.setCurrentList(item.name);
                      console.log('currentList: ', item.name);
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
              );
            }}
          />
        </View>
      ) : (
        <Text>No List to see</Text>
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({
  currentList: state.currentList,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentList: (currentList) => dispatch(setCurrentList(currentList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListOfLists);
