import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ColorModeContextProvider } from "context/ColorModeContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <ColorModeContextProvider>
        <Component {...pageProps} />
      </ColorModeContextProvider>
  );
}