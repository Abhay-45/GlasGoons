import { Flex, Box, Text, Button } from '@chakra-ui/react';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    function navigateTo(url) {
        navigate(url);
    }


    return (
        <Flex
            as='nav'
            align='center'
            justify='space-between'
            wrap='wrap'
            padding={4}
            bg='#2e8540'
            color='white'
        >
            <Box onClick={() => navigateTo("/")} >
                <Text fontSize='xl' fontWeight='bold'>
                    GlasGoons
                </Text>
            </Box>
            <Flex>
            <Box mx={10} onClick={() => navigateTo("/LeaderBoard")}>
                    <Button colorScheme='whiteAlpha' variant='outline' >
                        LeaderBoard
                    </Button>
                </Box>
                <Box onClick={() => navigateTo("/Login")}>
                    <Button colorScheme='whiteAlpha' variant='outline' >
                        Logout
                    </Button>
                </Box>
                
            </Flex>

        </Flex>
    );
}

export default Navbar;
