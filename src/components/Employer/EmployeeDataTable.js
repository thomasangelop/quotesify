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
      width: 570,
      marginLeft: 'auto',
      marginRight: 'auto'
   },

});

class EmployeeDataTable extends Component {

   state = {
      company_id: this.props.user.company_id
   }

   fetchEmployeeData = () =>{
      // this.props.dispatch({type: 'GET_EMPLOYEE_DATA', payload: this.state.company_id})
      this.props.dispatch({type: 'GET_EMPLOYEE_DATA'})
      console.log('Inside fetchEmployeeData of EmployeeDataTable running GET_EMPLOYEE_DATA, this.state.company_id:', this.state.company_id);
   }
   
   componentDidMount(){
      this.setState({
         company_id: this.props.user.company_id
      });
      this.fetchEmployeeData();
   }
   
   render(){

      const {classes} = this.props
      let tableHeadInsert;
      let tableBodyInsert;
      console.log(this.state)

      if (this.props.user.company_id === !null) {
         
      }

      if (this.props && this.props.employeesReducer.length > 0){
         tableHeadInsert = <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
         </TableRow>
      
         tableBodyInsert = this.props.employeesReducer.map(employee =>
            <TableRow>
               <TableCell>{employee.employer_supplied_unique_id}</TableCell>
               <TableCell>{employee.date_of_birth}</TableCell>
               <TableCell>{employee.date_of_hire}</TableCell>
               <TableCell>{employee.union_status}</TableCell>
               <TableCell>{employee.salary_per_year}</TableCell>
               <TableCell>{employee.gender}</TableCell>
               <TableCell>{employee.status}</TableCell>
               <TableCell>{employee.state}</TableCell>
               <TableCell>{employee.role}</TableCell>
               <TableCell>{employee.employer_supplied_company_code}</TableCell>
            </TableRow>)
      }
      
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
                  {tableHeadInsert}
               </TableHead>
               <TableBody>
                  {tableBodyInsert}
               </TableBody>
            </Table>
            <p>{JSON.stringify(this.props.user)}</p>
            
         </div>
      );
   }
}

const mapStateToProps = state => ({
   deals: state.deals,
   employeesReducer: state.employeesReducer,
   user: state.user,
});

export default connect(mapStateToProps)(withStyles(styling)(EmployeeDataTable));