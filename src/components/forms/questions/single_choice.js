import {
  IconButton,
  Button,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const SingleChoice = ({
  options,
  setOptions,
  selectedOption,
  setSelectedOption,
  label = "Respuesta",
  placeholder = "Escribe aquí la respuesta",
}) => {
  const [newOption, setNewOption] = useState(""); 

  const handleAddOption = () => {
    if (newOption.trim() !== "" && !options?.includes(newOption)) {
      if (options?.length > 0) {
        setOptions([...options, newOption]);
      } else {
        setOptions([newOption]);
      }
      setNewOption(""); 
    }
  };

  // Manejar selección de respuesta
  const handleSelectOption = (event) => {
    setSelectedOption(event.target.value);
  };

  // Eliminar una opción de la lista
  const handleDeleteOption = (option) => {
    if (options.includes(option)) {
      const arrayFilter = options?.filter((item) => item !== option);
      setOptions(arrayFilter);
      if (selectedOption === option) {
        setSelectedOption(""); // Si eliminamos la opción seleccionada, limpiamos la selección
      }
    }
  };

  return (
    <>
      <TextField
        label="Agregar opción"
        variant="outlined"
        value={newOption}
        onChange={(e) => setNewOption(e.target.value)}
        size="small"
        fullWidth
        sx={{ marginBottom: 2, marginTop: 2 }}
        placeholder={placeholder}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddOption}
        fullWidth
        disabled={newOption.trim() === ""} // Deshabilitar si el campo está vacío
      >
        Añadir opción
      </Button>
      
      <FormControl sx={{ marginTop: 2, textAlign: "left" }}>
        <FormLabel>{label}</FormLabel>
        <RadioGroup value={selectedOption} onChange={handleSelectOption}>
          {Array.isArray(options) &&
            options.map((option, index) => (
              <div
                key={index}
                style={{ display: "flex", alignItems: "center" }}
              >
                <FormControlLabel
                  value={option}
                  control={<Radio />}
                  label={option}
                  sx={{ flexGrow: 1 }}
                />
                <IconButton
                  onClick={() => handleDeleteOption(option)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ))}
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default SingleChoice;
