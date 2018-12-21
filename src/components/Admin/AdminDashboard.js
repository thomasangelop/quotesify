import React, { Component } from 'react';
import {connect} from 'react-redux';
import ProviderBrokerRegisterPage from './ProviderBrokerRegisterPage';
import RegisteredUsersTable from './RegisteredUsersTable';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

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

class AdminDashboard extends Component {

  render() {
    return (
      <MuiThemeProvider theme={theme}>
      <div>
      <div>
      <ProviderBrokerRegisterPage/>
      </div>
      <RegisteredUsersTable/>
      </div>
      </MuiThemeProvider>
    );
  }
}


const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(AdminDashboard);


