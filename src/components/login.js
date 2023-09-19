import { useState } from "react";
import { Link, BrowserRouter as Router } from 'react-router-dom';
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Flex
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Navbar from './navbar';

function Login() {
    const navigate = useNavigate();

    function navigateTo(url) {
        navigate(url);
    }
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Email:", email);
        console.log("Password:", password);
        // Call API to submit data to backend
    };

    return (
        <>
           <Flex
            as='nav'
            align='center'
            justify='space-between'
            wrap='wrap'
            padding={6}
            bg='#2e8540'
            color='white'
        >
            <Box onClick={() => navigateTo("/")} >
                <Text fontSize='xl' fontWeight='bold'>
                    GlasGoons
                </Text>
            </Box>
            
            

        </Flex>
            <Flex justifyContent={'center'} alignItems={'center'} >
                <Box my={8} textAlign="left" w={'40%'} >
                    <Heading>Login to your account</Heading>
                    <Text mt={2} color={useColorModeValue("gray.600", "gray.400")}>
                        Don't have an account?{" "}
                        <Link
                            // href="/SignUp" 
                            color={"blue.400"}>
                            Sign up here.
                        </Link>
                    </Text>
                    <Box mt={4}>
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={3}>
                                <FormControl id="email">
                                    <FormLabel>Email address</FormLabel>
                                    <Input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </FormControl>
                                <FormControl id="password">
                                    <FormLabel>Password</FormLabel>
                                    <Input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </FormControl>
                                <Button type="submit" colorScheme="green" size="lg" fontSize="md" onClick={() => navigateTo("/")}>
                                    Login
                                </Button>
                            </Stack>
                        </form>
                    </Box>
                </Box>
            </Flex>

        </>

    );
}

export default Login;