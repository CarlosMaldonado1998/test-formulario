import { createClient } from "../utils/supabase/client";

const deleteQuestion = async (questionId) => {
  const supabase = createClient();

  const { error } = await supabase
    .from("questions_responses")
    .delete()
    .eq("id", questionId);

  if (error) {
    console.log("Error al eliminar la pregunta:", error);
    return null;
  }

  return true;
};

export default deleteQuestion;
