import {createSlice} from '@reduxjs/toolkit';

// Define the state structure for the Users reducer
interface UserState {
  themeMode: string;
}

// Define the initial state
const initialState: UserState = {
  themeMode: 'light',
};

export const deviceConfigSlice = createSlice({
  name: 'device-config',
  initialState,
  reducers: {
    deviceConfigGlobalReset: state => {
      state = initialState;
    },
    changeTheme: (state: UserState, action) => {
      const payload = action?.payload;
      state.themeMode = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {deviceConfigGlobalReset, changeTheme} = deviceConfigSlice.actions;

export default deviceConfigSlice.reducer;
