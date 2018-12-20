// Vendors
import React, { Component } from 'react';
import {connect} from 'react-redux';
// Components
import CustomizedTable from './CustomizedTable';

class ProviderDashboard extends Component {

  fetchQuotes = () => {
    // Dispatch action to fetch the Quotes from the server
    this.props.dispatch( { type: 'FETCH_QUOTES' } );
  }

  // This renders the Quotes right away
  componentDidMount() {
      this.fetchQuotes();
  }

  render() {
    return (
      <div>
        <h1>Your Dashboard</h1>
        <CustomizedTable quote={this.props.reduxState.quotesReducer.providerQuotesReducer}/>
      </div>
    );
  }
}


const mapStateToProps = reduxState => ({reduxState});

export default connect(mapStateToProps)(ProviderDashboard);