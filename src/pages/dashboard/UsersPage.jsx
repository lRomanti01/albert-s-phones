import React, { useState } from "react";
import { UsersTable } from "../../components/users/UsersTable";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useUsers } from "../../hooks/api/useUsers";

export const UsersPage = () => {
  const { loadingTable, users, deletePhone, loadingModal } = useUsers();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const confirmDelete = (id) => {
    setUserToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    await deletePhone(userToDelete);
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Lista de Usuarios
      </Typography>

      <div style={{ height: 400, minWidth: 600 }}>
        <UsersTable
          users={users}
          loading={loadingTable}
          handleDelete={confirmDelete}
        />
      </div>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar este usuario?
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
    </div>
  );
};
