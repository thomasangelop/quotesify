import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styling = theme => ({
   sizeImg: {
      height: 280,
      width: 200
   },
   inlineBlock:{
      float: 'left',
   },
   customBtn: {
      height: 10,
      width: 80,
      fontWeight: 'bold',
      fontSize: 10,
      color: 'white'
   },
   backgroundGray: {
      background: 'dimgray'
   },
})

const providers = [
   {
      company_id: 1,
      name: 'aflac',
      authorization_id: 4
   },
   {
      company_id: 2,
      name: 'farmers',
      authorization_id: 4
   },
   {
      company_id: 3,
      name: 'health partners',
      authorization_id: 4
   },
   {
      company_id: 4,
      name: 'health guys',
      authorization_id: 4
   },
   {
      company_id: 5,
      name: 'healthy living',
      authorization_id: 4
   }
]

const newState = {
   open: false,
   providerObj: {}
}

class SendToProvider extends Component {

   state = newState;
  
   componentDidMount(){
      this.setProviders();
   }

   //function to populate this component's state with all of the providers
   setProviders = () => {
      let theProviderObj = {};
      for(let provider of providers){
         theProviderObj[provider.name] = null;
      }
      console.log(theProviderObj)
      this.setState({
         providerObj: theProviderObj
      })
   }
   
   handleOpenClick = () => {
      this.setState({open: true});
   };
  
   handleCloseClick = () => {
      this.setState({open: false});
   };
   
   handleChange = (event) => {
      if (this.state.providerObj[event.target.name] === null){
         this.setState({
            providerObj: {
               ...this.state.providerObj,
               [event.target.name]: event.target.value
            },
         });
      }
      else {
         this.setState({
            providerObj: {
               ...this.state.providerObj,
               [event.target.name]: null
            },
         });
      }
}

   confirmUpdate = () => {
      // this.props.dispatch({type:'POST_TAGS' , payload: {project_id: this.props.theProject.id, tagInfo: this.state}})
      this.setState({open: false})
   }
   
   render(){
      
      const {classes} = this.props;
      let checkBoxes;
      console.log(this.state);
      
      //loop through theProviderObj in state to get it's keys, a.k.a the provider names
      if (this.state.providerObj){
         let providerKeys = Object.keys(this.state.providerObj)
         console.log (providerKeys);
         checkBoxes = providerKeys.map( provider => <div>
           <FormControlLabel
               control={<Checkbox checked={this.state.providerObj.provider} onChange={this.handleChange} value="sendTo" />}
               label={provider}
               name={provider}
            />
            </div>
            )
      
      }
      // Conditional rendering to keep the "Add Card" button disabled until the form is completed
      // let addButton = this.state.addReady === false ?
      // <Button variant="contained"  className={classes.customBtn} disabled>Confirm</Button>
      // : <Button onClick={this.updateCard} variant="contained"  className={`${classes.customBtn} ${classes.backgroundGreen}`}>Confirm</Button>
      
      return(
         <section>
            <div className={classes.alignCenter}>
               <Button onClick={this.handleOpenClick} className={ `${classes.customBtn} ${classes.backgroundGray}`} variant="contained">Select</Button>
            </div>
            <Dialog
               open={this.state.open}
               onClose={this.handleCloseClick}
               aria-labelledby="dialog-title"
            >
               <DialogTitle id="dialog-title">Send to Providers</DialogTitle>
               <DialogContent>
                  <DialogContentText>Which providers would you like to send this client's data to?</DialogContentText>
                     <FormGroup>
                        <FormControl >
                           <div className={classes.inlineBlock}>
                              {checkBoxes}
                           </div>
                        </FormControl>
                     </FormGroup>
               </DialogContent>
               <DialogActions>
                  <Button onClick={this.confirmUpdate} variant="contained"  className={`${classes.customBtn} ${classes.backgroundGreen}`}>Confirm</Button>
                  <Button onClick={this.handleCloseClick} className={`${classes.customBtn} ${classes.backgroundGray}`} >Cancel</Button>
               </DialogActions>
            </Dialog>
         </section>
      );
   }
}

/* {this.props.portfolioReducer.map( (card) => (
               <div>
                  <img src={card.image_url}/>
               </div>
            ))} */

const mapStateToProps = state => ({
   portfolioReducer: state.portfolioReducer,
   user: state.user,
   //communityReducer: state.communityReducer
});

export default connect(mapStateToProps)(withStyles(styling)(SendToProvider));