import { createClient } from "../utils/supabase/client";

const saveQuestions = async (formId, questions) => {
  const supabase = createClient();
  console.log("questions saveQuestions", questions);
  // Prepara las preguntas para ser insertadas
  const preparedQuestions = questions.map((question) => ({
    form_id: formId,
    text: question.text,
    type: question.type,
    options: question.options.length > 0 ? question.options : null,
    response: question?.response || null,
    selected_option: question?.selectedOption || null,
    selected_answers_multiple:
      question?.selectedAnswersMultiple?.length > 0
        ? question.selectedAnswersMultiple
        : null,
  }));

  const { data, error } = await supabase
    .from("questions_responses")
    .insert(preparedQuestions)
    .select();

  if (error) {
    console.log("Error al guardar las preguntas:", error);
    return null;
  }

  return data; // Retorna las preguntas guardadas
};

export default saveQuestions;
