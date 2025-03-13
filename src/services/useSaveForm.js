import { useState } from "react";
import { createClient } from "../utils/supabase/client";

const saveForm = async (formData) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("forms")
    .insert([{ name: formData.name }])
    .select();

  if (error) {
    console.log("Error al guardar el formulario:", error);
    return null;
  }
  if (!data || data.length === 0) {
    console.log("No se ha insertado el formulario correctamente.");
    return null;
  }

  return data[0]; // Retorna el formulario guardado con su id
};

export default saveForm;
