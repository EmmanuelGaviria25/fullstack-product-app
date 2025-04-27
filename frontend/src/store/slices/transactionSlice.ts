import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TransactionState {
  status: 'PENDING' | 'SUCCESS' | 'FAILED' | null;
  transactionId: string | null;
}

const initialState: TransactionState = {
  status: null,
  transactionId: null,
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setTransactionStatus(state, action: PayloadAction<{ status: TransactionState['status']; transactionId: string }>) {
      state.status = action.payload.status;
      state.transactionId = action.payload.transactionId;
    },
    clearTransaction(state) {
      state.status = null;
      state.transactionId = null;
    },
  },
});

export const { setTransactionStatus, clearTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;