// Vendors
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {storage} from '../firebase/config';
import swal from 'sweetalert';
// Styles
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Send from '@material-ui/icons/Send';


const styling = theme => ({
   root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
   fileButton: {
      background: `#1a3d50`,
      color: 'white',
      // textWeight: 'bold',
      // textTransform: 'uppercase',
      margin: theme.spacing.unit,
   },
   // fileButtonhover: {
   //    color: `#efbf42`,
   // },
   dialogCancelBtn: {
      background: 'firebrick',
      color: 'white',
      textWeight: 'bold',
      textTransform: 'uppercase',
      fontSize: 12
   },
   dialogConfirmBtn: {
      background: 'green',
      color: 'white',
      textWeight: 'bold',
      textTransform: 'uppercase',
      fontSize: 12
   }
})

const newState = {
   quote_id: null,
   file: null,
   file_url: null,
   open: false,
   disableButton: true,
   message: '',
}

class UploadQuoteButton extends Component {

   state = newState;

   // Updates State to include the quote's ID for updates
   componentDidMount = () => {
      this.setState({
         quote_id: this.props.quote_id,
      });
   };

   handleOpenClick = () => {
      this.setState({ open: true });
   };
  
   handleCloseClick = () => {
      this.setState({ open: false });
   };
   
   handleChange = (event) => {
      this.setState({
         [event.target.name]: event.target.value,
      });
   }

   selectImage = (event) => {
      if (event.target.files[0]) {
         const targetFile = event.target.files[0]
         this.setState({file: targetFile,})
      }
   }

   uploadFile = () => {
      this.setState({
         quote_id: this.props.quote_id,
      });
      console.log('Inside uploadFile this.state:', this.state);
      if(this.state.file === null){
         swal("WARNING!", "Please select a file locally from your computer!", "warning");
         return
      }
      //ref has a function called put
      const uploadTask = storage.ref(`provider_files/${this.props.reduxState.user.company_id}/${this.props.quote_id}/${this.state.file.name}`).put(this.state.file);
      //uploadTask.on('state_changed', progess, error, complete) //this is the format of the parameters, they are functions;
      uploadTask.on('state_changed',
         (snapshot) => {
            //progress function parameter
         //  const thisProgess = Math.round((snapshot.bytesTransferred / snapshot.totalBytes * 100)); //snapshot has a property of bytesTransferred
         //  this.setState({progress: thisProgess});
         },
         (error) => {
            //error function parameter
            console.log(`The error:, `, error)
         },
         (complete) => {
            //complete function parameter
            storage.ref(`provider_files/${this.props.reduxState.user.company_id}/${this.props.quote_id}`).child(this.state.file.name).getDownloadURL().then(thisUrl => {
               console.log(`file's new location:`, thisUrl);
               swal("Great job!", "File successfully uploaded!", "success");
               this.setState({
                  file_url: thisUrl,
                  disableButton: false
               });
            })
            .then((result) => {
               this.updateUrl();
            })
            .catch((error) => {
               console.log('Error with uploadFile function after complete');
            });
         } // end (complete)
      ) // end uploadTask.on
   }
   
   updateUrl = () => {
      this.props.dispatch({type: 'UPDATE_QUOTE_URL', payload: this.state})
      this.setState(newState);
   }

   render() {
    
      const {classes} = this.props;
      console.log(this.state);
      console.log(`reduxState:`, this.props.reduxState);
      
      let confirmButton = this.state.disableButton === true ?
      <Button type="submit" className={classes.dialogConfirmBtn} variant="contained" disabled>Confirm</Button>
      : <Button onClick={this.updateUrl} className={classes.dialogConfirmBtn} variant="contained">Confirm</Button>

      return (
         <section>
            <div>
               <Button onClick={this.handleOpenClick} className={classes.fileButton} variant="contained"><Send /> Send Quote</Button>
            </div>
            <Dialog
               open={this.state.open}
               onClose={this.handleCloseClick}
               aria-labelledby="dialog-title"
            >
            <DialogTitle id="dialog-title">Send a Quote to {this.props.employer}.</DialogTitle>
            <DialogContent>
               <DialogContentText>1. Click the "Choose File" button to upload your document.<br/>2. Enter your message.<br/>3. Click the Send button.
               {/* {JSON.stringify(this.state)} */}
               </DialogContentText>
                  {/* <form> */}
                     <FormGroup>
                        <FormControl >
                           <br/>
                           <label >File:</label>
                           <input className="fileButton" type="file" onChange={this.selectImage}/>
                           {/* <Button onClick={this.uploadFile} className={classes.fileButton}>Upload File</Button> */}
                           <br/>
                           <label >Your Message:</label>
                           <input rows="6" type='textarea' id="message" placeholder="We delight to inform you..." value={this.state.message} name="message" onChange={this.handleChange} />
                           <br/>
                           {/* <div>
                              <img src={this.state.csv_url || 'https://via.placeholder.com/280x200'} alt="Upload image" height="280" width="200"></img>
                           </div> */}
                        </FormControl>
                     </FormGroup>
                  {/* </form> */}
            </DialogContent>
            <DialogActions>
            <Button onClick={this.uploadFile} className={classes.fileButton}>Send</Button>

               {/* {confirmButton} */}
               <Button onClick={this.handleCloseClick} className={classes.dialogCancelBtn} variant="contained">Cancel</Button>
            </DialogActions>
         </Dialog>
         </section>
      );
   }
}


const mapreduxStateToProps = reduxState => ({
  reduxState
});

export default connect(mapreduxStateToProps)(withStyles(styling)(UploadQuoteButton));