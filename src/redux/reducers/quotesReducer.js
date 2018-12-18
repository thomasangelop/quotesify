import {combineReducers} from 'redux';

const employerQuotesReducer = (state = [], action) => {
   switch (action.type) {
     case 'QUOTES':
       return action.payload;
     default:
       return state;
   }
 };

 export default quotesReducer
// Used to store quotes
const providerQuotesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_QUOTES':
            return action.payload;
        default:
            return state;
    }
}
  
export default combineReducers({
    employerQuotesReducer,
    providerQuotesReducer,
});
