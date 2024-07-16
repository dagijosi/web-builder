import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  elements: [],
  selectedElementId: null,
};

const elementsSlice = createSlice({
  name: 'elements',
  initialState,
  reducers: {
    addElement: (state, action) => {
      state.elements.push(action.payload);
    },
    updateElement: (state, action) => {
      const { id, properties } = action.payload;
      const elementIndex = state.elements.findIndex(el => el.id === id);
      if (elementIndex !== -1) {
        state.elements[elementIndex] = { ...state.elements[elementIndex], ...properties };
      }
    },
    deleteElement: (state, action) => {
      state.elements = state.elements.filter(el => el.id !== action.payload);
    },
    selectElement: (state, action) => {
      state.selectedElementId = action.payload;
    },
  },
});

export const { addElement, updateElement, deleteElement, selectElement } = elementsSlice.actions;
export default elementsSlice.reducer;
