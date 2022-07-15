import * as React from "react";
import { useFormik } from "formik";
import {
  Box,
  Container,
  Heading,
  Text,
  Input,
  FormControl,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import axios from "axios";
import { api } from "../lib/api";
import { useRouter } from "next/router";
// import { io } from "socket.io-client";
// const socket = io("http://localhost:4000");

// axios.interceptors.response.use(
//   (res) => res,
//   (error) => {
//     if (error.response.status === 401 || error.response.status === 403) {
//       // @ts-ignore
//       window.location.replace("/");
//     }
//   }
// );

export default function Login({}) {
  const Router = useRouter();
  const [loginData, setLoginData] = React.useState();
  const [sessionData, setSessionData] = React.useState();
  const [logoutData, setLogoutData] = React.useState();
  // const [isAuth, setIsAuth] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      console.log("values :>> ", values);
      const { email, password } = values;
      api
        .post<any>(`/session`, { email, password })
        .then((res) => {
          setLoginData(res.data);
          console.log("Object.keys(res.data) :>> ", Object.keys(res.data));
          if (Object.keys(res.data).length > 0) {
            localStorage.setItem("tah", JSON.stringify(1));
            localStorage.setItem("CrU", JSON.stringify(res.data));
          }
          console.log("res", res);
        })
        .catch((error) => {
          setLoginData(error.response.data);
          console.log("error", error.response.data);
        });
    },
  });
  const getSessionData = async () => {
    api
      .get<any>(`/session`)
      .then((res) => setSessionData(res.data))
      .catch((error) => setSessionData(error.message));
  };
  const logout = async () => {
    api
      .delete<any>(`/session`)
      .then((res) => {
        console.log("res :>> ", res);
        setLogoutData(res.data);
        localStorage.removeItem("tah");
        localStorage.removeItem("CrU");
        Router.push("/");
      })
      .catch((error) => setLogoutData(error.response.data));
  };
  return (
    <Container
      height="100vh"
      maxW="full"
      padding={0}
      display="flex"
      gap={"2rem"}
      justifyContent="center"
      justifyItems="center"
      alignContent="center"
    >
      <Box
        padding={"2rem"}
        justifyContent="center"
        display={"flex"}
        flexDirection="column"
        justifyItems={"center"}
      >
        <Heading fontSize="4xl" mb={4}>
          Authentication system
        </Heading>
        <Heading fontSize="2xl" mb={4}>
          Login
        </Heading>
        <Text as="p" fontSize="sm" width="sm">
          By continuing, you are setting up a Reddit account and agree to our
          User Agreement and Privacy Policy.
        </Text>
        <form onSubmit={formik.handleSubmit}>
          <FormControl mt={4} isRequired isInvalid={!!formik.errors.email}>
            <Input
              fontSize="sm"
              id="email"
              name="email"
              type="email"
              placeholder="Email Address"
              aria-label="Email Address"
              aria-placeholder="Email Address"
              //   variant="filled"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email ? (
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            ) : null}
          </FormControl>
          <FormControl mt={4} isRequired isInvalid={!!formik.errors.password}>
            <Input
              fontSize="sm"
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              aria-label="password"
              aria-placeholder="password"
              //   variant="filled"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password ? (
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            ) : null}
          </FormControl>

          <Button
            mt={8}
            w="full"
            fontSize={"sm"}
            colorScheme="green"
            type="submit"
            isLoading={formik.isSubmitting}
          >
            Login
          </Button>
        </form>
        <Box>{JSON.stringify(loginData, null, 2)}</Box>
      </Box>
      <Box
        padding={"2rem"}
        justifyContent="center"
        display={"flex"}
        flexDirection="column"
        justifyItems={"center"}
      >
        <Button
          mt={8}
          w="full"
          fontSize={"sm"}
          colorScheme="green"
          type="button"
          isLoading={formik.isSubmitting}
          onClick={getSessionData}
        >
          Get Session Data
        </Button>
        <Box maxW="full">{JSON.stringify(sessionData, null, 2)}</Box>
      </Box>
      <Box
        padding={"2rem"}
        justifyContent="center"
        display={"flex"}
        flexDirection="column"
        justifyItems={"center"}
      >
        <Button
          mt={8}
          w="full"
          fontSize={"sm"}
          colorScheme="green"
          type="button"
          isLoading={formik.isSubmitting}
          onClick={logout}
        >
          Logout
        </Button>
        <Box maxW="full">{JSON.stringify(logoutData, null, 2)}</Box>
      </Box>
    </Container>
  );
}
