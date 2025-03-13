export const validateQuestions = (nameForm, questions, showNotification) => {
  if (nameForm === "") {
    showNotification("El formulario debe tener un nombre.", "info");
    return false;
  }

  const seenTexts = new Set();

  for (const question of questions) {
    if (seenTexts.has(question.text.trim())) {
      showNotification(`La pregunta "${question.text}" ya existe.`, "info");
      return false;
    }
    seenTexts.add(question.text.trim());
  }

  for (const question of questions) {
    if (question?.text === "") {
      showNotification(
        `Se requiere ingresar el texto de la pregunta, revisar el formulario`,
        "info"
      );
      return false;
    }

    if (question?.type === 1 && !question?.response?.trim()) {
      showNotification(
        `La pregunta: "${question.text}" requiere una respuesta.`,
        "info"
      );
      return false;
    }

    if (question?.type === 2 && !question?.selectedOption) {
      showNotification(
        `Debe seleccionar una opción en la pregunta: "${question.text}".`,
        "info"
      );
      return false;
    }

    if (question?.type === 3 && question?.selectedAnswers?.length === 0) {
      showNotification(
        `Debe seleccionar al menos una opción en la pregunta: "${question.text}".`,
        "info"
      );
      return false;
    }
  }

  return true;
};
