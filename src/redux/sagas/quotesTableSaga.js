import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';

function* getQuotesTableSaga() {
   console.log('in GET quotes table saga');
   
   try {
     const config = {
       headers: { 'Content-Type': 'application/json' },
       withCredentials: true,
     };
     const response = yield axios.get('api/quotes/quotestable', config);
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