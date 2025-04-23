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

const initialData = {
  auth: "",
  password: "",
};

export default function SignInModal({ onChange }) {
  const [loginData, setLoginData] = useState(initialData);
  const [errors, setErrors] = useState(initialData);

  const [showAlert] = useAlert();
  // const [loading, load] = useLogIn(loginData);
  // const router = useRouter();

  const handleLogInInputChange = (e, name) => {
    const { value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!loginData.auth) {
      newErrors.auth = "Email or Username is required.";
    }

    if (!loginData.password) {
      newErrors.password = "Password is required.";
    } else if (loginData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async () => {
    if (!validateForm()) return;

    // const { response, error } = await load();
    // if (error) {
    //   showAlert(
    //     "error",
    //     error.message || "The server may be experiencing problems"
    //   );
    // } else if (response) {
    //   showAlert("success", response.data.message);
    //   setLoginData(initialData);
    //   router.push("dashboard");
    // }
  };

  return (
    <div className="flex flex-col h-full w-[90%] sm:w-[70%] md:w-[50%] max-w-[400px] p-10 text-center bg-white/90 rounded-2xl animate-zoom-in animate-duration-300">
      {/* <Spinner loading={loading} message="Signing in..." /> */}

      <div className="flex flex-col flex-grow justify-evenly w-full gap-4">
        <h2 className="font-bold text-3xl text-primary">Inicia Sesión</h2>

        <Box className="flex flex-col w-full">
          <FormControl className="gap-3">
            {/* Email */}
            <div>
              <TextField
                id="auth"
                placeholder="Email"
                variant="outlined"
                required
                className="w-full rounded-xl"
                value={loginData.auth}
                onInput={(e) => handleLogInInputChange(e, "auth")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaUser />
                    </InputAdornment>
                  ),
                }}
                error={!!errors.auth}
              />
              {errors.auth && (
                <FormHelperText error>{errors.auth}</FormHelperText>
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
 