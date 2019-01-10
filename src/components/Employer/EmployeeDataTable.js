// Vendors
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {storage} from '../firebase/config'
import swal from 'sweetalert';
// Styles
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
// Components
import ColumnDropdown from './ColumnDropdown'

const styling = theme => ({
   alignCenter: {
      textAlign: 'center'
   },
   tableFormat: {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: 50,
      maxWidth: 1000
   },
   width: {
      width: 570,
      marginLeft: 'auto',
      marginRight: 'auto'
   },
   //styling for employer column page
   columnPage: {
      marginTop: theme.spacing.unit * 3,
      marginLeft: '2%',
      marginRight: '2%',
      padding: 10,
      overflowX: 'auto',
   },
   //styling for employer columns
   columns: {
      marginTop: theme.spacing.unit * 3,
      marginLeft: '1%',
      marginRight: '1%',
      padding: 10,
      overflowX: 'auto',
   },
   //styling for confirm button
   confirmBtn: {
      background: 'green',
      color: 'white',
      textWeight: 'bold',
      textTransform: 'uppercase',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 30
   }
});

class EmployeeDataTable extends Component {

   state = {
      csv_url: null,
      deal_id: null,
   }

   componentDidMount(){
      this.props.dispatch({type: 'GET_DEAL_ID', payload:this.props.user.company_id})
   }
   
   //this function is triggered after each dropdown selction in the child component, it re-rendering this component
   renderFunction = () => {
      this.setState({})
   }

   confirmColumns = () => {
      if(this.props.columnsReducer.includes('choose')){
         swal("Wait...", "There is at least 1 column that needs to be chosen", "warning")
         return
      }
      let indexesToRemove = []
      
      for(let i = 0; i < this.props.columnsReducer.length; i++){
         //console.log(this.props.columnsReducer[i] + i)
         if(this.props.columnsReducer[i] === 'other'){
            indexesToRemove.push(i)
         }
      }
      
      console.log(indexesToRemove)
      let empReducer = this.props.employeesReducer[0]
      for(let array of empReducer){
         for(var i = indexesToRemove.length-1; i >= 0; i--){
            array.splice(indexesToRemove[i], 1)
         }
      }
      console.log(empReducer)
      let newCsvBody = ''
      
      for(let array of empReducer){
         let arrayToString = ''
         for(let i = 0; i < array.length; i++){
            arrayToString += '"'  + array[i] + '",'
         }
         // console.log(array.map(index => {
         //    return `'` + index + `'`
         // }))
         newCsvBody += arrayToString + '\n'

      }
      console.log(newCsvBody)
      //////////
      
      let originalCsvString = this.props.employeesReducer[2]
      let finalCsvString = ''
      
      // csvStringNoHeader and a modified version of finalColumnsString will be concatenated and stored in finalColumnsString
      let finalColumnsString = ''
      //let csvStringNoHeader = originalCsvString.substr(originalCsvString.indexOf('\n'))
      
      // loop through the columnsReducer to build a string that will eventually be the new first line of our originalCsvString
      for(let category of this.props.columnsReducer){
         if(category === 'other' || category === 'choose'){
            console.log('No push')
         }
         else {
            finalColumnsString += category + ','
         }
      }
      let finalColumnsString2 = finalColumnsString.slice(0, finalColumnsString.length-1) //removes the comma at the end of finalColumnsString
      //console.log(finalColumnsString2)
      finalCsvString = finalColumnsString2 + '\n' + newCsvBody
      console.log(finalCsvString) //make sure this looks correct

      let contentType = 'text/csv';
      let blobObject = new Blob([finalCsvString], {type: contentType});
         
      //ref has a function called put
      const uploadTask = storage.ref(`updated_employer_files/new_csv_${this.props.user.company_id}.csv`).put(blobObject);
      //uploadTask.on('state_changed', progess, error, complete) //this is the format of the parameters, they are functions;
      uploadTask.on('state_changed',
      (snapshot) => {
         console.log('hey')
         //progress function parameter
         // const thisProgess = Math.round((snapshot.bytesTransferred / snapshot.totalBytes * 100)); //snapshot has a property of bytesTransferred
         // this.setState({progress: thisProgess});
      },
      (error) => {
         //error function parameter
         console.log(`The error:, `, error)
      },
      (complete) => {
         //complete function parameter
         storage.ref('updated_employer_files').child(`new_csv_${this.props.user.company_id}.csv`).getDownloadURL().then(thisUrl => {
            console.log(thisUrl);
            swal("Good", "File successfully uploaded!", "success");
            this.setState({
               csv_url: thisUrl,
               deal_id: this.props.deals[0].deal_id
            });
            this.props.dispatch({type: 'UPDATE_CSV_URL', payload: this.state})
            //this.props.history.push('/home')
         })
      });
    }
   
   render(){

      // let index = -1;
      // let columnCount = this.props.employeesReducer[0].length;
      // // console.log('Inside calculateColumns, # of columns:', columnCount);
      // this.props.employeesReducer[0].forEach(column => {
      //    index = index +1;
      //    this.setState({
      //       columns: [...this.state.columns, index]
      //    });
      // });

      const {classes} = this.props
      let preTableInsert;
      let tableHeadInsert;
      let tableBodyInsert1;
      let tableBodyInsert2;
      let confirmButton;
      let columnsArr = []
      console.log(this.state)
      // <span className="icon" onClick={()=> window.open('/home', "_self")}>home</span>
      if(this.props.employeesReducer.length === 0){
         preTableInsert = <span></span>
         tableHeadInsert = <br></br>
         tableBodyInsert1 = <p className={classes.alignCenter}>Please navigate to the home page by clicking this <a href='/home'>LINK</a> and re-upload your csv file...</p> 
         //this.props.dispatch({type: 'GET_EMPLOYEE_DATA'})
         confirmButton = <span></span>
      }
      if (this.props && this.props.employeesReducer.length > 0 && this.props.columnsReducer.length === 0){
         console.log(this.props.employeesReducer[0].length)
         this.props.dispatch({type:'SET_COLUMNS', payload: this.props.employeesReducer[0][0].length})
      }
      if(this.props && this.props.employeesReducer.length > 0 && this.props.columnsReducer.length > 0){

         // tableHeadInsert = for (const column in table) {
         //    if (table.hasOwnProperty(column)) {
         //       const element = table[column];
               
         //    }
         // }
         
         preTableInsert = <div className={`${classes.width}`}>
            <p>1. This is only a small sample of the data you have uploaded.</p>
            <p>2. Please make sure each column dropdown menu matches the data it belongs to below.</p>
            <p>3. Click the "Confirm" button when all columns are complete to send your data.</p>
         </div>
         
         tableHeadInsert = this.props.employeesReducer[0][0].map((column, index) =>
            <TableCell style={{padding: 5,}}><ColumnDropdown index={index} columnRowLength={null} renderFunction={this.renderFunction}/></TableCell>)
         
        tableBodyInsert1 = <TableRow style={{backgroundColor: '#6B6B6B',}}>
         {this.props.employeesReducer[1][0].map(data => 
            <TableCell style={{padding: 5,color: '#FFFFFF',}}>{data}</TableCell>
         )}
         </TableRow>

         for(let i = 1; columnsArr.length < 5; i++) {
            columnsArr.push(this.props.employeesReducer[0][i])
         }
         console.log(columnsArr)

         tableBodyInsert2 = columnsArr.map(employee =>
            <TableRow style={{backgroundColor:'#828282',}}>
               {employee.map(data => 
                  <TableCell style={{padding: 5,color: '#FFFFFF',}}>{data}</TableCell>
               )}
            </TableRow>);
         
         confirmButton = <div className={classes.alignCenter}>
               <Button className={classes.confirmBtn} onClick={this.confirmColumns}>Confirm</Button>
            </div>
      
         // tableBodyInsert = this.props.employeesReducer.map(employee =>
         //    <TableRow>
         //       <TableCell>{employee.employer_supplied_unique_id}</TableCell>
         //       <TableCell>{employee.date_of_birth}</TableCell>
         //       <TableCell>{employee.date_of_hire}</TableCell>
         //       <TableCell>{employee.union_status}</TableCell>
         //       <TableCell>{employee.salary_per_year}</TableCell>
         //       <TableCell>{employee.gender}</TableCell>
         //       <TableCell>{employee.status}</TableCell>
         //       <TableCell>{employee.state}</TableCell>
         //       <TableCell>{employee.role}</TableCell>
         //       <TableCell>{employee.employer_supplied_company_code}</TableCell>
         //    </TableRow>)
      }
      
      return(
         <div>
            <Paper className={classes.columnPage} elevation={15}>
               <h1>Check Your Data</h1>
               {preTableInsert}
               <Paper className={classes.columns} elevation={2}>
                  <Table>
                     <TableHead>
                        <TableRow>
                           {tableHeadInsert}
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        
                        {tableBodyInsert1}
                        {tableBodyInsert2}
                     </TableBody>
                  </Table>
               </Paper>
            </Paper>
            {confirmButton}
            {/* <p>this.state:{JSON.stringify(this.state)}</p>
            <p>this.props.employeesReducer:{JSON.stringify(this.props.employeesReducer)}</p>
            <p>this.props.columnReducer:{JSON.stringify(this.props.columnsReducer)}</p> */}
         </div>
      );
   }
}

const mapStateToProps = state => ({
   deals: state.deals,
   employeesReducer: state.employeesReducer,
   user: state.user,
   columnsReducer: state.columnsReducer
});

export default connect(mapStateToProps)(withStyles(styling)(EmployeeDataTable));