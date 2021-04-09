import { useLazyQuery, useQuery } from "@apollo/client";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  Flex,
  Input,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { LOGIN_USER } from "../../apollo/authQuery";
import { Auth } from "../../constants/Constants";

const Login = (props) => {
  const [login, { data, error, loading }] = useLazyQuery(LOGIN_USER);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      login({
        variables: {
          email: values.email,
          password: values.password,
        },
      });
    },
  });
  const dispatch = useDispatch();
  if (data && data.login) {
    props.history.push("/dashboard");
    dispatch({
      type: Auth.USER_LOGGED_IN,
      payload: {
        access_token: JSON.stringify(data.login.access_token),
        refresh_token: JSON.stringify(data.login.refresh_token),
      },
    });
  }

  const { handleChange, values, handleSubmit } = formik;

  return (
    <Box w="100%" h="100vh" mt="10%">
      <Flex justifyContent="center" alignItems="center">
        <Box w={"40%"}>
          <form onSubmit={handleSubmit}>
            <Center>
              <Text>{"Login"}</Text>
            </Center>

            <Box p={1}>
              <Input
                name="email"
                onChange={handleChange}
                value={values.email}
                type="email"
                placeholder="Email"
              />
            </Box>
            <Box p={1}>
              <Input
                name="password"
                onChange={handleChange}
                value={values.password}
                type="password"
                placeholder="Password"
              />
            </Box>
            <Center>
              <Button type="submit" variant="outline">
                {loading ? "loading..." : "Login"}
              </Button>
            </Center>
            {error ? (
              <Box paddingTop={5}>
                <Alert status="error">
                  <AlertIcon />
                  <Text>{error.message}</Text>
                </Alert>
              </Box>
            ) : null}
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default Login;
