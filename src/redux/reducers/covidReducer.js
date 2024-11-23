import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCovidData = createAsyncThunk(
  'tracker/fetchCovidData',
  async (params) => {
    try {
      const { selectedCountry } = params;
      console.log(selectedCountry);

      const baseUrl = `https://covid-api.com/api/reports/total?`;

      const response = await axios.get(baseUrl, {
        params: {
          ...(selectedCountry && { iso: selectedCountry }), // Ülke kodunu parametre olarak gönderiyoruz
        },
      });
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
};

const covidSlice = createSlice({
  name: 'covid',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCovidData.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchCovidData.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error?.message;
    });
    builder.addCase(fetchCovidData.fulfilled, (state, action) => {
      state.status = 'success';
      state.data = action.payload;
    });
  },
});

export default covidSlice.reducer;
