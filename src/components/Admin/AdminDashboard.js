import React, { Component } from 'react';
import {connect} from 'react-redux';
import ProviderBrokerRegisterPage from './ProviderBrokerRegisterPage';
import RegisteredUsersTable from './RegisteredUsersTable';

class AdminDashboard extends Component {

  render() {
    return (
      <div>
      <div>
      <ProviderBrokerRegisterPage/>
      </div>
      <RegisteredUsersTable/>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(AdminDashboard);


