import {Box, Flex, Text} from "@chakra-ui/react";
import { Outlet, Link, useRoutes, useParams } from "react-router-dom";

const Sidebar = () => {

    return (
        <Flex flexDirection={'row'}>
            <Box gap={5} display={'flex'} bg={'aliceblue'} borderStyle={'solid'} borderRadius={'5px'} borderWidth={2}
                 flexDirection={'column'} width={'20vw'} height={'100vh'}>
                <Box bgGradient='linear(to-r, #1d82d0, #0e436d)' flexDirection={"column"} display={'Flex'} justifyContent={'center'} alignItems={'center'} height={'20vh'}>

                    <Text
                        bgGradient='linear(to-l, #7928CA, #FF0080)'
                        bgClip='text'
                        fontSize='3xl'
                        fontWeight='extrabold'>Busmate Sri Lanka   </Text>
                    <Text
                        bgGradient='linear(to-l, #7928CA, #FF0080)'
                        bgClip='text'
                        fontSize='2xl'
                        fontWeight='extrabold'>Welcome </Text>
                </Box>
                <NavLink/>
                <NavLink/>
                <NavLink/>
            </Box>
            <Outlet/>
        </Flex>
    )
}

const NavLink = () => (
    <Box display={'Flex'} justifyContent={'center'} alignItems={'center'}>
        <Text>
            view profile
        </Text>
    </Box>
)

export default Sidebar