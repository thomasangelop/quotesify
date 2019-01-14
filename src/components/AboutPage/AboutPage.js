import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'
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

let demoDataClicked = false;

const addDemoData = () => {
  if (demoDataClicked === false){
  axios.post('api/demoData', ['addDemoData']);
  //  demoDataClicked = true;
  }
  else {
    console.log('DemoData already loaded');
  } 
};

const deleteDemoData = () => {
  axios.post('api/demoData/deleteData', ['deleteDemoData']);
};

const AboutPage = () => (
  <MuiThemeProvider theme={theme}>
  <br/>
    <div align="center">
      <Button variant="contained" color="primary"
        onClick={() => addDemoData()}
      >ADD DEMO DATA  </Button>
      <span>  </span>
      <Button variant="contained" color="primary"
        onClick={() => deleteDemoData()}
      >DELETE DEMO DATA  </Button>
    </div>
  </MuiThemeProvider>
);

export default AboutPage;
