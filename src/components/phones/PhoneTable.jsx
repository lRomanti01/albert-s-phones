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
  "Imagen",
  "Marca",
  "Modelo",
  "RAM",
  "Almacenamiento",
  "Pantalla",
  "Bateria (mAh)",
  "Precio",
  "Cantidad",
  "Acciones",
];

export const PhoneTable = ({
  phones,
  loading,
  handleOpen,
  handleDelete,
  handleImageClick,
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
                Cargando teléfonos...
              </StyledTableCell>
            </TableRow>
          ) : phones.length > 0 ? (
            phones.map((phone) => (
              <StyledTableRow key={phone._id}>
                <StyledTableCell>
                  {phone.image ? (
                    <img
                      src={phone.image}
                      alt={phone.brand}
                      style={{ width: 60, height: 60, cursor: "pointer" }}
                      onClick={() => handleImageClick(phone.image)}
                    />
                  ) : (
                    <div className="flex justify-center items-center w-16 h-16 bg-gray-200 rounded-full">
                      <IoIosPhonePortrait className="text-3xl text-black" />
                    </div>
                  )}
                </StyledTableCell>
                <StyledTableCell>{phone.brand}</StyledTableCell>
                <StyledTableCell>{phone.model}</StyledTableCell>
                <StyledTableCell>{phone.ram}</StyledTableCell>
                <StyledTableCell>{phone.storage}</StyledTableCell>
                <StyledTableCell>{phone.screen}</StyledTableCell>
                <StyledTableCell>{phone.battery}</StyledTableCell>
                <StyledTableCell>{phone.price}</StyledTableCell>
                <StyledTableCell>{phone.amount}</StyledTableCell>
                <StyledTableCell>
                  <IconButton color="primary" onClick={() => handleOpen(phone)}>
                    <AssignmentIcon />
                  </IconButton>
                  <IconButton color="primary" onClick={() => handleOpen(phone)}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(phone._id)}
                  >
                    <Delete />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <TableRow>
              <StyledTableCell colSpan={columns.length} align="center">
                No hay teléfonos disponibles.
              </StyledTableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
