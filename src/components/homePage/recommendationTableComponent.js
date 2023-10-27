import * as React from 'react';
import{Table, TableBody, TableCell, TableContainer, tableCellClasses, TableHead, TableRow, Paper,styled} from '@mui/material'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#FABB2E',
    color: theme.palette.common.black,
    padding:'8px',
    fontWeight:'bold',
    marginRight:'3px'
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


export default function CustomizedTables({recommendationListData}) {
  return (
    <TableContainer component={Paper} style={{padding:3, marginLeft:'10%', minidth:'40%'}}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Original Keywords</StyledTableCell>
            <StyledTableCell align='center'>Count</StyledTableCell>
            <StyledTableCell align='center' >Possible Replacements</StyledTableCell>
            <StyledTableCell align='center'>Major Search Phrases</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>  
            {recommendationListData?.topKeywordListings.map((keyword, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {keyword.originalKeyword}
                </StyledTableCell>
                <StyledTableCell align='center'>
                  {keyword.count}
                </StyledTableCell>
                <StyledTableCell  align='center'>
                  {keyword.probableReplacements?.map((replacements, altIndex) => 
                    <span key={altIndex}>{replacements+","}&nbsp;</span>
                  )}
                    {keyword.probableReplacements.length==0&& 
                    <span>-&nbsp;</span>
                    }
                
                </StyledTableCell>
                <StyledTableCell align='center'>
                  {keyword.mostSearchedAlternatives?.map((alternative, altIndex) => (
                    <span key={altIndex}>{alternative+", "}&nbsp;</span>
                  ))}
                  {keyword.mostSearchedAlternatives.length==0&& 
                    <span>-&nbsp;</span>
                    }
                </StyledTableCell>
              </StyledTableRow>
            ))}   
        </TableBody>
      </Table>
    </TableContainer>
  );
}