import { useEffect, useState } from "react";
import http from "../../utils/http";
import { useAlert } from "../useAlert";

export const useGetPhones = () => {
  const [loadingTable, setLoadingTable] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [phones, setPhones] = useState([]);
  const {showAlert} = useAlert();

  useEffect(() => {
    getPhones();
  }, []);

  const getPhones = async () => {
    try {
      setLoadingTable(true);
      const response = await http.get(`phone/getPhones`);
      if (response.data.ok) {
        setPhones(response.data.phones);
      }
    } catch (error) {
      console.error(
        error.response?.data.message || "An unexpected error occurred"
      );
    } finally {
      setLoadingTable(false);
    }
  };

  const createPhone = async (body) => {
    try {
      setLoadingModal(true);
      const response = await http.post("phone/createPhone", {
        ...body,
      });
      if (response.data.ok) {
        setPhones((prevPhones) => [...prevPhones, response.data.phone]);
      }
    } catch (error) {
      console.error(
        error.response?.data.message || "An unexpected error occurred"
      );
    } finally {
      setLoadingModal(false);
    }
  };

  const updatePhone = async (id, body) => {
    try {
      setLoadingModal(true);
      const response = await http.put(`phone/updatePhone/${id}`, { ...body });
      if (response.data.ok) {
        setPhones((prevPhones) =>
          prevPhones.map((phone) =>
            phone._id === id ? { ...phone, ...response.data.phone } : phone
          )
        );
      }
    } catch (error) {
      console.error(
        error.response?.data.message || "An unexpected error occurred"
      );
    } finally {
      setLoadingModal(false);
    }
  };

  const deletePhone = async (id) => {
    try {
      setLoadingModal(true);
      const response = await http.delete(`phone/deletePhone/${id}`);
      if (response.data.ok) {
        setPhones((prevPhones) =>
          prevPhones.filter((phone) => phone._id !== id)
        );
      }
    } catch (error) {
      console.error(
        error.response?.data.message || "An unexpected error occurred"
      );
    } finally {
      setLoadingModal(false);
    }
  };

  const createSoldPhone = async (body) => {
    try {
      setLoadingModal(true);
      const response = await http.post("phone/createSoldPhones", {
        ...body,
      });
      if (response.data.ok) {
        showAlert("success", "Teléfono vendido con éxito");
        setPhones((prevPhones) =>
          prevPhones.map((phone) =>
            phone._id === body.phone
              ? {
                  ...phone,
                  amount: phone.amount - body.amount, // ← aquí restamos la cantidad vendida
                }
              : phone
          )
        );
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
    phones,
    createPhone,
    updatePhone,
    loadingModal,
    deletePhone,
    createSoldPhone,
  };
};
