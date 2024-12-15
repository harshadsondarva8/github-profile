import {createSlice} from '@reduxjs/toolkit';
import {UserDetails} from '../types/UserDetails.types';

// Define the state structure for the Users reducer
interface UserState {
  collection: Record<string, UserDetails>;
}

// Define the initial state
const initialState: UserState = {
  collection: {},
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersGlobalReset: state => {
      state.collection = initialState?.collection;
    },
    usersAddUser: (state: UserState, action) => {
      const payload: UserDetails = action?.payload;
      const oldUser = Object.keys(state.collection)?.includes(payload?.login);
      !oldUser && (state.collection[payload?.login] = payload);
    },
    usersUpdateUser: (state: UserState, action) => {
      const payload: UserDetails = action?.payload;
      state.collection[payload?.login] = payload;
    },
    usersSetFollowers: (state: UserState, action) => {
      const payload: {login: string; collection: []} = action?.payload;
      state.collection[payload?.login]['followers_list'] = payload?.collection;
    },
    usersSetFollowing: (state: UserState, action) => {
      const payload: {login: string; collection: []} = action?.payload;
      state.collection[payload?.login]['following_list'] = payload?.collection;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  usersGlobalReset,
  usersAddUser,
  usersUpdateUser,
  usersSetFollowers,
  usersSetFollowing,
} = userSlice.actions;

export default userSlice.reducer;
