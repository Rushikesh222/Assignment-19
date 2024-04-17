import { createStore, applyMiddleware } from 'redux';
import { appReducer } from '../reducer/appReducer';
import  {thunk} from 'redux-thunk';

const middleware = applyMiddleware(thunk);
 export const store = createStore(appReducer, middleware);

 
