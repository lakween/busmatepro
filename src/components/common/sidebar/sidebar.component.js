import {Avatar, Box, Flex, Text, Wrap, WrapItem} from "@chakra-ui/react";
import { Outlet, Link, useRoutes, useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

const Sidebar = () => {
    let displayName = useSelector((store) => (store.firebase.auth.displayName))
    return (
        <Flex flexDirection={'row'}>
            <Box gap={5} display={'flex'} bg={'aliceblue'} borderStyle={'solid'} borderRadius={'5px'} borderWidth={2}
                 flexDirection={'column'} width={'20vw'} height={'100vh'}>
                <Box gap={2} bgGradient='linear(to-r, #1d82d0, #0e436d)' flexDirection={"column"} display={'Flex'} justifyContent={'center'} alignItems={'center'} height={'30vh'}>

                    <Text
                        bgGradient='linear(to-l, #7928CA, #FF0080)'
                        bgClip='text'
                        fontSize='3xl'
                        fontWeight='extrabold'>Busmate Sri Lanka   </Text>
                </Box>
                <Flex justifyContent={'center'} alignItems={'center'} direction={"column"} gap={3}>
                    <Avatar mt={'-30%'} size='2xl' name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
                    <Text>{displayName}</Text>
                </Flex>
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