// Vendors
import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';

// Saga that GETs the Quotes from the server
function* fetchQuotesSaga(action) {
    console.log('In fetchQuotesSaga.');
    try {
        const response = yield call( axios.get, '/api/quotes' );
        yield put( { type: 'SET_QUOTES', payload: response.data } );
    }
    catch (error) {
        console.log('Error with quotes DB GET request:', error);
    }
}

// // Saga that performs a POST request to add a Quote to the database
// function* addQuoteSaga(action) {
//     console.log('Adding Quote to the database:', action.payload);
//     try {
//         yield call( axios.post, '/api/Quotes', action.payload);
//         yield put( { type: 'FETCH_QUOTES' } );
//         console.log(`${action.payload.Quote} successfully added to the Database.`);
//     } 
//     catch (error) {
//         console.log('Error with Quote POST request:', error);
//     }
// }

// // Saga that DELETES a Quote from the DB via axios del. request
// function* deleteQuoteSaga(action){
//     console.log('Deleting this Quote:', action.payload);
//     try{
//       yield call(axios.delete, `/api/Quotes/${action.payload.id}`);
//       yield put({type: 'FETCH_QUOTES'});
//     }
//     catch (error){
//       console.log('Error deleting Quote:', error);
//     }
// }

function* quotesSaga() {
  yield takeEvery('FETCH_QUOTES', fetchQuotesSaga);
//   yield takeEvery('ADD_QUOTE', addQuoteSaga);
//   yield takeEvery('DELETE_QUOTE', deleteQuoteSaga);
}

export default quotesSaga;
