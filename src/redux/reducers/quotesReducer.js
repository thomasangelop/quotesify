const quotesReducer = (state = [], action) => {
   switch (action.type) {
     case 'QUOTES':
       return action.payload;
     default:
       return state;
   }
 };

 export default quotesReducer