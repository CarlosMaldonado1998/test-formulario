import {
  IconButton,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const MultipleChoice = ({
  options,
  setOptions,
  selectedAnswers,
  setSelectedAnswers,
}) => {
  const [inputValue, setInputValue] = useState("");

  // Agregar nueva opción a la lista
  const handleAddOption = () => {
    if (inputValue?.trim() !== "" && !options?.includes(inputValue)) {
      if (options?.length > 0) {
        setOptions([...options, inputValue]);
      } else {
        setOptions([inputValue]);
      }
      setInputValue("");
    }
  };

  const handleToggleSelection = (option) => {
    // Comprobar si la opción está seleccionada
    if (selectedAnswers?.includes(option)) {
      setSelectedAnswers(selectedAnswers?.filter((item) => item !== option));
    } else {
      // Si no está seleccionada, la agregamos
      if (selectedAnswers?.length > 0) {
        setSelectedAnswers([...selectedAnswers, option]);
      } else {
        setSelectedAnswers([option]);
      }
    }
  };

  // Eliminar una opción de la lista de opciones
  const handleDeleteOption = (option) => {
    // Eliminar la opción de las opciones disponibles
    setOptions(options?.filter((item) => item !== option));

    // Si la opción eliminada estaba seleccionada, también eliminarla de las respuestas seleccionadas
    if (selectedAnswers?.includes(option)) {
      setSelectedAnswers(selectedAnswers?.filter((item) => item !== option));
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", textAlign: "center" }}>
      <TextField
        label="Agregar respuesta"
        variant="outlined"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        size="small"
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddOption}
        fullWidth
        sx={{ marginBottom: 2 }}
      >
        Añadir opción
      </Button>

      <FormGroup sx={{ marginTop: 2, textAlign: "left" }}>
        {options?.map((option, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedAnswers?.includes(option)}
                  onChange={() => handleToggleSelection(option)}
                />
              }
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
      </FormGroup>
    </div>
  );
};

export default MultipleChoice;
