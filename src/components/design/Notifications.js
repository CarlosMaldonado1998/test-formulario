import React from "react";
import { SnackbarProvider, useSnackbar } from "notistack";

const NotificationProvider = ({ children }) => {
  return (
    <SnackbarProvider
      maxSnack={3} // Número máximo de notificaciones
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      {children}
    </SnackbarProvider>
  );
};

// Componente reutilizable para mostrar notificaciones
export const useNotification = () => {
  const { enqueueSnackbar } = useSnackbar();

  // Función reutilizable para mostrar notificaciones
  const showNotification = (message, options = {}) => {
    enqueueSnackbar(message, {
      variant: options.variant || "default", // 'success', 'error', 'info', etc.
      autoHideDuration: options.autoHideDuration || 3000, // Duración
      ...options, // Otras opciones personalizadas
    });
  };

  return { showNotification };
};

export default NotificationProvider;
