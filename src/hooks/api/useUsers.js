import { useEffect, useState } from "react";
import http from "../../utils/http";
import { useAlert } from "../useAlert";

export const useUsers = () => {
  const [loadingTable, setLoadingTable] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [users, setUsers] = useState([]);
  const {showAlert} = useAlert();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      setLoadingTable(true);
      const response = await http.get(`user/getUsers`);
      if (response.data.ok) {
        setUsers(response.data.users);
      }
    } catch (error) {
      console.error(
        error.response?.data.message || "An unexpected error occurred"
      );
    } finally {
      setLoadingTable(false);
    }
  };

  const deletePhone = async (id) => {
    try {
      setLoadingModal(true);
      const response = await http.delete(`user/deleteUser/${id}`);
      if (response.data.ok) {
        // setUsers((prevPhones) =>
        //   prevPhones.filter((phone) => phone._id !== id)
        // );
      }
    } catch (error) {
      console.error(
        error.response?.data.message || "An unexpected error occurred"
      );
    } finally {
      setLoadingModal(false);
    }
  };

  return {
    loadingTable,
    users,
    loadingModal,
    deletePhone,
  };
};
