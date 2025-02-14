import { createSlice } from '@reduxjs/toolkit';

interface CatState {
  filter: boolean;
}

const initialState: CatState = {
  filter: false,
};

const catSlice = createSlice({
  name: 'cat',
  initialState,
  reducers: {
    toggleFilter: (state: { filter: boolean; }) => {
      state.filter = !state.filter;
    },
  },
});

export const { toggleFilter } = catSlice.actions;
export default catSlice.reducer;
