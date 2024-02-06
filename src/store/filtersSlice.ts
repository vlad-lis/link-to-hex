import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TFiltersState = {
  filters: string[];
};

const initialState: TFiltersState = {
  filters: ['desc_counter'],
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    updateFilters: (state, action: PayloadAction<string[]>) => {
      state.filters = action.payload;
    },
    clearFilters: (state) => {
      state.filters = [];
    },
  },
});

export const { updateFilters, clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
