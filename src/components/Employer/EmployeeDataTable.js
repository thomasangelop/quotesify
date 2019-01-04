import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
      width: 700,
      marginLeft: 'auto',
      marginRight: 'auto'
   },

});

class EmployeeDataTable extends Component {

   state = {
      csv_url: this.props.deals[0]
   }
   
   componentDidMount(){
      //this.props.dispatch({type: 'GET_CSV_URL', payload: 13}) // payload needs to change to this.props.user.company_id
      // this.props.dispatch({type: 'POST_EMPLOYEE_DATA', payload: 13}) // payload needs to change to this.props.user.company_id
      this.props.dispatch({type: 'GET_EMPLOYEE_DATA', payload: 13})
      // if(this.props.employeeDataReducer.length > 0) {
      //    console.log("Ready to go!")
      // }
      // else {
      //    this.props.dispatch({type: 'GET_EMPLOYEE_DATA', payload: 13})
      // }
   }
   
   render(){

      const {classes} = this.props
      console.log(this.state)

      return(
         <div>
            <h1>Check Data</h1>
            <div className={`${classes.width}`}>
               <ul>
                  <li>This is only a small sample of the larger data set.</li>
                  <li>Please make sure each column of data matches its corresponding header.</li>
               </ul>
            </div>
            <Table>
               <TableHead>
                  <TableRow></TableRow>
               </TableHead>
               <TableBody>
                  <TableRow></TableRow>
               </TableBody>
            </Table>
            
         </div>
      );
   }
}

const mapStateToProps = state => ({
   deals: state.deals,
   employeesReducer: state.employeesReducer,
   user: state.user
});

export default connect(mapStateToProps)(withStyles(styling)(EmployeeDataTable));