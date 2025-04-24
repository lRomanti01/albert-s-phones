import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Grid,
  Typography,
  AppBar,
  Toolbar,
} from "@mui/material";
import { PhoneTable } from "../../components/phones/PhoneTable";
import { useGetPhones } from "../../hooks/api/usePhones";
import SellPhoneDialog from "../../components/phones/SellPhoneDialog";

const initialData = {
  brand: "",
  model: "",
  ram: "",
  storage: "",
  screen: "",
  processor: "",
  battery: "",
  description: "",
  image: "",
  price: "",
  amount: "",
};

export const PhonesPage = () => {
   const [open, setOpen] = useState(false);
  const [editingPhone, setEditingPhone] = useState(null);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [form, setForm] = useState(initialData);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [phoneToDelete, setPhoneToDelete] = useState(null);

  const [sellDialogOpen, setSellDialogOpen] = useState(false);
  const [phoneToSell, setPhoneToSell] = useState(null);
  const [errors, setErrors] = useState({});

  const {
    phones,
    loadingTable,
    createPhone,
    loadingModal,
    updatePhone,
    deletePhone,
    createSoldPhone,
  } = useGetPhones();

  const handleOpen = (phone = null) => {
    if (phone) {
      setEditingPhone(phone);
      setForm(phone);
    } else {
      setEditingPhone(null);
      setForm(initialData);
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = () => {
   const newErrors = {};
   const requiredFields = ["brand", "model", "price", "amount"];

   requiredFields.forEach((field) => {
     if (!form[field]) newErrors[field] = "Este campo es obligatorio";
   });

   setErrors(newErrors);

   if (Object.keys(newErrors).length > 0) return;

   if (editingPhone) {
     updatePhone(form._id, form);
   } else {
     createPhone(form);
     setForm(initialData);
     setEditingPhone(false);
   }
   handleClose();
 };

  const confirmDelete = (id) => {
    setPhoneToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    await deletePhone(phoneToDelete);
    setDeleteDialogOpen(false);
    setPhoneToDelete(null);
  };

  const handleImageClick = (imgUrl) => {
    setSelectedImage(imgUrl);
    setImageDialogOpen(true);
  };

  const openSellDialog = (phone) => {
    setPhoneToSell(phone);
    setSellDialogOpen(true);
  };

  const closeSellDialog = () => {
    setPhoneToSell(null);
    setSellDialogOpen(false);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Gestión de Celulares
      </Typography>
      <Button
        variant="contained"
        onClick={() => handleOpen()}
        sx={{ mb: 2, backgroundColor: "#4174D7" }}
      >
        Agregar Celular
      </Button>

      <div style={{ height: 400, minWidth: 600 }}>
        <PhoneTable
          phones={phones}
          loading={loadingTable}
          handleOpen={handleOpen}
          handleDelete={confirmDelete}
          handleImageClick={handleImageClick}
          openSellDialog={openSellDialog}
        />
      </div>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle>
          {editingPhone ? "Editar Celular" : "Agregar Celular"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={1}>
            {[
              ["brand", "Marca"],
              ["model", "Modelo"],
              ["price", "Precio"],
              ["amount", "Cantidad"],
              ["ram", "RAM"],
              ["storage", "Almacenamiento"],
              ["screen", "Tamaño de screen"],
              ["processor", "Procesador"],
              ["battery", "mAh de batería"],
            ].map(([name, label], index) => (
              <TextField
                key={index}
                fullWidth
                label={label}
                name={name}
                value={form[name]}
                onChange={handleChange}
                required={["brand", "model", "price", "amount"].includes(name)}
                error={!!errors[name]}
                helperText={errors[name] || ""}
              />
            ))}

            <TextField
              fullWidth
              label="URL de Imagen"
              name="image"
              value={form.image}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Descripción"
              name="description"
              value={form.description}
              onChange={handleChange}
              multiline
              rows={3}
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loadingModal}
          >
            {loadingModal
              ? editingPhone
                ? "Guardando..."
                : "Agregando..."
              : editingPhone
              ? "Guardar Cambios"
              : "Agregar"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar este celular?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            disabled={loadingModal}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
            disabled={loadingModal}
          >
            {loadingModal ? "Eliminando..." : "Eliminar"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={imageDialogOpen}
        onClose={() => setImageDialogOpen(false)}
        maxWidth="md"
      >
        <DialogContent>
          <img
            src={selectedImage}
            alt="Celular"
            style={{ width: "100%", height: "auto" }}
          />
        </DialogContent>
      </Dialog>

      <SellPhoneDialog
        open={sellDialogOpen}
        onClose={closeSellDialog}
        phone={phoneToSell}
        createSoldPhone={createSoldPhone}
      />
    </div>
  );
};
