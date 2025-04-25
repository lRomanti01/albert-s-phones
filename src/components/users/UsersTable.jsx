import {
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import React from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const columns = [
  "Codigo",
  "Nombre",
  "Apellido",
  "Email",
  "Acciones",
];

export const UsersTable = ({ users, loading, handleDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <StyledTableCell key={index}>{column}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <StyledTableCell colSpan={columns.length} align="center">
                Cargando teléfonos...
              </StyledTableCell>
            </TableRow>
          ) : users.length > 0 ? (
            users.map((user) => (
              <StyledTableRow key={user._id}>
                <StyledTableCell>{user.code}</StyledTableCell>
                <StyledTableCell>{user.name}</StyledTableCell>
                <StyledTableCell>{user.lastName}</StyledTableCell>
                <StyledTableCell>{user.email}</StyledTableCell>
                <StyledTableCell>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(user._id)}
                  >
                    <Delete />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <TableRow>
              <StyledTableCell colSpan={columns.length} align="center">
                No hay usuarios disponibles.
              </StyledTableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
