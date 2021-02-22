import { Box, Button, Flex, Spacer, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
class Navigation extends React.Component {
  render() {
    return (
      <Box bg="white" color="black" h={10} w="100%">
        <Box w="90%" margin="auto">
          <Flex justifyContent="center" align="center">
            <Box>
              <Link to="/">
                <Text fontSize="4xl">WRITER</Text>
              </Link>
            </Box>
            <Spacer />
            <Box>
              <Stack direction="row">
                <Button variant="outline">
                  Logout
                </Button>
                <Button variant="ghost">
                  <Link to="/register">Sign In</Link>
                </Button>
                <Button variant="outline">
                  <Link to="/login">Get Started</Link>
                </Button>
              </Stack>
            </Box>
          </Flex>
        </Box>
      </Box>
    );
  }
}

export default Navigation;
