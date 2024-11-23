import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRegionData = createAsyncThunk(
  'region/fetchRegionData',
  async () => {
    try {
      const baseUrl = 'https://covid-api.com/api';
      const endpoint = '/regions'; // Endpoint
      const queryParams = '?order=name&sort=asc'; // Sorgu parametreleri
      const url = `${baseUrl}${endpoint}${queryParams}`;
      const response = await axios.get(url);
      return response?.data?.data;
    } catch (error) {
      throw new Error(error?.message);
    }
  }
);

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  selectedCountry: '',
};

const regionSlice = createSlice({
  name: 'region',
  initialState,
  reducers: {
    selectCountry: (state, action) => {
      state.selectedCountry = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRegionData.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchRegionData.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error?.message;
    });
    builder.addCase(fetchRegionData.fulfilled, (state, action) => {
      state.status = 'success';
      state.data = action.payload;
    });
  },
});

export const { selectCountry } = regionSlice.actions;

export default regionSlice.reducer;
