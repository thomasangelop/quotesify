import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';

function* updateCsvUrl(action) {
   try {
      const response = yield call(axios.put, `/api/deals/${action.payload.deal_id}`, action.payload);
      // yield put({type: 'QUOTES', payload: response.data});  
   }
   catch (error) {
       console.log(`GET request to /api/deals/${action.payload.deal_id} UNSUCCESSFUL...`);
   }
}

function* dealsSaga() {
   yield takeLatest('UPDATE_CSV_URL', updateCsvUrl); 
 }
 
 export default dealsSaga;