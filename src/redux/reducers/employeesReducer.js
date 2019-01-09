const employeesReducer = (state = [], action) => {
   let reducerArray = []
   switch (action.type) {
      case 'EMPLOYEE_DATA':
         reducerArray.push(action.payload.empArray);
         reducerArray.push(action.payload.csvString);
         console.log(reducerArray);
         return reducerArray;
      default:
         return state;
   }
};

export default employeesReducer;