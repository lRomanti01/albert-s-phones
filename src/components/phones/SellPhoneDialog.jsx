import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useAuthProvider } from "../../context/AuthContext";

const SellPhoneDialog = ({ open, onClose, phone, createSoldPhone }) => {
  const [quantity, setQuantity] = useState(1);
  const [clientName, setClientName] = useState("");
  const { session } = useAuthProvider();

  const handleSell = () => {
    // Aquí podrías enviar los datos de la venta a tu API o sistema
    const data = {
      phone: phone._id,
      client: clientName,
      amount: quantity,
      total: phone.price * quantity,
      price: phone.price
    //   user: session._id,
    };
    createSoldPhone(data);
    onClose();
  };

  if (!phone) return null;

  const totalPrice = phone.price * quantity;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Vender Celular</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1">
          <strong>Marca:</strong> {phone.brand}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Modelo:</strong> {phone.model}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Cantidad disponible:</strong> {phone?.amount}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Precio Unitario:</strong> ${phone.price}
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          label="Cantidad a vender"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Nombre del Cliente"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />

        <Typography variant="h6" sx={{ mt: 2 }}>
          Ganancia total: <strong>${totalPrice}</strong>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSell}
          disabled={!clientName || quantity <= 0}
        >
          Vender
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SellPhoneDialog;
