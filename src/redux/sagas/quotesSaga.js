import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';

function* getQuotesSaga(action) {
   try {
      const response = yield call(axios.get, `/api/quotes/${action.payload.deal_id}`);
      yield put({type: 'QUOTES', payload: response.data});  
   }
   catch (error) {
       console.log(`GET request to /api/quotes/${action.payload.deal_id} UNSUCCESSFUL...`);
   }
}

function* quotesSaga() {
   yield takeLatest('GET_QUOTES', getQuotesSaga);
 }
 
 export default quotesSaga;