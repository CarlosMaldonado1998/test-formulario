import { useState } from "react";
import { createClient } from "../utils/supabase/client";

const editForm = async (formdId, formData) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("forms")
    .update([{ name: formData.name }])
    .eq("id", formdId)
    .select();

  if (error) {
    console.log("Error al actualizar el formulario:", error);
    return null;
  }
  if (!data || data.length === 0) {
    console.log("1 No se ha insertado el formulario correctamente.");
    return null;
  }

  return data[0]; // Retorna el formulario guardado con su id
};

export default editForm;
