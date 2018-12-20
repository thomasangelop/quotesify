import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getQuotesTableSaga(action) {
   console.log('in GET quotes table saga');
   const reqId = action.payload;
   try {
     const config = {
       headers: { 'Content-Type': 'application/json' },
       withCredentials: true,
     };
     const response = yield axios.get(`api/quotes/quotestable/${reqId}`, config);
     yield put({ type: 'SET_QUOTES', payload: response.data });
   } 
   catch (error) {
     console.log('Quotes get request failed', error);
   }
 }

function* quotesTableSaga() {
   yield takeLatest('GET_QUOTES_TABLE', getQuotesTableSaga);
   
 }
 
 export default quotesTableSaga;