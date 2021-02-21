import React from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  Flex,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import { SIGNUP_USER } from "../../apollo/authQuery";

const Register = (props) => {
  const [signUpUser, { data, error, loading }] = useMutation(SIGNUP_USER);
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      signUpUser({
        variables: {
          email: values.email,
          username: values.username,
          password: values.password,
        },
      })
        .then((res) => {
          props.history.push("/login");
        })
        .catch((err) => console.log(err));
    },
  });

  const { handleChange, values, handleSubmit } = formik;
  return (
    <Box w="100%" h="100vh" mt="10%">
      <Flex justifyContent="center" alignItems="center">
        <Box w={"40%"}>
          <form onSubmit={handleSubmit}>
            <Center>
              <Text>{"Register"}</Text>
            </Center>
            <Box p={1}>
              <Input
                name="username"
                onChange={handleChange}
                type="text"
                value={values.username}
                placeholder="UserName"
              />
            </Box>
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
                {loading ? "loading..." : "Register"}
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

export default Register;
