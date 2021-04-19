import { Box } from "@chakra-ui/layout";
import React from "react";
import "./mfade.css";

const MFadeIn = ({ children }) => {
  return <Box className="mContainer">{children}</Box>;
};

export default MFadeIn;
