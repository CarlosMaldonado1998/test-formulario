import { Typography, Button, Grid2 } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DynamicForm from "../form";
import { useEffect, useState } from "react";
import ShortAnswer from "../questions/short_answer";
import UndoIcon from "@mui/icons-material/Undo";
import { useRouter } from "next/router";
import editForm from "../../../services/useEditForm";
import editQuestions from "../../../services/useEditQuestion";
import { validateQuestions } from "../../../validations/createFormValidations";
import deleteQuestion from "../../../services/deleteQuestion";
import { useNotification } from "../../../components/design/Notifications";

const EditForm = ({ data }) => {
  const router = useRouter();
  const [nameForm, setNameForm] = useState("");
  const [idForm, setIdForm] = useState(0);
  const [questions, setQuestions] = useState([]);
  const { showNotification } = useNotification();
  const information = data && data.length > 0 ? data[0] : null;

  const handleShowNotification = (mesasage, variant) => {
    showNotification(mesasage, {
      variant: variant, // El tipo de notificación
    });
  };

  const handleSave = async () => {
    if (questions.length === 0) {
      handleShowNotification("No hay preguntas en el formulario.", "info");
      return;
    }

    // Validar las preguntas antes de enviar
    if (!validateQuestions(nameForm, questions)) {
      return; // Si hay errores, no se envía la información
    }

    try {
      // Guardar el formulario
      const formResponse = await editForm(idForm, { name: nameForm });

      if (!formResponse) {
        handleShowNotification("Error al actualizar el formulario", "error");
        return;
      }
      // Guardar las preguntas y respuestas
      const questionsResponse = await editQuestions(idForm, questions);
      if (!questionsResponse) {
        handleShowNotification("Error al actualizar las preguntas", "error");
        return;
      }
      router.reload();
    } catch (error) {
      handleShowNotification(
        "Hubo un error al conectar con el servidor.",
        "error"
      );
    }
  };

  const handleBackHome = () => {
    router.push("/forms");
  };

  const handleDeleteQuestion = async (id) => {
    const value = await deleteQuestion(id);
    if (value) {
      handleShowNotification("Pregunta eliminada");
      router.reload();
    }
  };

  useEffect(() => {
    // Asegúrate de que "information" esté disponible antes de hacer las actualizaciones
    if (information) {
      setNameForm(information?.name || "");
      setIdForm(information?.id || 0);

      // Si las preguntas han cambiado, actualiza el estado
      if (Array.isArray(information?.questions_responses)) {
        const updatedValues = information?.questions_responses.map(
          (question) => ({
            id: question?.id,
            options: question?.options,
            response: question.response,
            text: question.text,
            type: question.type,
            selectedOption: question?.selected_option,
            selectedAnswersMultiple: question?.selected_answers_multiple,
          })
        );

        // Solo actualizar si los valores han cambiado
        if (JSON.stringify(updatedValues) !== JSON.stringify(questions)) {
          setQuestions(updatedValues);
        }
      }
    }
  }, [information, questions]); // Dependemos solo de "information"

  return (
    <Grid2
      container
      direction="row"
      sx={{
        justifyContent: "space-around",
        alignItems: "flex-end",
      }}
    >
      <Grid2 size={12}>
        <Button onClick={handleBackHome} startIcon={<UndoIcon />}>
          {" "}
          Volver
        </Button>
      </Grid2>
      <Grid2 size={10}>
        <Typography> Ingresa el nombre del formulario</Typography>
        <ShortAnswer
          value={nameForm}
          setValue={setNameForm}
          label="Nombre Formulario"
          placeholder="Escribe el nombre del formulario aquí"
        />
      </Grid2>
      <Grid2 size={2}>
        <Button
          fullWidth
          variant="contained"
          endIcon={<AddCircleOutlineIcon />}
          onClick={handleSave}
        >
          Actualizar
        </Button>
      </Grid2>
      {questions?.length > 0 && (
        <Grid2 size={12}>
          <DynamicForm
            onSubmit={setQuestions}
            initialQuestions={questions}
            isEdit={true}
            handleDeleteQuestion={handleDeleteQuestion}
          />
        </Grid2>
      )}
    </Grid2>
  );
};

export default EditForm;
