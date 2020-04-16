import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const List = ({
  name, qty, purchased, togglePurchased, startEdit
}) => {
  const purchasedStyle = [styles.item];

  if (purchased === true) {
    purchasedStyle.push({ backgroundColor: 'grey' });
  } else if (purchased === false) {
    purchasedStyle.push({ backgroundColor: 'white' });
  }

  return (
    <TouchableOpacity
      style={[purchasedStyle, purchased ? styles.purchased : styles.unPurchased]}
      onLongPress={() => {
        startEdit();
      }}
      onPress={() => {
        togglePurchased();
      }}
      underlayColor="green"
      activeOpacity={0.2}
    >
      <View style={[styles.item, purchased ? styles.purchased : styles.unPurchased]}>
        <Text
          style={[styles.itemName, purchased ? styles.purchased : styles.unPurchased]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {name}
        </Text>
        <Text style={[styles.itemQty, purchased ? styles.purchased : styles.unPurchased]}>
          Qty:
          {qty}
        </Text>
        { purchased ? (
          <Text style={styles.horizontalRule} />
        ) : null }
      </View>
    </TouchableOpacity>
  );
};

let styles = StyleSheet.create({
  item: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexWrap: 'nowrap',
    position: 'relative',
  },
  itemName: {
    height: '100%',
    fontSize: 30,
    overflow: 'hidden',
    left: '25%',
    backgroundColor: 'green',
    width: '70%'
  },
  itemQty: {
    height: '100%',
    marginLeft: 'auto',
    fontSize: 30,
    right: '25%'
  },
  touch: {
    width: 100,
    height: 30,
    borderColor: 'black',
    borderWidth: 2
  },
  purchased: {
    backgroundColor: 'lightgrey',
    color: 'grey'
  },
  unPurchased: {
    backgroundColor: 'white',
    textDecorationLine: 'none'
  },
  horizontalRule: {
    width: '100%',
    height: '50%',
    borderBottomWidth: 3,
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
    position: 'absolute',
    borderColor: 'dimgrey'
  }
});

export default List;
