import { Box, Text } from "@chakra-ui/layout";

import React from "react";

function MError(props) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
    >
      <Text fontSize="6xl">Something Went Wrong</Text>
    </Box>
  );
}

export default MError;
