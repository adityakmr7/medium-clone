// theme.js

// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,

  components: {
    baseStyle: {
      fontWeight: "bold",
    },
    variants: {
      "nav-link": {
        fontSize: 50,
      },
    },
  },
});

export default theme;
