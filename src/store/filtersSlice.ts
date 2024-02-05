import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TFiltersState = {
  filters: string[];
};

const storedFilters = JSON.parse(sessionStorage.getItem('filters') || '[]');
const defaultFilters = ['desc_counter'];
const initialState: TFiltersState = {
  filters: storedFilters.length > 0 ? storedFilters : defaultFilters,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    updateFilters: (state, action: PayloadAction<string[]>) => {
      state.filters = action.payload;
      sessionStorage.setItem('filters', JSON.stringify(state.filters));
    },
    clearFilters: (state) => {
      state.filters = [];
      sessionStorage.removeItem('filters');
    },
  },
});

export const { updateFilters, clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
