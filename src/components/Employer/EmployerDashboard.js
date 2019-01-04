// Vendors
import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
// Styles
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ResponseIcon from '@material-ui/icons/Feedback';
import WaitingIcon from '@material-ui/icons/AccessTime';
import DownloadIcon from '@material-ui/icons/Archive';
// Components
import LogOutButton from '../LogOutButton/LogOutButton';
import UploadButton from '../Employer/FileUpload';

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
   marginRight: {
      marginRight: 5
   },
   csvButton: {
      background: 'royalblue',
      color: 'white',
      textWeight: 'bold',
      textTransform: 'uppercase'
   }
});

class EmployerDashboard extends Component {

  
   componentDidMount(){
      this.props.dispatch({type: 'GET_DEAL_ID', payload:this.props.user.company_id})
      this.props.dispatch({type:'GET_QUOTES', payload:this.props.user.company_id})
   }
      // get employer deal id 
   //  getUserDealId = () => {
   //     axios.get('/api/quotes/company_id').then(response => {
   //        this.setState({
   //           deal_id: response.data

   //        })
   //     }).catch(error => {
   //        alert('Error making/ deal id  GET request', error);
   //     })
   //  }

 
   
   render(){
     
      console.log('Company_id: ', this.props.user.company_id)
      console.log('Current deals reducer/deal_id: ', this.props.deals[0])
      
      const {classes} = this.props;
      let tableHeadInsert;
      let tableBodyInsert;
      
      if(this.props.quotesReducer.length === 0){
         let tableHeadInsert = <br></br>
         let tableBodyInsert = <p>You currently have no quotes</p>
      }
      else {
         tableHeadInsert =
            <TableRow>
               <TableCell className={classes.alignCenter}>Status</TableCell>
               <TableCell className={classes.alignCenter}>Provider</TableCell>
               <TableCell className={classes.alignCenter}>Message</TableCell>
               <TableCell className={classes.alignCenter}>Download File From Provider</TableCell>
            </TableRow>

         tableBodyInsert = this.props && this.props.quotesReducer.length > 0 ?
            this.props.quotesReducer.map(quote => {
               if(quote.decision_complete === true){
                  return <TableRow key={quote.quote_id}>
                     <TableCell className={classes.alignCenter}><ResponseIcon className={classes.marginRight}/>Provider has responded</TableCell>
                     <TableCell className={classes.alignCenter}>{quote.provider}</TableCell>
                     <TableCell className={classes.alignCenter}>{quote.provider_response_message}</TableCell>
                     <TableCell className={classes.alignCenter} onClick={()=> window.open(quote.provider_response_file_location, "_blank")}><DownloadIcon/></TableCell>
                  </TableRow>
               }
               else {
                  return <TableRow key={quote.quote_id} >
                     <TableCell className={classes.alignCenter}><WaitingIcon/> Awaiting response</TableCell>
                     <TableCell className={classes.alignCenter}>{quote.provider}</TableCell>
                     <TableCell className={classes.alignCenter}>-</TableCell>
                     <TableCell className={classes.alignCenter}>-</TableCell>
                  </TableRow>
               }
                    
            }) : <span></span>
      }
      return(
         
         <div>
            <div>
               <h1 className={classes.alignCenter}>Dashboard</h1>
            </div>
            <Table className={classes.tableFormat}>
               <TableHead>
                  {tableHeadInsert}
               </TableHead>  
               <TableBody >
                  {tableBodyInsert}
               </TableBody>
            </Table>
            <div className={classes.alignCenter}>
               <p>After your first upload, upload another csv ONLY if requested by a broker or provider:</p>
               <UploadButton deal_id={this.props.deals[0]}/>
               {/* <Button className={classes.csvButton} variant="contained">Upload csv</Button> */}
            </div>
         </div>
      );
   }
}

const mapStateToProps = state => ({
   deals: state.deals,
   quotesReducer: state.quotesReducer.employerQuotesReducer,
   user: state.user
});

export default connect(mapStateToProps)(withStyles(styling)(EmployerDashboard));