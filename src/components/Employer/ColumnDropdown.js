// Vendors
import React, {Component} from 'react';
import { connect } from 'react-redux';
// Styles
import { withStyles } from '@material-ui/core/styles';

const styling = theme => ({
   root: {
      display: 'flex',
      flexWrap: 'wrap',
   },
   formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
   },
   selectEmpty: {
      marginTop: theme.spacing.unit * 2,
   },
   alignCenter: {
      textAlign: 'center'
   },
});

class ColumnDropdown extends Component {
   
   render(){
     
      return(
         
         <div>
            <FormControl variant="filled" className={classes.formControl}>
               <InputLabel htmlFor="filled-age-native-simple">Age</InputLabel>
               <Select
                  native
                  value={this.state.age}
                  onChange={this.handleChange('age')}
                  input={<FilledInput name="age" id="filled-age-native-simple" />}
               >
                  <option value="" />
                  <option value={10}>Ten</option>
                  <option value={20}>Twenty</option>
                  <option value={30}>Thirty</option>
               </Select>
            </FormControl>
         </div>
      );
   }
}

NativeSelects.propTypes = {
   classes: PropTypes.object.isRequired,
 };

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(withStyles(styling)(ColumnDropdown));