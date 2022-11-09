import React from "react";
import Header from "./Header";
import { Box } from "@mui/system";
import { Toolbar } from "@mui/material";

const Layout = ({ children }) => {
  return (
      <Box component="main" sx={{ p: 3 }}>
        <Header />
        <Toolbar />
        {children}
      </Box>
  );
};

export default Layout;
