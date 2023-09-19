import logo from './logo.svg';
import './App.css';
import Goal from './components/goal';

import { ChakraProvider } from '@chakra-ui/react'

import { Button } from "@chakra-ui/react"
import Navbar from './components/navbar';
import Login from './components/login';

function Example() {
  return <Button>I just consumed some ⚡️Chakra!</Button>
}

function App() {
  return (
    <ChakraProvider>
    <div className="App">
     
      {/* <Navbar></Navbar> */}
      {/* <Goal></Goal> */}
      {/* <AuthForm></AuthForm> */}
      {/* <Login></Login> */}
    </div>
    {/* <Example /> */}
    </ChakraProvider>
  );
}

export default App;
