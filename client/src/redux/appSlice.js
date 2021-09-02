import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  budgetModal: false,
  editBudgetId: null,
  delBudgetId: null,
  delBudgetName: null,
  confirmDelModal: false,
};

export const appSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //
    toggleBudgetModal(state) {
      state.budgetModal = !state.budgetModal;
    },

    setEditBudgetId(state, action) {
      state.editBudgetId = action.payload;
    },
    setDeleteBudget(state, action) {
      state.delBudgetId = action.payload.id;
      state.delBudgetName = action.payload.name;
      state.confirmDelModal = true;
    },
    closeDeleteBudgetModal(state) {
      state.delBudgetId = null;
      state.delBudgetName = null;
      state.confirmDelModal = false;
    },
    unsetEditBudgetId(state) {
      state.editBudgetId = null;
    },
  },
  extraReducers: {
    //
  },
});

export const {
  toggleBudgetModal,
  setEditBudgetId,
  setDeleteBudget,
  unsetEditBudgetId,
  closeDeleteBudgetModal,
} = appSlice.actions;

export default appSlice.reducer;
