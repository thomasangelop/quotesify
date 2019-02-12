import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import FromYouTube from './FromYouTube';

//adds colors to tabs
const theme = createMuiTheme({
  palette: {
    primary: {
        main: '#1a3d50',
      },
    secondary: {
      main: '#efbf42',
    },
  },
});

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
      paddingLeft: 50,
      marginRight: 50,
    },
    video: {
        padding: 10,
        width: '80%',
    }
  });

class LiveDemo extends Component {
    state = {
    };

    render() {
      const { classes } = this.props;
      const { value } = this.state;
      
    return (
      // applies theme to whole component
      <MuiThemeProvider theme={theme}>
        <Paper className={classes.root} elevation={15}>
          {/* controls tabs and where each tabs go and which 
          tab pulls information from imported component */}
          <div className={classes.root}>
            <h1>Live Demo Page</h1>
            <FromYouTube className={classes.video}/>
          </div>
        </Paper>
      </MuiThemeProvider>
    );
  }
}


const mapStateToProps = reduxState => {
  return reduxState
};

LiveDemo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps)(LiveDemo));