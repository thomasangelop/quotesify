// Vendors
import React from 'react';
import PropTypes from 'prop-types';
// Styles
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
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
import Send from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';

const theme2 = createMuiTheme({
  palette: {
    primary: {
        main: `#1a3d50`,
      },
    secondary: {
      main: `#efbf42`,
    },
  },
 });

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: `#1a3d50`,
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
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});


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
    <MuiThemeProvider theme={theme2}>
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
          {props.quote.map(quote => {
            return (
              <TableRow className={classes.row} key={quote.quote_id}>
                <CustomTableCell component="th" scope="quote">
                  {quote.employer}
                </CustomTableCell>
                <CustomTableCell>{quote.broker}</CustomTableCell>
                <CustomTableCell className="icon" onClick={()=> window.open(quote.url, "_blank")}><CloudDownload /></CustomTableCell>
                <CustomTableCell>{statusMath(quote.decision_complete)}</CustomTableCell>
                {/* <CustomTableCell>{statusMath(true)}</CustomTableCell> */}

                <CustomTableCell>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                  />
                  <label htmlFor="contained-button-file">
                    <Button variant="contained" component="span" className={classes.button}>
                      <Send />Send Quote
                    </Button>
                  </label>
              </CustomTableCell>

              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
    </MuiThemeProvider>
  );
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};
// ContainedButtons.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(CustomizedTable);