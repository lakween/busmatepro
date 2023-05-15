import {
    Avatar,
    Box,
    Button,
    CloseButton,
    Drawer,
    DrawerContent,
    Flex,
    HStack,
    Icon,
    IconButton,
    Link,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Text,
    useColorMode,
    useColorModeValue,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import {Outlet, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {FiChevronDown, FiHome, FiMenu} from "react-icons/fi";
import {signOut} from "../../../actions/user.actions";
import useUserLoginInfo from "../../../hooks/useLoginInfor";
import {getAllDocFromCollection, getBusArriveState} from "../../../actions/common.action";

function Sidebar({children}) {
    const {isOpen, onOpen, onClose} = useDisclosure();

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
                <div className={'d-flex flex-row justify-content-center align-content-center'} style={{marginRight:'20%'}}>
                        <BusArriveAlert/>
                </div>
                <Outlet/>
            </Box>
        </Box>
    );
}

const BusArriveAlert = () => {
    const [state, setState] = useState()
    const dispatch = useDispatch()
    const userDetails = useUserLoginInfo()

    useEffect(() => {
        if (userDetails?.id) setInterval(() => {
            // getBusArriveState(userDetails, dispatch, setState)
        }, [5000])
    }, [userDetails])

    return (
        <>{state?.arravi && (<div className={'bg-success p-2 rounded rounded-md'}>
            <>Your Bus {state?.busno ? state?.busno : ''} arrived</>
        </div>)}</>
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
                <Button onClick={()=>{
                    toggleColorMode()
                    const htmlElement = document.querySelector('html');
                    htmlElement.classList.toggle('dark');
                }}>
                    Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
                </Button>
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
                                    <Text fontSize="sm">{userDetails?.fullName}</Text>
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