import {combineReducers} from 'redux';
import userSlice from './Users';
import deviceConfigSlice from './DeviceConfig';

/**
 * Root reducer that combines all the reducers.
 */
const rootReducers = combineReducers({
  Users: userSlice,
  DeviceConfig: deviceConfigSlice,
});

export default rootReducers;

/**
 * Type representing the root state of the application.
 */
export type RootState = ReturnType<typeof rootReducers>;
