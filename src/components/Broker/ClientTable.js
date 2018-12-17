import React, { Component } from 'react';
import {connect} from 'react-redux';

class ClientTable extends Component {

  render() {
    return (
      <div>
        <h1>Clients</h1>
      </div>
    );
  }
}


const mapStateToProps = reduxState => {
  return reduxState
};

export default connect(mapStateToProps)(ClientTable);