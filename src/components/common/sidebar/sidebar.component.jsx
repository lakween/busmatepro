import {Avatar, Box, Flex, Link, Text, Wrap, WrapItem} from "@chakra-ui/react";
import {Outlet, Link as ReachLink, useRoutes, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import React from "react";

const Sidebar = () => {
    let displayName = useSelector((store) => (store.firebase.auth.displayName))
    return (
        <Flex flexDirection={'row'}>
            <Box gap={5} display={'flex'} bg={'aliceblue'} borderStyle={'solid'} borderRadius={'5px'} borderWidth={2}
                 flexDirection={'column'} width={'20vw'} height={'100vh'}>
                <Box gap={2} bgGradient='linear(to-r, #1d82d0, #0e436d)' flexDirection={"column"} display={'Flex'}
                     justifyContent={'center'} alignItems={'center'} height={'30vh'}>

                    <Text
                        bgGradient='linear(to-l, #7928CA, #FF0080)'
                        bgClip='text'
                        fontSize='3xl'
                        fontWeight='extrabold'>Busmate Sri Lanka </Text>
                </Box>
                <Flex justifyContent={'center'} alignItems={'center'} direction={"column"} gap={3}>
                    <Avatar mt={'-30%'} size='2xl' name='Segun Adebayo' src='https://bit.ly/sage-adebayo'/>
                    <Text>{displayName}</Text>
                </Flex>
                <NavLink/>
            </Box>
            <Outlet/>
        </Flex>
    )
}

const NavLink = () => (
    <Box display={'Flex'} flexDirection={"column"} justifyContent={'center'} alignItems={'center'}>
        <Link as={ReachLink} cursor={'pointer'} to='/home'>
            Profile
        </Link>
        <Link as={ReachLink} cursor={'pointer'} to='/passenger'>
            Pickng
        </Link>
        <Link as={ReachLink} cursor={'pointer'} to='/passenger/history'>
            Request History
        </Link>
    </Box>

)


export default Sidebar