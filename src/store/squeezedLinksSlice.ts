import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TSqueezedLinksState = {
  links: Array<{ id: number; target: string; short: string }>;
};

const initialState: TSqueezedLinksState = {
  links: JSON.parse(sessionStorage.getItem('squeezedLinks') || '[]'),
};

const squeezedLinksSlice = createSlice({
  name: 'squeezedLinks',
  initialState,
  reducers: {
    addSqueezedLink: (
      state,
      action: PayloadAction<{ target: string; short: string }>
    ) => {
      const newLinkObject = {
        id: state.links.length + 1,
        target: action.payload.target,
        short: action.payload.short,
      };
      state.links.push(newLinkObject);
      sessionStorage.setItem('squeezedLinks', JSON.stringify(state.links));
    },
    clearSqueezedLinks: (state) => {
      state.links = [];
      sessionStorage.removeItem('squeezedLinks');
    },
  },
});

export const { addSqueezedLink, clearSqueezedLinks } =
  squeezedLinksSlice.actions;
export default squeezedLinksSlice.reducer;
