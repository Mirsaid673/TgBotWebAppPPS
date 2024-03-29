import * as React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";

const params = window.Telegram.WebApp.themeParams;

const theme = extendTheme({
  components: {
    Button: {
      // 1. We can update the base styles
      baseStyle: {
        fontWeight: 'bold', // Normally, it is "semibold"
      },
      // 3. We can add a new visual variant
      variants: {
        // 4. We can override existing variants
        solid: (props) => ({
          bg: params.button_color,
          color: params.button_text_color
        }),
      },
    },
  },

  styles: {
    global: {
      body: {
        bg: params.bg_color,
        color: params.text_color,
        link_color: params.link_color,
        hint_color: params.hint_color,
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
