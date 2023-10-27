import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, styled } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: '#FABB2E',
  color: theme.palette.common.black,
  padding: '8px',
  fontWeight: 'bold',
  marginRight: '3px',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
    padding: '8px',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StickyTableHead = styled(TableHead)({
  position: 'sticky',
  top: 0,
  zIndex: 1,
  backgroundColor: '#FABB2E',
});

const TableWrapper = styled('div')({
  overflowY: 'auto',
  maxHeight: '43%',
  marginRight:'10%',
  marginTop:'5%', 
  marginLeft: '10%'
})

export default function InsightTable({ analyzerData }) {
  console.log('analyzerData', analyzerData);

  return (
    <TableWrapper>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <StickyTableHead>
            <TableRow>
              <StyledTableCell align='center'>Insights</StyledTableCell>
            </TableRow>
          </StickyTableHead>
          <TableBody>
            {analyzerData && analyzerData.pages.map((page, pageIndex) => (
              // Create a new row for each warning
              page.warnings.map((warning, warningIndex) => (
                <StyledTableRow key={`${pageIndex}-${warningIndex}`}>
                    {warning}&nbsp;
                </StyledTableRow>
              ))
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </TableWrapper>
  );
}
