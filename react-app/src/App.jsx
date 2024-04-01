import { Button, HStack, VStack } from "@chakra-ui/react";
import MovieHall from "./MovieHall.jsx";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <Switch>
      <Route exact path="/movie" component={MovieHall} />
    </Switch>
  );
}

export default App;
