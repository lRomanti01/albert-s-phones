import { useState, ChangeEvent } from "react";

// MUI
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { Button, InputLabel, MenuItem, Paper, Select } from "@mui/material";

// ICONOS
import { FaRegUserCircle } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { LuKeyRound } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import { FaLevelUpAlt } from "react-icons/fa";

// HOOKS
// import { useSignUp } from "@/hooks/api/useAuth";
import { useAlert } from "../../hooks/useAlert";
import { Spinner } from "../general/Spinner";

const initialData = {
  name: "",
  lastName: "",
  email: "",
  password: "",
};


export default function SignUpModal({ onChange }) {
  const [signUpData, setSignUpData] = useState(initialData);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  // Hooks
  const [showAlert] = useAlert();
  // const [loading, load] = useSignUp(signUpData);

  const validateInput = ()=> {
    const newErrors = {};
    if (!signUpData.name) newErrors.name = "Nombre es requerido.";
    if (!signUpData.lastName) newErrors.lastName = "Apellido es requerido.";
    if (!signUpData.email) newErrors.email = "Email es requerido.";
    if (signUpData.email && !/\S+@\S+\.\S+/.test(signUpData.email))
      newErrors.email = "Formato de email inválido.";
    if (!signUpData.password) newErrors.password = "Constraseña es requerida.";
    if (signUpData.password !== confirmPassword)
      newErrors.confirmPassword = "Contraseñas no coinciden.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUpInputChange = (
    e,
    field
  ) => {
    if (field == "email") {
      return setSignUpData((prev) => ({
        ...prev,
        [field]: e.target.value.toLowerCase(),
      }));
    } else {
      setSignUpData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    }

    setErrors((prev) => ({
      ...prev,
      [field]: "", // Clear error when user types
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setErrors((prev) => ({
      ...prev,
      confirmPassword: "", // Clear error when user types
    }));
  };

  const handleFormSubmit = async () => {
    if (!validateInput()) {
      return;
    }

    // const { response, error } = await load();
    // if (error) {
    //   showAlert(
    //     "error",
    //     error.message || "The server may be experiencing problems"
    //   );
    // } else if (response) {
    //   showAlert("success", response.data.message);
    //   setSignUpData(initialData);
    //   setConfirmPassword("");
    // }
  };

  return (
    <div className="flex flex-col h-full w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[35%] p-4 md:p-10 bg-white/90 rounded-2xl animate-zoom-in animate-duration-300">
      {/* <Spinner loading={loading} message="Signing up..." /> */}

      <div className="flex flex-col flex-grow justify-evenly w-full gap-4">
        <h2 className="font-bold text-3xl text-primary">Registrate</h2>

        <FormControl className="gap-4">
          <div className="flex flex-col gap-4 md:flex-row md:gap-2">
            <TextField
              id="name"
              label="Nombre"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaRegUserCircle />
                  </InputAdornment>
                ),
              }}
              placeholder="Nombre"
              variant="outlined"
              className="w-full md:w-[50%]"
              value={signUpData.name || ""}
              onChange={(e) => handleSignUpInputChange(e, "name")}
              error={!!errors.name}
              helperText={errors.name}
            />

            <TextField
              id="lastName"
              label="Apellido"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaRegUserCircle />
                  </InputAdornment>
                ),
              }}
              placeholder="Apellido"
              variant="outlined"
              className="w-full md:w-[50%]"
              value={signUpData.lastName || ""}
              onChange={(e) => handleSignUpInputChange(e, "lastName")}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
          </div>

          <TextField
            id="email"
            label="Email"
            placeholder="Email"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdOutlineMail />
                </InputAdornment>
              ),
            }}
            className="w-full"
            value={signUpData.email || ""}
            onChange={(e) => handleSignUpInputChange(e, "email")}
            type="email"
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            id="password"
            label="Contraseña"
            placeholder="**********"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LuKeyRound />
                </InputAdornment>
              ),
            }}
            className="w-full"
            type="password"
            value={signUpData.password || ""}
            onChange={(e) => handleSignUpInputChange(e, "password")}
            error={!!errors.password}
            helperText={errors.password}
          />

          <TextField
            id="confirmPassword"
            label="Confirmar Contraseña"
            placeholder="**********"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LuKeyRound />
                </InputAdornment>
              ),
            }}
            className="w-full"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
        </FormControl>

        <Button
          onClick={handleFormSubmit}
          className="w-full bg-primary font-semibold mt-1"
          variant="contained"
          color="primary"
        >
          Registrarse
        </Button>

        <div className="flex items-center gap-1 text-sm justify-center">
          <span className="text-gray-400">Ya tiens una cuenta?</span>
          <span
            onClick={onChange}
            className="hover:underline cursor-pointer font-bold text-primary"
          >
            Inicia sesión
          </span>
        </div>
      </div>
    </div>
  );
}
