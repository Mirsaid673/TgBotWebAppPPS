import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { StackDivider, extendTheme, ChakraProvider } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Stack, HStack, VStack } from "@chakra-ui/react";

function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <>
      <VStack spacing="10px" align="stretch" justify="center">
        <HStack spacing="10px">
          <Button colorScheme="blue" onClick={() => console.log("clicked")}>
            Button
          </Button>
          <Button colorScheme="blue">Button</Button>
        </HStack>

        <HStack spacing="10px">
          <Button colorScheme="blue" onClick={() => console.log("clicked")}>
            Button
          </Button>
          <Button colorScheme="blue">Button</Button>
          <button>button</button>
        </HStack>

        <Button
          colorScheme="blue"
          fill={true}
          onClick={() => console.log("clicked")}
        >
          back
        </Button>
      </VStack>
    </>
  );
}

export default App;
