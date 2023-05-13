import {
    Avatar,
    Box, Button, CloseButton, DrawerContent,
    Flex, HStack, Icon,
    IconButton,
    Link, Menu, MenuButton, MenuDivider, MenuItem, MenuList,
    Text, useColorMode,
    useColorModeValue, Drawer,
    useDisclosure, VStack,
    Wrap,
    WrapItem
} from "@chakra-ui/react";
import {Outlet, Link as ReachLink, useRoutes, useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import React from "react";
import {FiBell, FiChevronDown, FiHome, FiMenu} from "react-icons/fi";
import RequestHistory from "../../passenger/pages/request-history/request-history";
import Notifications from "../notifications/notifications";
import {signOut} from "../../../actions/user.actions";
import useUserLoginInfo from "../../../hooks/useLoginInfor";
import {
    filterDocsFromCollection,
    getAllDocFromCollection,
    getBusArriveState,
    getDocFromCollection
} from "../../../actions/common.action";

// const Sidebar = () => {
//     let displayName = useSelector((store) => (store.firebase.auth.displayName))
//     return (
//         <Flex maxH={'100vh'} flexDirection={'row'} gap={'20px'} overflowY={'hidden'} >
//             <Box gap={5} display={'flex'} bg={'aliceblue'} borderStyle={'solid'} borderRadius={'5px'} borderWidth={2}
//                  flexDirection={'column'} width={'20vw'} height={'100vh'}>
//                 <Box gap={2} bgGradient='linear(to-r, #1d82d0, #0e436d)' flexDirection={"column"} display={'Flex'}
//                      justifyContent={'center'} alignItems={'center'} height={'30vh'}>
//
//                     <Text
//                         bgGradient='linear(to-l, #7928CA, #FF0080)'
//                         bgClip='text'
//                         fontSize='3xl'
//                         fontWeight='extrabold'>Busmate Sri Lanka </Text>
//                 </Box>
//                 <Flex justifyContent={'center'} alignItems={'center'} direction={"column"} gap={3}>
//                     <Avatar mt={'-30%'} size='2xl' name='Segun Adebayo' src='https://bit.ly/sage-adebayo'/>
//                     <Text>{displayName}</Text>
//                 </Flex>
//                 <NavLink/>
//             </Box>
//             <Box width={'100%'} maxH={'100vh'}  overflowY={'scroll'}>
//                 <Outlet/>
//             </Box>
//         </Flex>
//     )
// }
//
// const NavLink = () => (
//     <Box display={'Flex'} flexDirection={"column"} justifyContent={'center'} alignItems={'center'}>
//         <Link as={ReachLink} cursor={'pointer'} to='/home'>
//             Profile
//         </Link>
//         <Link as={ReachLink} cursor={'pointer'} to='/passenger'>
//             Pickng
//         </Link>
//         <Link as={ReachLink} cursor={'pointer'} to='/passenger/history'>
//             Request History
//         </Link>
//     </Box>
//
// )
function Sidebar({children}) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const data = useSelector(state => state)

    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <SidebarContent
                onClose={() => onClose}
                display={{base: 'none', md: 'block'}}
            />

            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose}/>
                </DrawerContent>
            </Drawer>
            <MobileNav onOpen={onOpen}/>
            <Box ml={{base: 0, md: 60}} p="4">
                <Outlet/>
                <div>
                    <BusArrav/>
                </div>
            </Box>
        </Box>
    );
}

const BusArrav = ()=>{
    const [state,setState] = useState()
    const dispatch =useDispatch()

    useEffect(()=>{
        getBusArriveState(dispatch,setState)
    },[])

return(
    <>
        {state && (<>EFRFEERFERG</>)}
    </>
)

}



const SidebarContent = ({onClose}) => {

    let navigate = useNavigate();
    let userDetails = useUserLoginInfo()
    const [linkItems, setLinkItems] = useState([])

    useEffect(() => {
        getSideBarLinks()
    }, [userDetails])

    let icons = {
        FiHome: FiHome
    }

    async function getSideBarLinks() {
        if (userDetails?.type == 'passenger') {
            let data = await getAllDocFromCollection('passengerSideBarLinks')
            setLinkItems(data)
        } else if (userDetails?.type == 'driver') {
            let data = await getAllDocFromCollection('driverSidebarLinks')
            setLinkItems(data)
        }
    }

    return (

        <Box
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{base: 'full', md: 60}}
            pos="fixed"
            h="full">
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    Logo
                </Text>
                <CloseButton display={{base: 'flex', md: 'none'}} onClick={onClose}/>

            </Flex>
            {linkItems?.map((link) => (
                <NavItem key={link.name} link={link.link} navigate={navigate} icon={icons[link.icon]}>
                    {link.name}
                </NavItem>
            ))}


        </Box>
    );
};

const NavItem = ({icon, link, navigate, children, ...rest}) => {
    return (
        <Link onClick={() => {
            navigate(link)
        }} style={{textDecoration: 'none'}} _focus={{boxShadow: 'none'}}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'cyan.400',
                    color: 'white',
                }}
                {...rest}>
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}

                {children}
            </Flex>
        </Link>
    );
};

const MobileNav = ({onOpen, ...rest}) => {
    const {colorMode, toggleColorMode} = useColorMode()
    let userDetails = useUserLoginInfo()
    let navigate = useNavigate();
    return (
        <Flex
            ml={{base: 0, md: 60}}
            px={{base: 4, md: 4}}
            height="6vh"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{base: 'space-between', md: 'flex-end'}}
            {...rest}>
            <IconButton
                display={{base: 'flex', md: 'none'}}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu/>}
            />

            <Text
                display={{base: 'flex', md: 'none'}}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold">
                Logo
            </Text>

            <HStack spacing={{base: '0', md: '6'}}>
                <Button onClick={toggleColorMode}>
                    Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
                </Button>
                <Notifications/>
                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton
                            py={2}
                            transition="all 0.3s"
                            _focus={{boxShadow: 'none'}}>
                            <HStack>
                                <Avatar
                                    size={'sm'}
                                    src={userDetails?.photoURL ?? ''}
                                />
                                <VStack
                                    display={{base: 'none', md: 'flex'}}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2">
                                    <Text fontSize="sm">{userDetails?.fullName }</Text>
                                    <Text fontSize="xs" color="gray.600">
                                        {userDetails?.type}
                                    </Text>
                                </VStack>
                                <Box display={{base: 'none', md: 'flex'}}>
                                    <FiChevronDown/>
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue('white', 'gray.900')}
                            borderColor={useColorModeValue('gray.200', 'gray.700')}>
                            <MenuItem onClick={() => navigate('profile')}>Profile</MenuItem>
                            <MenuItem>Settings</MenuItem>
                            <MenuItem>Billing</MenuItem>
                            <MenuDivider/>
                            <MenuItem onClick={() => {
                                signOut(navigate)
                            }}>Sign out</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
};


export default Sidebar