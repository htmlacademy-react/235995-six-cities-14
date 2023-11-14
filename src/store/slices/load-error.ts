import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import { NameSpace } from '../../const';

export interface LoadErrorProps {
  error: string | null;
}

const initialState = {
  error: null,
};

export const loadError = createSlice({
  name: NameSpace.loadError,
  initialState,
  reducers: {
    loadError(state, action: PayloadAction<LoadErrorProps>) {
      state.error = action.payload;
    }
  }
});
