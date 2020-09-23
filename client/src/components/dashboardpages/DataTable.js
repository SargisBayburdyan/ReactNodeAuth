import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core";

import styles from "../styles";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      tempData: [],
    };
  }

  componentWillMount = () => {
    this.getData();
  };

  getData = () => {
    const { tempData } = this.state;
    fetch("/user/temperature")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          isLoading: false,
          tempData: [...tempData, ...data],
        });
      });
  };

  render() {
    const { classes } = this.props;
    const { tempData } = this.state;
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>MessungsID</StyledTableCell>
              <StyledTableCell>Temperatur (°C)</StyledTableCell>
              <StyledTableCell align="right">Erstellt am</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tempData.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell>{row._id}</StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.temperature}
                </StyledTableCell>
                <StyledTableCell align="right">{row.timestamp}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default withStyles(styles)(DataTable);
