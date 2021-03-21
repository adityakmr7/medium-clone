import { Box, Button, Flex, Spacer, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Link, withRouter } from "react-router-dom";
import Cookies from "js-cookie";
import { connect } from "react-redux";
import { Auth } from '../constants/Constants';
import jwt from 'jsonwebtoken';
class Navigation extends React.Component {
  componentDidMount() {
    const token = Cookies.get('access_token');
    if (token) {
      jwt.verify(token, 'SOMESUPERSECRETKEY', (err, decoded) => {
        const { email, userId } = decoded;
        if (err) {
          return null
        }
        if (decoded) {
          const payload = { token, email, userId };
          this.props.login(payload)
        }
      })
    }
  }

  render() {
    

    const handleLogout = () => {
      Cookies.remove("access_token");
      this.props.history.push("/");
      // TODO:  Store state !isAuthenticated
    };
    const {isAuthenticated } = this.props.isAuth;
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
                {isAuthenticated ?
                  <Button onClick={() => handleLogout()} variant="outline">
                    Logout
                </Button>
                  :
                  <>
                  <Button variant="ghost">
                    <Link to="/register">Sign In</Link>
                    </Button>
                    <Button variant="outline">
                  <Link to="/login">Get Started</Link>
                </Button>
                  </>
                  }
               
              </Stack>
            </Box>
          </Flex>
        </Box>
      </Box>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth
  };
};

const mapDispatchToPros = (dispatch) => {
  return {
    logout:()=> dispatch({
      type: Auth.USER_LOGGED_OUT
    }),
    login: (payload) => dispatch({
      type: Auth.USER_LOGGED_IN,
      payload:payload
    })
  }
   
};

export default connect(
  mapStateToProps,
  mapDispatchToPros
)(withRouter(Navigation));
