import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sport: '',
  area: '',
  date: '',
  timeInterval: '',
  noOfPlayers: '',
};

const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    setSport: (state, action) => {
      state.sport = action.payload;
    },
    setArea: (state, action) => {
      state.area = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setTimeInterval: (state, action) => {
      state.timeInterval = action.payload;
    },
    setNoOfPlayers: (state, action) => {
      state.noOfPlayers = action.payload;
    },
    resetActivityForm: () => initialState,
  },
});

export const {
  setSport,
  setArea,
  setDate,
  setTimeInterval,
  setNoOfPlayers,
  resetActivityForm,
} = activitySlice.actions;

export default activitySlice.reducer;
