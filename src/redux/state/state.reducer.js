const INITIAL_STATE = {
  currentList: [],
  loading: false,
  error: false,
};

const stateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_CURRENT_LIST':
      return {
        ...state,
        groceryList: action.payload,
      };
    case 'SET_LOADING_STATUS':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR_STATUS':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default stateReducer;
