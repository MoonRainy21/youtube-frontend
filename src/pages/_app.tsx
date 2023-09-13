import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { NavBar } from "@/components/NavBar";
import Footer from "@/components/Footer";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        position: 'absolute',
        width: '100%',
        height: '100%',
      }
    },
  }
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <NavBar />
      <Component {...pageProps} mt="20" />
      <Footer />
    </ChakraProvider>
  );
}
