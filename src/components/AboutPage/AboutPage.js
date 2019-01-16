import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import swal from 'sweetalert';

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


const addDemoData = () => {

  axios.post('api/demoData', ['addDemoData'])
    .then((res) => {
      swal("Demonstration Data Added");
    })
    .catch((error) => {
      swal("Error adding Demonstration Data");
    })
};

const deleteDemoData = () => {
  axios.post('api/demoData/deleteData', ['deleteDemoData'])
    .then((res) => {
      swal("Demonstration Data Deleted");
    })
    .catch((error) => {
      swal("Error Deleting Demonstration Data");
    });
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
