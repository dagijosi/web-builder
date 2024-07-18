import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  elements: [],
  selectedElementId: null,
  history: [],
  future: [],
};

const elementsSlice = createSlice({
  name: 'elements',
  initialState,
  reducers: {
    addElement: (state, action) => {
      state.history.push(state.elements);
      state.elements.push(action.payload);
      state.future = [];
    },
    updateElement: (state, action) => {
      const { id, properties } = action.payload;
      const elementIndex = state.elements.findIndex(el => el.id === id);
      if (elementIndex !== -1) {
        state.history.push(state.elements);
        state.elements[elementIndex] = { ...state.elements[elementIndex], ...properties };
        state.future = [];
      }
    },
    deleteElement: (state, action) => {
      state.history.push(state.elements);
      state.elements = state.elements.filter(el => el.id !== action.payload);
      state.future = [];
    },
    selectElement: (state, action) => {
      state.selectedElementId = action.payload;
    },
    moveElementUp: (state, action) => {
      const index = state.elements.findIndex(el => el.id === action.payload);
      if (index > 0) {
        state.history.push(state.elements);
        const temp = state.elements[index];
        state.elements[index] = state.elements[index - 1];
        state.elements[index - 1] = temp;
        state.future = [];
      }
    },
    moveElementDown: (state, action) => {
      const index = state.elements.findIndex(el => el.id === action.payload);
      if (index < state.elements.length - 1) {
        state.history.push(state.elements);
        const temp = state.elements[index];
        state.elements[index] = state.elements[index + 1];
        state.elements[index + 1] = temp;
        state.future = [];
      }
    },
    loadProject: (state, action) => {
      state.history.push(state.elements);
      state.elements = action.payload;
      state.future = [];
    },
    undo: (state) => {
      if (state.history.length > 0) {
        const previousState = state.history.pop();
        state.future.push(state.elements);
        state.elements = previousState;
      }
    },
    redo: (state) => {
      if (state.future.length > 0) {
        const nextState = state.future.pop();
        state.history.push(state.elements);
        state.elements = nextState;
      }
    },
    groupElements: (state, action) => {
      const groupId = action.payload.groupId;
      const elementIds = action.payload.elementIds;
      state.history.push(state.elements);
      elementIds.forEach(id => {
        const elementIndex = state.elements.findIndex(el => el.id === id);
        if (elementIndex !== -1) {
          state.elements[elementIndex].groupId = groupId;
        }
      });
      state.future = [];
    },
  },
});

export const { addElement, updateElement, deleteElement, selectElement, moveElementUp, moveElementDown, loadProject, undo, redo, groupElements } = elementsSlice.actions;
export default elementsSlice.reducer;