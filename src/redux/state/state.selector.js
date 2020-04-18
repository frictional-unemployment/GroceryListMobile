import { createSelector } from 'reselect';

const selectList = state => state.booklist;

export const selectBooklist = createSelector(
  [selectList],
  state => state.booklist
);
