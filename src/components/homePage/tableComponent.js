import * as React from 'react';
import { styled } from '@mui/material/styles';
import{Table, TableBody, TableCell, TableContainer, tableCellClasses, TableHead, TableRow, Paper} from '@mui/material'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#FABB2E',
    color: theme.palette.common.black,
    padding:'8px'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function CustomizedTables() {
  return (
    <div style={{ width: '400px' }}>
    <TableContainer component={Paper} style={{padding:3, marginLeft:'10%'}}>
      <Table  sx={{ minWidth: 200 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Original Keywords</StyledTableCell>
            <StyledTableCell align="right">Recommendation Words</StyledTableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
          
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}