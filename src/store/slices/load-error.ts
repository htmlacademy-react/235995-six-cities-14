import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import { NameSpace } from '../../const';

export interface LoadErrorSlice {
  error: string | null;
}

const initialState: LoadErrorSlice = {
  error: null,
};

export const loadErrorSlice = createSlice({
  name: NameSpace.loadError,
  initialState,
  reducers: {
    loadError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    }
  }
});
