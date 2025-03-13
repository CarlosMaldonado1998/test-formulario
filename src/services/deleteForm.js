import { createClient } from "../utils/supabase/client";

const deleteForm = async (formId) => {
  const supabase = createClient();

  const { error } = await supabase.from("forms").delete().eq("id", formId);

  if (error) {
    console.log("Error al eliminar el Formulario:", error);
    return null;
  }

  return true;
};

export default deleteForm;
