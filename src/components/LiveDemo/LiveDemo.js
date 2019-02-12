import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import FromYouTube from './FromYouTube';
import { auth } from 'firebase';

//adds app colors to component
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
      display: 'flex', 
      justifyContent: 'center'
      
    },
    video: {
        padding: 10,
        width: '100%',
    }
  });

    // marginTop: theme.spacing.unit * 10,
    // marginBottom: theme.spacing.unit * 10,
    // marginRight: theme.spacing.unit * 60,
    // marginLeft: theme.spacing.unit * 60,
    
    // paddingTop: theme.spacing.unit * 10,
    // paddingBottom: theme.spacing.unit * 10,

class LiveDemo extends Component {
    render() {
      const { classes } = this.props;      
    return (
      // applies theme to whole component
      <MuiThemeProvider theme={theme}>
        <Paper className={classes.root} elevation={15}>
          <div>
            <h1>Check Out Our Live Demo</h1>
            <FromYouTube />
          </div>
        </Paper>
      </MuiThemeProvider>
    );
  }
}

LiveDemo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LiveDemo);