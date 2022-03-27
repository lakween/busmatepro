import {Box, Flex, Text} from "@chakra-ui/react";
//import { Outlet, Link, useRoutes, useParams } from "react-router-dom";

const Sidebar = () => {

    return (
        <Flex flexDirection={'row'}>
            <Box gap={5} display={'flex'} bg={'aliceblue'}
                 flexDirection={'column'} width={'250px'} height={'100vh'}>
                <Box display={'Flex'} justifyContent={'center'} alignItems={'center'} height={'10vh'}>
                    <Text>
                        Busmate Sri Lanka
                    </Text>
                </Box>
                <NavLink/>
                <NavLink/>
                <NavLink/>
            </Box>
            {/*<Outlet/>*/}
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