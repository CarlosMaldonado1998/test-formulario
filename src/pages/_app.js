// pages/_app.js
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";
import { AuthProvider } from "../lib/AuthContext";
import Navigation from "../components/design/Navigation";
import NotificationProvider from "../components/design/Notifications";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <NotificationProvider>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Navigation />
          <Component {...pageProps} />
        </ThemeProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default MyApp;
