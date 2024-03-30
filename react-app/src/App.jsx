import { Button, HStack, VStack } from "@chakra-ui/react";
import MovieHall from "./MovieHall.jsx";

function App() {
  return (
    <>
      <MovieHall />
    </>
  );

  return (
    <>
      <VStack spacing="12px" align="stretch" justify="center">
        <HStack spacing="20px">
          <Button onClick={() => console.log("clicked")}>Button</Button>
          <Button>Button</Button>
        </HStack>
        <HStack spacing="20px">
          <Button onClick={() => console.log("clicked")}>Button</Button>
          <Button>Button</Button>
        </HStack>

        <Button onClick={() => console.log("clicked")}>back</Button>
      </VStack>
    </>
  );
}

export default App;
