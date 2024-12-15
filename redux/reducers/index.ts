import {combineReducers} from 'redux';
import userSlice from './Users';

/**
 * Root reducer that combines all the reducers.
 */
const rootReducers = combineReducers({
  Users: userSlice,
});

export default rootReducers;

/**
 * Type representing the root state of the application.
 */
export type RootState = ReturnType<typeof rootReducers>;
