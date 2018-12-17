// Vendors
import React, { Component } from 'react';
import {connect} from 'react-redux';
// Components
import CustomizedTable from './CustomizedTable';

class ProviderDashboard extends Component {

  render() {
    return (
      <div>
        <CustomizedTable />
      </div>
    );
  }
}


const mapStateToProps = reduxState => {
  return reduxState
};

export default connect(mapStateToProps)(ProviderDashboard);