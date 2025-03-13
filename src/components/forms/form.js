import {
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import QUESTION_TYPES from "../../constants/questionTypes";
import { useState, useEffect } from "react";
import ShortAnswer from "./questions/short_answer";
import SingleChoice from "./questions/single_choice";
import MultipleChoice from "./questions/multiple_choice";
import DeleteIcon from "@mui/icons-material/Delete";

const DynamicForm = ({
  onSubmit,
  initialQuestions = [],
  isEdit = false,
  handleDeleteQuestion,
}) => {
  const [questions, setQuestions] = useState(initialQuestions);

  // Agregar una nueva pregunta vacía
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: 0, // Identificador único
        text: "",
        type: 1, // Respuesta corta por defecto
        response: "", // Para respuestas cortas
        options: [], // Para opciones de selección
        selectedOption: "", // Para selección única
        selectedAnswersMultiple: [], // Para selección múltiple
      },
    ]);
  };

  // Eliminar una pregunta por ID
  const removeQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
    if (isEdit) {
      handleDeleteQuestion(id);
    }
  };

  // Actualizar el valor de una pregunta
  const updateQuestion = (id, field, value) => {
    setQuestions(
      questions.map((q) =>
        q.id === id
          ? {
              ...q,
              [field]: value,
            }
          : q
      )
    );
  };

  useEffect(() => {
    onSubmit(questions);
  }, [questions, onSubmit]);

  return (
    <Box p={2}>
      <Button variant="contained" color="primary" onClick={addQuestion}>
        Agregar Pregunta
      </Button>

      {questions.map((q, index) => (
        <Card key={q.id} sx={{ mt: 2 }}>
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">Pregunta {index + 1}</Typography>
              <IconButton color="error" onClick={() => removeQuestion(q.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>

            <TextField
              fullWidth
              label="Escribe tu pregunta"
              variant="outlined"
              margin="dense"
              value={q.text}
              onChange={(e) => updateQuestion(q.id, "text", e.target.value)}
            />

            <FormControl fullWidth margin="dense">
              <InputLabel>Tipo de pregunta</InputLabel>
              <Select
                value={q.type}
                onChange={(e) => updateQuestion(q.id, "type", e.target.value)}
              >
                <MenuItem value={1}>{QUESTION_TYPES.short_answer}</MenuItem>
                <MenuItem value={2}>{QUESTION_TYPES.single_choice}</MenuItem>
                <MenuItem value={3}>{QUESTION_TYPES.multiple_choice}</MenuItem>
              </Select>
            </FormControl>

            {/* Renderizado condicional de respuestas */}
            {q.type === 1 && (
              <ShortAnswer
                value={q.response}
                setValue={(value) => updateQuestion(q.id, "response", value)}
                label="Respuesta"
                placeholder="Escribe tu respuesta aquí"
              />
            )}

            {q.type === 2 && (
              <SingleChoice
                options={q.options}
                setOptions={(options) =>
                  updateQuestion(q.id, "options", options)
                }
                selectedOption={q.selectedOption}
                setSelectedOption={(selectedOption) =>
                  updateQuestion(q.id, "selectedOption", selectedOption)
                }
              />
            )}

            {q.type === 3 && (
              <MultipleChoice
                options={q.options}
                setOptions={(options) =>
                  updateQuestion(q.id, "options", options)
                }
                selectedAnswers={q.selectedAnswersMultiple}
                setSelectedAnswers={(selectedAnswersMultiple) =>
                  updateQuestion(
                    q.id,
                    "selectedAnswersMultiple",
                    selectedAnswersMultiple
                  )
                }
              />
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default DynamicForm;
