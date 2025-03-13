import { TextField } from "@mui/material";

const ShortAnswer = ({
  value,
  setValue,
  label = "Respuesta",
  placeholder = "Escribe aquí la respuesta",
}) => {
  const handleAnswerChange = (e) => {
    setValue(e.target.value); 
  };

  return (
    <>
      <TextField
        id="response"
        name="response"
        label={label}
        fullWidth
        margin="dense"
        placeholder={placeholder}
        value={value}
        onChange={handleAnswerChange}
      />
    </>
  );
};

export default ShortAnswer;
