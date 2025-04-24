import { useEffect, useState } from "react";
import http from "../../utils/http";

export const useGetSoldPhones = () => {
  const [loading, setLoading] = useState(false);
  const [soldPhones, setSoldPhones] = useState([]);

  useEffect(() => {
    getSoldPhones();
  }, []);

  const getSoldPhones = async () => {
    try {
      setLoading(true);
      const response = await http.get(`phone/getSoldPhones`);
      if (response.data.ok) {
        setSoldPhones(response.data.soldPhones);
      }
    } catch (error) {
      console.error(
        error.response?.data.message || "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    soldPhones,
  };
};
