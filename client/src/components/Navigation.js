import {
  Avatar,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Spacer,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";
import { Link, withRouter } from "react-router-dom";
import Cookies from "js-cookie";
import { connect } from "react-redux";
import { FiBookmark } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { Auth } from "../constants/Constants";
import { route1, route2 } from "./RoutesConstants";
import { checkAuth } from "../utils/checkAuth";

const iconSize = 30;
const Navigation = ({ history, isAuth }) => {
  const handleLogout = () => {
    Cookies.remove("access_token");
    window.location.reload(); // Just to clear cookie
    // history.push("/");
  };

  // const { isAuthenticated } = isAuth;
  const isAuthenticated = checkAuth();
  return (
    <Box boxShadow="lg" bg="white" color="black" h={65} marginTop={2} w="100%">
      <Box w="container.lg" margin="auto">
        <Flex justifyContent="center" align="center">
          <Box>
            <Link to="/">
              <Text fontSize="4xl">WRITER</Text>
            </Link>
          </Box>
          <Spacer />
          <Box>
            <Stack direction="row">
              {isAuthenticated ? (
                <>
                  <AiOutlineSearch size={iconSize} />
                  <IoIosNotificationsOutline size={iconSize} />
                  <FiBookmark size={iconSize} />
                  <Menu>
                    <MenuButton
                      cursor="pointer"
                      size="sm"
                      as={Avatar}
                      colorScheme="pink"
                    >
                      <Wrap>
                        <WrapItem>
                          <Avatar
                            size="sm"
                            name="Kent Dodds"
                            src="https://bit.ly/kent-c-dodds"
                          />
                        </WrapItem>
                      </Wrap>
                    </MenuButton>
                    <MenuList>
                      <MenuGroup>
                        <MenuItem>
                          <Link to="/profile">
                            <Flex alignItems="center" justifyContent="center">
                              <Box flex={1}>
                                <Wrap>
                                  <WrapItem>
                                    <Avatar
                                      size="md"
                                      name="Kent Dodds"
                                      src="https://bit.ly/kent-c-dodds"
                                    />
                                  </WrapItem>
                                </Wrap>
                              </Box>

                              <Box marginLeft={2} flex={4}>
                                <Text>Kent C. Dodds</Text>
                              </Box>
                            </Flex>
                          </Link>
                        </MenuItem>

                        <MenuDivider />
                        {route1.map((item, _) => (
                          <MenuItem key={item.id}>
                            <Link to={item.path}>{item.route}</Link>
                          </MenuItem>
                        ))}
                        <MenuDivider />
                        {route2.map((item, _) => (
                          <MenuItem key={item.id}>
                            <Link to={item.path}>{item.route}</Link>
                          </MenuItem>
                        ))}
                        <MenuDivider />
                        <MenuItem onClick={() => handleLogout()}>
                          Logout
                        </MenuItem>
                      </MenuGroup>
                    </MenuList>
                  </Menu>
                </>
              ) : (
                <>
                  <Button variant="ghost">
                    <Link to="/register">Sign In</Link>
                  </Button>
                  <Button variant="outline">
                    <Link to="/login">Get Started</Link>
                  </Button>
                </>
              )}
            </Stack>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth,
});

const mapDispatchToPros = (dispatch) => ({
  logout: () =>
    dispatch({
      type: Auth.USER_LOGGED_OUT,
    }),
  login: (payload) =>
    dispatch({
      type: Auth.USER_LOGGED_IN,
      payload,
    }),
});

export default connect(
  mapStateToProps,
  mapDispatchToPros
)(withRouter(Navigation));
