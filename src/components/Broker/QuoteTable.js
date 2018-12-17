import React, { Component } from 'react';
import {connect} from 'react-redux';

class QuoteTable extends Component {

  render() {
    return (
      <div>
        <h1>Quotes</h1>
      </div>
    );
  }
}


const mapStateToProps = reduxState => {
  return reduxState
};

export default connect(mapStateToProps)(QuoteTable);