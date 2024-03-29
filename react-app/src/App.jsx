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
  )
}

export default App
