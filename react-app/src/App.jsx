import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { StackDivider, extendTheme, ChakraProvider } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import { color } from 'framer-motion'
import './App.css'

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Stack,
  Code
} from '@chakra-ui/react'

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
    <Stack spacing={3}>
      <Alert status='error'>
        <AlertIcon />
        <div><Code><a href="https://www.farpost.ru" style={{color: "blue"}}>farpost.ru</a></Code> is not in the sudoers file. This incident will be reported.</div>
      </Alert>

      <Alert status='success'>
        <AlertIcon />
        We have a button! Many buttons!
      </Alert>

      <Alert status='warning'>
        <AlertIcon />
        The project defense is in 8 days.
      </Alert>

      <Alert status='info'>
        <AlertIcon />
        <Code><span style={{color: "red"}}>nightSanya@hotel $</span> sudo shutdown -P 23:00</Code>
      </Alert>
      
    </Stack>
    </>
  )
}



export default App;
