export const setCurrentList = (currentList) => ({
  type: 'SET_CURRENT_LIST',
  payload: currentList,
});

export const setLoadingStatus = (loading) => ({
  type: 'SET_LOADING_STATUS',
  payload: loading,
});

export const setErrorStatus = (error) => ({
  type: 'SET_ERROR_STATUS',
  payload: error,
});
