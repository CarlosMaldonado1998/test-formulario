import { createClient } from "../utils/supabase/client";

const getFormById = async (formId) => {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("forms")
      .select(
        `
        id, 
        name, 
        created_at,
         questions_responses (
          id, 
          text, 
          type, 
          options, 
          response,
          selected_option,
          selected_answers_multiple,
          created_at
        )
      `
      )
      .eq("id", formId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (err) {
    console.log("Error al obtener los datos:", err);
    return null;
  }
};

export default getFormById;
