import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#FABB2E",
  color: theme.palette.common.black,
  padding: "8px",
  fontWeight: "bold",
  marginRight: "3px",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#F9E7E7",
    padding: "10px",
    textAlign: "justify",
  },
  "& > *": {
    padding: "8px",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StickyTableHead = styled(TableHead)({
  position: "sticky",
  top: 0,
  zIndex: 1,
  backgroundColor: "#FABB2E",
});

const TableWrapper = styled("div")({
  overflowY: "auto",
  maxHeight: "23%",
  marginLeft: "2%",
  border: "3px solid white",
});

export default function InsightTable({ analyzerData }) {
  return (
    <TableWrapper>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <StickyTableHead>
            <TableRow>
              <StyledTableCell align="center">
                Krwaler's strong suggestions for your web structure
              </StyledTableCell>
            </TableRow>
          </StickyTableHead>
          <TableBody>
            {analyzerData &&
              analyzerData.pages.map((page, pageIndex) =>
                page.warnings.map((warning, warningIndex) => (
                  <StyledTableRow key={`${pageIndex}-${warningIndex}`}>
                    {warning}&nbsp;
                  </StyledTableRow>
                ))
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </TableWrapper>
  );
}
