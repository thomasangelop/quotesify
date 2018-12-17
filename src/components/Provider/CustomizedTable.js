// Vendors
import React from 'react';
import PropTypes from 'prop-types';
// Styles
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CloudDownload from '@material-ui/icons/CloudDownload';
import CheckCircle from '@material-ui/icons/CheckCircle';
import NotInterested from '@material-ui/icons/NotInterested';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    // text: center,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function statusMath(status) {
        if (status === true) {
            return(
                <CheckCircle />
            )
        }
        else{
            return(
                <NotInterested />
            )
        }    
}


function CustomizedTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Employer</CustomTableCell>
            <CustomTableCell numeric>Broker</CustomTableCell>
            <CustomTableCell numeric>Download Employer's Data</CustomTableCell>
            <CustomTableCell numeric>Response Status</CustomTableCell>
            <CustomTableCell numeric>Respond</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.quote.map(quote => {
            return (
              <TableRow className={classes.row} key={quote.id}>
                <CustomTableCell component="th" scope="quote">
                  {quote.employer}
                </CustomTableCell>
                <CustomTableCell>{quote.broker}</CustomTableCell>
                <CustomTableCell className="icon" onClick={()=> window.open(quote.url, "_blank")}><CloudDownload /></CustomTableCell>
                <CustomTableCell>{statusMath(quote.status)}</CustomTableCell>
                {/* <CustomTableCell>{statusMath(true)}</CustomTableCell> */}
                <CustomTableCell><button>Upload Quote</button></CustomTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);