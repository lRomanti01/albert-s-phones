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
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Edit, Delete } from "@mui/icons-material";
import React from "react";
import { IoIosPhonePortrait } from "react-icons/io";
import moment from "moment/moment";

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
  "Marca celular",
  "Modelo celular",
  "Vendedor",
  "Cliente",
  "Cantidad",
  "Precio Unitario",
  "Total",
  "Fecha de venta",
];

export const SoldPhoneTable = ({
  phones,
  loading
}) => {
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
                Cargando teléfonos vendidos...
              </StyledTableCell>
            </TableRow>
          ) : phones.length > 0 ? (
            phones.map((phone) => (
              <StyledTableRow key={phone._id}>
                <StyledTableCell>{phone?.phone?.brand}</StyledTableCell>
                <StyledTableCell>{phone?.phone?.model}</StyledTableCell>
                <StyledTableCell>{phone?.user?.name}</StyledTableCell>
                <StyledTableCell>{phone?.client}</StyledTableCell>
                <StyledTableCell>{phone?.amount}</StyledTableCell>
                <StyledTableCell>${phone?.price}.00</StyledTableCell>
                <StyledTableCell>${phone?.total}.00</StyledTableCell>
                <StyledTableCell>
                  {moment(phone?.createdAt).format("LL")}
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <TableRow>
              <StyledTableCell colSpan={columns.length} align="center">
                No hay teléfonos vendidos.
              </StyledTableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
