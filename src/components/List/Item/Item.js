import React from 'react';
import { Text, View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

const List = ({ name, qty }) => {

  return (
    <TouchableHighlight
      style={styles.item}
      onLongPress={() => {
        console.log('long pres');
        console.log('longPress');
      }}
      onPress={() => console.log('short press')}
    >
      <View style={styles.item}>
        <Text style={styles.itemName}>
          {name}
        </Text>
        <Text style={styles.itemQty}>
          Item Qty:
          {qty}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = {
  item: {
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  itemName: {
    fontWeight: 'bold',
    justifySelf: 'start'
  },
  itemQty: {
    fontWeight: 'bold',
    justifySelf: 'end'
  },
  touch: {
    width: 100,
    height: 30,
    borderColor: 'black',
    borderWidth: 2
  }
};

export default List;
