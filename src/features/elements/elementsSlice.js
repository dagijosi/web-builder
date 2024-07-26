// src/features/elements/elementsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  elements: [],
  selectedElementId: null,
  history: [],
  future: [],
  zoomlevel: null,
  gaps: {},
};

const elementsSlice = createSlice({
  name: "elements",
  initialState,
  reducers: {
    addElement: (state, action) => {
      state.history.push([...state.elements]);
      state.elements.push(action.payload);
      state.future = [];
    },
    updateElement: (state, action) => {
      const { id, properties } = action.payload;
      const elementIndex = state.elements.findIndex((el) => el.id === id);
      if (elementIndex !== -1) {
        state.history.push([...state.elements]);
        state.elements[elementIndex] = {
          ...state.elements[elementIndex],
          ...properties,
        };
        state.future = [];
      }
    },
    deleteElement: (state, action) => {
      state.history.push([...state.elements]);
      state.elements = state.elements.filter(
        (el) => el.id !== action.payload
      );
      state.future = [];
    },
    selectElement: (state, action) => {
      state.selectedElementId = action.payload;
    },
    moveElementUp: (state, action) => {
      const index = state.elements.findIndex((el) => el.id === action.payload);
      if (index > 0) {
        state.history.push([...state.elements]);
        const temp = state.elements[index];
        state.elements[index] = state.elements[index - 1];
        state.elements[index - 1] = temp;
        state.future = [];
      }
    },
    moveElementDown: (state, action) => {
      const index = state.elements.findIndex((el) => el.id === action.payload);
      if (index < state.elements.length - 1) {
        state.history.push([...state.elements]);
        const temp = state.elements[index];
        state.elements[index] = state.elements[index + 1];
        state.elements[index + 1] = temp;
        state.future = [];
      }
    },
    loadProject: (state, action) => {
      state.history.push([...state.elements]);
      state.elements = action.payload;
      state.future = [];
    },
    undo: (state) => {
      if (state.history.length > 0) {
        state.future.push([...state.elements]);
        state.elements = state.history.pop();
      }
    },
    redo: (state) => {
      if (state.future.length > 0) {
        state.history.push([...state.elements]);
        state.elements = state.future.pop();
      }
    },
    groupElements: (state, action) => {
      const groupId = action.payload.groupId;
      const elementIds = action.payload.elementIds;
      state.history.push([...state.elements]);
      elementIds.forEach((id) => {
        const elementIndex = state.elements.findIndex((el) => el.id === id);
        if (elementIndex !== -1) {
          state.elements[elementIndex].groupId = groupId;
        }
      });
      state.future = [];
    },
    // Add the ungroupElements action
    ungroupElements: (state, action) => {
      const groupId = action.payload;
      state.history.push([...state.elements]);
      state.elements.forEach((element) => {
        if (element.groupId === groupId) {
          element.groupId = null; // Remove the groupId
        }
      });
      state.future = [];
    },
    updateZoomLevel: (state, action) => {
      state.zoomlevel = action.payload;
    },
    setParentElement: (state, action) => {
      const { childId, parentId } = action.payload;
      if (childId === parentId) return; // Prevent element from being its own parent
      const childIndex = state.elements.findIndex(
        (el) => el.id === childId
      );
      const parentIndex = state.elements.findIndex(
        (el) => el.id === parentId
      );
      if (childIndex !== -1 && parentIndex !== -1) {
        // Prevent circular references
        const isCircularReference = (currentId, targetId) => {
          if (currentId === targetId) return true;
          const parent = state.elements.find((el) => el.id === currentId);
          if (parent && parent.parentId) {
            return isCircularReference(parent.parentId, targetId);
          }
          return false;
        };

        if (!isCircularReference(parentId, childId)) {
          state.history.push([...state.elements]);
          state.elements[childIndex] = {
            ...state.elements[childIndex],
            parentId,
          };
          state.future = [];
        }
      }
    },
    reorderElements: (state, action) => {
      state.history.push([...state.elements]);
      state.elements = action.payload;
      state.future = [];
    },
    updateGaps: (state, action) => {
      state.gaps = action.payload;
    },
    // Add renameElement action
    renameElement: (state, action) => {
      const { id, newName } = action.payload;
      const elementIndex = state.elements.findIndex((el) => el.id === id);
      if (elementIndex !== -1) {
        state.history.push([...state.elements]);
        state.elements[elementIndex].content = newName; // Update the element's content
        state.future = [];
      }
    },
  },
});

export const {
  addElement,
  updateElement,
  deleteElement,
  selectElement,
  moveElementUp,
  moveElementDown,
  loadProject,
  undo,
  redo,
  groupElements,
  ungroupElements, // Export ungroupElements action
  updateZoomLevel,
  setParentElement,
  reorderElements,
  updateGaps,
  renameElement, // Export renameElement action
} = elementsSlice.actions;

export default elementsSlice.reducer;
