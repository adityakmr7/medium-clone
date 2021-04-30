import { Box, Text } from "@chakra-ui/layout";

import React from "react";

function MError({ label }) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
    >
      <Text fontSize="6xl">{label}</Text>
    </Box>
  );
}
MError.defaultProps = {
  label: "Something Went Wrong",
};
export default MError;
