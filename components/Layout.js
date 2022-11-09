import React from "react";
import Header from "./Header";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Header />
      {children}
    </ThemeProvider>
  );
};

export default Layout;
