import React, { Component } from 'react';
import {connect} from 'react-redux';

class FileUpload extends Component {

  render() {
    return (
      <div>

      </div>
    );
  }
}


const mapStateToProps = reduxState => {
  return reduxState
};

export default connect(mapStateToProps)(FileUpload);