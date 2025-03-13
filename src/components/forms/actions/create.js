import { Typography, Button, Grid2 } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DynamicForm from "../form";
import { useState } from "react";
import ShortAnswer from "../questions/short_answer";
import saveForm from "../../../services/useSaveForm";
import saveQuestions from "../../../services/useSaveQuestion";
import { validateQuestions } from "../../../validations/createFormValidations";
import UndoIcon from "@mui/icons-material/Undo";
import { useRouter } from "next/router";
import { useNotification } from "../../../components/design/Notifications";

const CreateForm = () => {
  const router = useRouter();
  const [nameForm, setNameForm] = useState("");
  const [questions, setQuestions] = useState([]);
  const { showNotification } = useNotification();

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
    if (!validateQuestions(nameForm, questions, handleShowNotification)) {
      return;
    }

    try {
      // Guardar el formulario
      const formResponse = await saveForm({ name: nameForm });

      if (!formResponse) {
        handleShowNotification("Error al guardar el formulario", "error");
        return;
      }

      // Guardar las preguntas y respuestas
      const questionsResponse = await saveQuestions(
        formResponse?.id,
        questions
      );

      if (!questionsResponse) {
        handleShowNotification("Error al guardar las preguntas", "error");
        return;
      }

      router.push("/forms");
    } catch (error) {
      handleShowNotification(
        "Hubo un error al conectar con el servidr.",
        "error"
      );
    }
  };

  const handleBackHome = () => {
    router.push("/forms");
  };

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
          Guardar
        </Button>
      </Grid2>
      <Grid2 size={12}>
        <DynamicForm onSubmit={setQuestions} />
      </Grid2>
    </Grid2>
  );
};

export default CreateForm;
