import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { AppProps } from "next/app";
import Login from "./login";
const ISSERVER = typeof window === "undefined";

function MyApp({ Component, pageProps }: AppProps) {
  const isAuth = !ISSERVER && JSON.parse(localStorage.getItem("tah"));
  console.log("isAuth :>> ", isAuth);
  // if (!isAuth) {
  //   return (
  //     <ChakraProvider theme={theme}>
  //       <Login />
  //     </ChakraProvider>
  //   );
  // } else
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
