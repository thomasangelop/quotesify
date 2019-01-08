const columnsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_COLUMNS':
         console.log(action.payload[0])
         if(state.length === 0){
            for(let i = 0; i < action.payload; i++){
               state = [...state, 'choose']
            }
            return state
         }   
         if(action.payload[1] === 'other' || action.payload[1] === null){
            return state
         }
         else {
            state[action.payload[0]] = action.payload[1]//[...state, action.payload]
            return state
         }
      default:
         return state;
    }
 };
 
 export default columnsReducer;