import { AsyncStorage } from 'react-native';

/**
* Private function that retrieves the TRACKER object
* @return {Object} tracker object from the database
*/
const getTracker = async () => {
  let tracker = JSON.parse(await AsyncStorage.getItem('TRACKER'));

  if (!tracker) {
    // the tracker object is missing, then we create it
    await AsyncStorage.setItem('TRACKER', JSON.stringify({ nextId: 1 }));
    tracker = JSON.parse(await AsyncStorage.getItem('TRACKER'));
  }

  return tracker;
};

/**
* Private function that sets the TRACKER object in the database
* @param {Object} data object to set the TRACKER object to
*/
const setTracker = async (tracker) => {
  await AsyncStorage.setItem('TRACKER', JSON.stringify(tracker));
};

/**
 * Private function that stringify id values
 * @param {any} listId
 */
const stringifyListId = (listId) => {
  if (typeof listId !== 'string') {
    return JSON.stringify(listId);
  }
  return listId;
};

const modelFunctions = {
  /**
  * Creates a new list with the listName provided
  * @param {string} listName  Name of the new list to be created
  * @return {Promise<Object>} Promise result of the database setItem()
  */
  createNewList: async (listName) => {
    const tracker = await getTracker();

    // if the listname already exists within tracker,
    // that means it's a duplicate, so throw an error!
    if (tracker[listName]) {
      throw new Error('Duplicate List Name');
    }

    // add listname as a entry into tracker with the next Id#
    tracker[listName] = tracker.nextId;
    // increment tracker number
    tracker.nextId += 1;
    // set the new tracker
    await setTracker(tracker);

    // create a new blank list template
    const list = {
      listName,
      items: []
    };

    return AsyncStorage.setItem(JSON.stringify(tracker[listName]), JSON.stringify(list));
  },
  /**
  * Retrieves the list using the listId value
  * @param {string} listId    id value for the list in the database. will cast to string
  * @return {Promise<Object>} Promise that resolves in a list object
  */
  getListById: async (listId) => {
    const id = stringifyListId(listId);
    return JSON.parse(await AsyncStorage.getItem(id));
  },
  /**
  * Retrieves the list using the list name. Utilizes getListById
  * @param {string} listId    id value for the list in the database
  * @return {Promise<Object>} Promise that resolves in a list object
  */
  getListByName: async (name) => {
    // first get id of list
    const listId = await modelFunctions.getListIdFromName(name);
    // then retrieve the list
    return modelFunctions.getListById(listId);
  },
  /**
  * Updates the list with new items
  * @param {string} listId      id value for the list in the database
  * @param {array[Items]} items Array of item objects to store
  * @return {Promise<Object>}   Promise result of the database setItem()
  */
  updateListById: async (listId, items) => {
    // dont use AsyncStorage.merge() here
    // that will merge items together, we need to
    // overwrite it incase the user wants to
    // delete anything from their lists

    // first get the list name
    const { listName } = await modelFunctions.getListById(listId);

    // then set the entry to the same name, but new list
    const newList = {
      listName,
      items
    };

    return AsyncStorage.setItem(listId, JSON.stringify(newList));
  },

  /**
  * Updates the list with new items
  * @param {string} name        id value for the list in the database
  * @param {array[Items]} items Array of item objects to store
  * @return {Promise<Object>}   Promise result of the database setItem()
  */
  updateListByName: async (listName, items) => {
    // dont use AsyncStorage.merge() here
    // that will merge items together, we need to
    // overwrite it incase the user wants to
    // delete anything from their lists

    // first get list Id
    const listId = await getTracker()[listName];

    // then set the entry to the same name, but new list
    const newList = {
      listName,
      items
    };

    return AsyncStorage.setItem(listId, newList);
  },
  /**
  * Updates the list with a new name
  * @param {string} listId    id value for the list in the database
  * @param {string} newName   New name for the list
  * @return {Promise<Object>} Promise result of the setTracker()
  */
  updateListNameById: async (listId, newName) => {
    // first update list
    const list = await modelFunctions.getListById(listId);
    const oldName = list.listName;
    list.listName = newName;

    const id = stringifyListId(listId);

    await AsyncStorage.setItem(id, JSON.stringify(list));

    // then update tracker
    const tracker = await getTracker();
    delete tracker[oldName];
    tracker[newName] = listId;
    return setTracker(tracker);
  },
  /**
  * Deletes the list by listId
  * @param {string} listId    Id of the list to be deleted.
  * @return {Promise<Object>} Promise result of the database removeItem()
  */
  deleteListById: async (listId) => {
    // get list name from the list
    const id = stringifyListId(listId);
    const { listName } = JSON.parse(await AsyncStorage.getItem(id));

    // remove from tracker
    const tracker = await getTracker();
    delete tracker[listName];
    await setTracker(tracker);

    // remove list from database
    return AsyncStorage.removeItem(id);
  },
  /**
  * Deletes the list by searching by listName
  * @param {string} listName  Name of the list to be deleted.
  * @return {Promise<Object>} Promise result of the database removeItem()
  */
  deleteListByName: async (listName) => {
    // get id of list
    const listId = modelFunctions.getListIdFromName(listName);
    const tracker = await getTracker();
    // remove from tracker
    delete tracker[listName];
    await setTracker(tracker);
    // remove list from database
    return AsyncStorage.removeItem(listId);
  },
  /**
  * Gets the Id of a list from it's name
  * @param {string} listName  Name of the list.
  * @return {string}          Id of the list.
  */
  getListIdFromName: async (listName) => {
    const tracker = await getTracker();
    return stringifyListId(tracker[listName]);
  },
  /**
  * Gets the names of all the lists
  * @return {array} array of the lists of the names
  */
  getListNames: async () => {
    const tracker = await getTracker();
    delete tracker.nextId;
    return Object.keys(tracker);
  },
  deleteAll: async () => {
    const keys = await modelFunctions.getListNames();
    await AsyncStorage.multiRemove(keys);
    return keys;
  }
};

export default modelFunctions;

/*
I'm thinking that we store two kinds of items in the database.
1. the lists themselves
2. an object that tracks the listName with an ID value

list object
1 (NUMBER): {
  listName: Ralphs (STRING),
  items: [
    {
      name: hotdogs (STRING),
      qty: 12 (NUMBER),
      purchased: true (BOOLEAN)
    },
    {
      name: buns (STRING),
      qty: 12 (NUMBER),
      purchased: false (BOOLEAN)
    },
    {
      name: tomatos(STRING),
      qty: 3 (NUMBER),
      purchased: false (BOOLEAN)
    }
  ]
}

Tracker object lets us convert listnames to ID's
Tracker: {
  nextId: 2 (next avalible index ID),
  list1: 1 (NUMBER),

}

*/
