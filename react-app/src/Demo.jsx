import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { StackDivider, extendTheme, ChakraProvider } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import { color } from 'framer-motion'

function Demo() {
  return(
    <>
      <VStack spacing="10px" align="stretch" justify="center">
        <HStack spacing="10px">
          <Button onClick={() => console.log("clicked")}>
            Button
          </Button>
          <Button >Button</Button>
        </HStack>
        <HStack spacing="10px">
          <Button  onClick={() => console.log("clicked")}>
            Button
          </Button>
          <Button >Button</Button>
        </HStack>

        <Button
          
          fill={true}
          onClick={() => console.log("clicked")}
        >
          back
        </Button>
      </VStack>
    </>
  );
}

export default Demo;