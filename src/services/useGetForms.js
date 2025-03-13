import { createClient } from "../utils/supabase/client";

const getForms = async (tableName) => {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.from("forms").select(`
        *,
       questions_responses (
          id, 
          text, 
          type, 
          options, 
          response,
          selected_option,
          selected_answers_multiple
        )
      `);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (err) {
    throw new Error(`Hubo un error al obtener los datos: ${err.message}`);
  }
};

export default getForms;
