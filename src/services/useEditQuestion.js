import { createClient } from "../utils/supabase/client";

const editQuestions = async (formId, questions) => {
  const supabase = createClient();

  // Prepara las preguntas para ser insertadas
  const preparedQuestions = questions.map((question) => ({
    id: question.id,
    form_id: formId,
    text: question?.text,
    type: question?.type,
    options: question?.options?.length > 0 ? question?.options : null,
    response: question?.response || null,
    selected_option: question?.selectedOption || null,
    selected_answers_multiple:
      question?.selectedAnswersMultiple?.length > 0
        ? question?.selectedAnswersMultiple
        : null,
  }));

  // Ejecutar todas las actualizaciones en paralelo
  const updates = preparedQuestions.map((question) => {
    if (question.id == 0) {
      const { id, ...questionWithoutId } = question; // Desestructurar y quitar el 'id'
      return supabase
        .from("questions_responses")
        .insert(questionWithoutId) // Insertar sin el 'id'
        .select();
    } else {
      return supabase
        .from("questions_responses")
        .update(question)
        .eq("id", question.id)
        .select();
    }
  });

  // Esperar a que todas las actualizaciones se completen
  const results = await Promise.all(updates);

  // Verificar si alguna actualización falló
  const errors = results.filter(({ error }) => error);
  if (errors.length > 0) {
    console.log("Errores al actualizar las preguntas:", errors);
    return null;
  }

  return results.map(({ data }) => data).flat();
};

export default editQuestions;
