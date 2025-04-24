import { toast } from "react-toastify";

export const useAlert = () => {
  const showAlert = (type, message) => {
    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    } else if (type === "warning") {
      toast.warning(message);
    } else if (type === "info") {
      toast.info(message);
    }
  };

  return {showAlert};
};
