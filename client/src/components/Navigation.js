import { Box, Button, Flex, Spacer, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Link, withRouter } from "react-router-dom";
import Cookies from "js-cookie";
import { connect } from "react-redux";
class Navigation extends React.Component {
  render() {

    const handleLogout = () => {
      Cookies.remove("access_token");
      this.props.history.push("/");
      // TODO:  Store state !isAuthenticated
    };
    
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
                <Button onClick={handleLogout} variant="outline">
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

const mapStateToProps = (state) => {
  return { ...state };
};

const mapDispatchToPros = (dispatch) => {
  return {
    logout: dispatch({
      type: "USER_LOGGED_OUT",
    }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToPros
)(withRouter(Navigation));
