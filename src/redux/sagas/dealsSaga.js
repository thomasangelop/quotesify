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

function* getDeals() {
   console.log('in GET deals saga');
   
   try {
     const config = {
       headers: { 'Content-Type': 'application/json' },
       withCredentials: true,
     };
     const response = yield axios.get('api/deals', config);
     yield put({ type: 'SET_DEALS', payload: response.data });
   } 
   catch (error) {
     console.log('Deals get request failed', error);
   }
 }

function* dealsSaga() {
   yield takeLatest('UPDATE_CSV_URL', updateCsvUrl); 
   yield takeLatest('FETCH_CLIENTS', getDeals)
 }
 
 export default dealsSaga;