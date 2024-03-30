import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { StackDivider, extendTheme, ChakraProvider } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import { color } from 'framer-motion'
import './App.css'

function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <>
      <VStack spacing="12px" align="stretch" justify="center">
        <HStack spacing="20px">
          <Button onClick={() => console.log("clicked")}>
            Button
          </Button>
          <Button >Button</Button>
        </HStack>
        <HStack spacing="20px">
          <Button  onClick={() => console.log("clicked")}>
            Button
          </Button>
          <Button >Button</Button>
        </HStack>

        <Button
          
          onClick={() => console.log("clicked")}
        >
          back
        </Button>
      </VStack>
    </>
  )
}



export default App;
