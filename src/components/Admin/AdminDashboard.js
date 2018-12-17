import React, { Component } from 'react';
import {connect} from 'react-redux';
import ProviderBrokerRegisterPage from './ProviderBrokerRegisterPage';

class AdminDashboard extends Component {

  render() {
    return (
      <div>
      <ProviderBrokerRegisterPage/>
      </div>
    );
  }
}


const mapStateToProps = reduxState => {
  return reduxState
};

export default connect(mapStateToProps)(AdminDashboard);


