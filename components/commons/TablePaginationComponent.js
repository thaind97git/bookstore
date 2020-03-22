import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  IconButton,
  TableHead
} from '@material-ui/core';
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage as LastPageIcon,
  FirstPage as FirstPageIcon
} from '@material-ui/icons';

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5)
  }
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};

const useStyles2 = makeStyles({
  table: {
    minWidth: 500
  },
  darkBackground: {
    background: '#f1f1f9'
  },
  emptyData: {
    textAlign: 'center'
  },
  headerText: {
    fontWeight: 'bold'
  }
});

export default function TablePaginationComponent({
  headers = [],
  headerProps = {},
  bodyProps = {},
  rows = [],
  striped,
  onChangePageSize
}) {
  const classes = useStyles2();
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(5);

  const { style: styleHeader } = headerProps;
  const { style: styleBody } = bodyProps;

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead className={classes.darkBackground}>
          <TableRow>
            {headers.map(({ header = '', style = {} }, index) => (
              <TableCell
                className={classes.tableCellHeader}
                key={index}
                style={Object.assign({}, styleHeader, style)}
              >
                <span className={classes.headerText}>{header}</span>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              className={clsx(striped && index % 2 && classes.darkBackground)}
              key={index}
            >
              {headers.map(({ key, bodyStyle = {} }, index) => {
                return (
                  <TableCell
                    style={Object.assign({}, styleBody, bodyStyle)}
                    key={index}
                  >
                    {row[key] || 'not defined yet'}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
        {!rows.length && (
          <TableRow style={{ height: 256 }}>
            <TableCell className={classes.emptyData}>
              <span>No data...</span>
            </TableCell>
          </TableRow>
        )}
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={12}
              count={rows.length}
              rowsPerPage={pageSize}
              page={pageIndex}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true
              }}
              onChangePage={(event, newPage) => {
                setPageIndex(newPage);
                onChangePageSize(newPage, pageSize);
              }}
              onChangeRowsPerPage={event => {
                const newPageSize = parseInt(event.target.value, 10);
                setPageSize(newPageSize);
                setPageIndex(0);
                onChangePageSize(0, newPageSize);
              }}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
