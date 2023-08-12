import {AiOutlineClose} from 'react-icons/ai';
import {BiSolidBus} from 'react-icons/bi';
import React, {useEffect, useState} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {
    Avatar,
    Box,
    Flex,
    HStack, Icon,
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Text,
    useColorMode,
    useColorModeValue,
    VStack
} from "@chakra-ui/react";
import useUserLoginInfo from "../../../hooks/useLoginInfor";
import {FiChevronDown, FiHome, FiMenu} from "react-icons/fi";
import {signOut} from "../../../actions/user.actions";
import {getAllDocFromCollection} from "../../../actions/common.action";

const SidebarV2 = ({children}) => {

    const [mobileSideBarVisible, setMobileSideBarVisible] = useState(false)
    const [linkItems, setLinkItems] = useState([])
    let userDetails = useUserLoginInfo()
    let navigate = useNavigate();

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

    const mobileNav = (
        <div className={'w-full'}>
            <Flex
                height="6vh"
                alignItems="center"
                borderBottomWidth="1px"
                className={'bg-white'}
                justifyContent={{base: 'space-between', md: 'flex-end'}}
            >
                <IconButton
                    display={{base: 'flex', md: 'none'}}
                    // onClick={onOpen}
                    variant="outline"
                    aria-label="open menu"
                    onClick={() => setMobileSideBarVisible(true)}
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
                    {/*<Button onClick={() => {*/}
                    {/*    toggleColorMode()*/}
                    {/*    const htmlElement = document.querySelector('html');*/}
                    {/*    htmlElement.classList.toggle('dark');*/}
                    {/*}}>*/}
                    {/*    Toggle {colorMode === 'light' ? 'Dark' : 'Light'}*/}
                    {/*</Button>*/}
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
        </div>

    );

    const mobileSideBar = (
        <div
            className={'md:hidden fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] z-[10000] overflow-y-auto text-center bg-gray-900'}>
            <div
                className="p-2 w-full overflow-y-auto text-center bg-gray-900"
            >
                <div className="text-gray-100 text-xl">
                    <div className="p-2.5 mt-1 flex items-center justify-between">
                        <BiSolidBus/>
                        <h1 className="font-bold text-gray-200 text-[15px] ml-3">BusMate</h1>
                        <AiOutlineClose onClick={() => setMobileSideBarVisible(!mobileSideBarVisible)}/>
                    </div>
                    <div className="my-2 bg-gray-600 h-[1px]"></div>
                </div>
                <div
                    className="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white"
                >
                    <i className="bi bi-search text-sm"></i>
                    <input
                        type="text"
                        placeholder="Search"
                        className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
                    />
                </div>
                <div
                    className="p-2.5 mt-3 flex-row items-center rounded-md px-4 duration-300 cursor-pointer text-white"
                >
                    {linkItems?.map((link) => (

                        <div onClick={() => {
                            navigate(link.link)
                        }}
                             className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                        >
                            <span className="text-[15px] ml-4 text-gray-200 font-bold">{link.name}</span>
                        </div>
                    ))}

                </div>
            </div>
        </div>

    )


    const navWithSideBar = (
        <div className={'flex relative w-full'}>
            {
                mobileSideBarVisible && (mobileSideBar)
            }
            <div
                className="hidden md:block lg:left-0 p-2 w-[350px] overflow-y-auto text-center bg-gray-900"
            >
                <div className="text-gray-100 text-xl">
                    <div className="p-2.5 mt-1 flex items-center justify-between">
                        <BiSolidBus/>
                        <h1 className="font-bold text-gray-200 text-[15px] ml-3">BusMate</h1>
                    </div>
                    <div className="my-2 bg-gray-600 h-[1px]"></div>
                </div>

                <div
                    className="p-2.5 mt-3 flex-row items-center rounded-md px-4 duration-300 cursor-pointer text-white"
                >
                    {linkItems?.map((link) => (

                        <div onClick={() => {
                            navigate(link.link)
                        }}
                             className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                        >
                            <span className="text-[15px] ml-4 text-gray-200 font-bold">{link.name}</span>
                        </div>
                    ))}

                </div>
            </div>
            <div className={'w-full h-[100vh]'}>
                {mobileNav}
                <div className={'h-[94vh]'}>
                    <Outlet/>
                </div>
            </div>
        </div>

    )

    return (
        <>
            {navWithSideBar}
        </>

    )
}


export default SidebarV2