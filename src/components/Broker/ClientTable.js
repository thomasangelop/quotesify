import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import SendToProvider from './SendToProvider';


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class ClientTable extends Component {

  componentDidMount = () => {
    this.getClients();
  }

  getClients = () => {
    this.props.dispatch( { type: 'FETCH_CLIENTS', payload: this.state} );
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Employer</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Send to Provider</TableCell>
                <TableCell date>Date Sent</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.reduxState.deals.map(row => {
                return (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                    {row.name}
                    </TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell><SendToProvider deal={row}/></TableCell>
                    {/* <TableCell><button>Send To Provider</button></TableCell> */}
                    <TableCell>{moment(row.date_email_sent_to_employer).format('MMMM Do YYYY')}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}


const mapStateToProps = reduxState => ({
  reduxState
});

ClientTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps)(ClientTable));