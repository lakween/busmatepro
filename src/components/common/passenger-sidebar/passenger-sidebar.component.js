import {Box, Text} from "@chakra-ui/react";


const PassengerSidebar = () => {


    return (
        <>
            <Box gap={5} display={'flex'} bg={'aliceblue'}
                 flexDirection={'column'} width={'250px'} height={'100vh'}>
                <Box display={'Flex'} justifyContent={'center'} alignItems={'center'} height={'10vh'}>
                    <Text>
                        Busmate Sri Lanka
                    </Text>
                </Box>
                < NavLink/>
                < NavLink/>
                < NavLink/>

            </Box>
        </>
    )


}

const NavLink = () => (
    <Box display={'Flex'} justifyContent={'center'} alignItems={'center'}>
        <Text>
            view profile
        </Text>
    </Box>
)

export default PassengerSidebar