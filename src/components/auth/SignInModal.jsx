import { useState } from "react";
// MUI
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

// ICONOS
import { FaUser } from "react-icons/fa";
import { LuKeyRound } from "react-icons/lu";

// HOOKS
import { useAlert } from "../../hooks/useAlert";
// import { useLogIn } from "@/hooks/api/useAuth";

// COMPONENTES
import {
  Box,
  Button,
  Paper,
  FormHelperText,
  OutlinedInput,
} from "@mui/material";

// import { useRouter } from "next/navigation";
import { Spinner } from "../general/Spinner";
import { useLogIn } from "../../hooks/api/useAuth";

const initialData = {
  email: "",
  password: "",
};

export default function SignInModal({ onChange }) {
  const [loginData, setLoginData] = useState(initialData);
  const [errors, setErrors] = useState(initialData);

  const [loading, load] = useLogIn(loginData);
  const { showAlert } = useAlert();

  // const router = useRouter();

  const handleLogInInputChange = (e, name) => {
    const { value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!loginData.email) {
      newErrors.email = "Email es requerido.";
    }

    if (!loginData.password) {
      newErrors.password = "Contraseña es requerido.";
    } else if (loginData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async () => {
    if (!validateForm()) return;

    const { response, error } = await load();
    if (error) {
      showAlert(
        "error",
        error.message || "The server may be experiencing problems"
      );
    } else if (response) {
      showAlert("success", response.data.mensaje);
      setLoginData(initialData);
      router.push("dashboard");
    }
  };

  return (
    <div className="flex flex-col h-full w-[90%] sm:w-[70%] md:w-[50%] max-w-[400px] p-10 text-center bg-white/90 rounded-2xl animate-zoom-in animate-duration-300">
      <Spinner loading={loading} message="Signing in..." />

      <div className="flex flex-col flex-grow justify-evenly w-full gap-4">
        <h2 className="font-bold text-3xl text-primary">Inicia Sesión</h2>

        <Box className="flex flex-col w-full">
          <FormControl className="gap-3">
            {/* Email */}
            <div>
              <TextField
                id="email"
                placeholder="Email"
                variant="outlined"
                required
                className="w-full rounded-xl"
                value={loginData.email}
                onInput={(e) => handleLogInInputChange(e, "email")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaUser />
                    </InputAdornment>
                  ),
                }}
                error={!!errors.email}
              />
              {errors.email && (
                <FormHelperText error>{errors.email}</FormHelperText>
              )}
            </div>

            {/* Password */}
            <FormControl variant="outlined" className="w-full">
              <OutlinedInput
                id="password-login"
                placeholder="**********"
                value={loginData.password}
                onInput={(e) => handleLogInInputChange(e, "password")}
                type="password"
                startAdornment={
                  <InputAdornment position="start">
                    <LuKeyRound />
                  </InputAdornment>
                }
                error={!!errors.password}
              />
              {errors.password && (
                <FormHelperText error>{errors.password}</FormHelperText>
              )}
            </FormControl>
          </FormControl>
        </Box>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1 text-sm">
            <span className="text-black">Crear nueva cuenta</span>
            <span
              onClick={onChange}
              className="hover:underline cursor-pointer font-bold text-primary"
            >
              Registrate
            </span>
          </div>
        </div>

        <Button
          onClick={onSubmit}
          className="w-full bg-primary font-semibold mt-1"
          variant="contained"
          color="primary"
        >
          Inicia Sesión
        </Button>
      </div>
    </div>
  );
}
