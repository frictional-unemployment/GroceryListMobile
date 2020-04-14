import React from 'react';
import { Text, View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

const List = ({
  name, qty, purchased, togglePurchased
}) => {
  const purchasedStyle = [styles.item];

  if (purchased === true) {
    purchasedStyle.push({ backgroundColor: 'grey' });
  } else if (purchased === false) {
    purchasedStyle.push({ backgroundColor: 'white' });
  }

  return (
    <TouchableHighlight
      style={purchasedStyle}
      onLongPress={() => {
        console.log('long pres');
        console.log('longPress');
      }}
      onPress={() => {
        togglePurchased();
      }}
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

let styles = {
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
  },
  itemQty: {
    fontWeight: 'bold',
  },
  touch: {
    width: 100,
    height: 30,
    borderColor: 'black',
    borderWidth: 2
  }
};

export default List;
