import {
    Avatar,
    Box,
    Button, chakra,
    Flex,
    FormControl, FormHelperText,
    Heading,
    Input,
    InputGroup, InputLeftElement, InputRightElement, Link,
    Stack,
    Text,
    useColorModeValue
} from '@chakra-ui/react'
import {FcGoogle} from "react-icons/fc";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {googleSignUp, login} from "../../../actions/user.actions";
import {useState} from "react";
import {useService} from "../../../hooks/useService";
import {setCommonState} from "../../../store/reducers/common-slice";
import useFormController from "../../../hooks/useFormController";
import {FaLock, FaUserAlt} from "react-icons/fa";
import {createDocOfCollectionWithId, getDocFromCollection} from "../../../actions/common.action";

const Login = () => {
    let navigate = useNavigate();
    let dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    let [valueChangeHandler, setValue, form, setForm] = useFormController()

    async function signUpwithGoogle() {
        // setIsLoading(true
        let res = await googleSignUp(navigate)
        let document = await getDocFromCollection('userProfile', res?.reference_doc_id)

        if (Object.keys(document).length === 0 && res?.reference_doc_id) {
            console.log('bb')
           let doc = await createDocOfCollectionWithId('userProfile', res?.reference_doc_id, {
                ...res
            })
            navigate('signup')

        } else if (res?.reference_doc_id) {

            navigate('signup')
        }
    }

    const loginHandler = async () => {
        await dispatch(login(form, navigate))
    }

    const CFaUserAlt = chakra(FaUserAlt);
    const CFaLock = chakra(FaLock);
    const [showPassword, setShowPassword] = useState(false);

    const handleShowClick = () => setShowPassword(!showPassword);

    return (
        // <Box paddingY={'150px'} backgroundColor={'#c8d8e5'} height={'100vh'} width={'100%'}>
        //     <Flex justify={'center'} height={"50vh"} align={'center'} width={'100%'} columnGap={"20px"}
        //           direction={'row'}>
        //         <Box p={"5px"} ml={'20px'} borderColor={'Black'} borderStyle={'solid'} borderWidth={'2px'}
        //              borderRadius={'5px'}
        //              justifyContent={'center'} alignItems={'center'} height={'100%'} width={'100%'} display={"flex"}
        //              flex={0.6}>
        //             <Text align={'center'}>What is Lorem Ipsum?
        //                 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
        //                 the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
        //                 of type and scrambled it to make a type specimen book. It has survived not only five centuries,
        //                 but also the leap into electronic typesetting, remaining essentially unchanged. It was
        //                 popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
        //                 and more recently with desktop publishing software like Aldus PageMaker including versions of
        //                 Lorem Ipsum</Text>
        //         </Box>
        //         <Box paddingTop={'20px'} padding={'10px'} height={'100%'} width={'100%'} flex={0.4}>
        //             <Stack paddingX={'55px'} justifyContent={'center'} paddingTop={'60px'} spacing={3}>
        //                 <Stack>
        //                     <Text mb="8px">User Name</Text>
        //                     <Input name={'username'} onChange={valueChangeHandler} size="sm"/>
        //                 </Stack>
        //                 <Stack>
        //                     <Text mb="8px">Password</Text>
        //                     <Input name={'password'} onChange={valueChangeHandler} size="sm" type={'password'}/>
        //                 </Stack>
        //                 <Flex justifyContent={'right'} gap={1} direction={'row'}>
        //                     <Button leftIcon={<FcGoogle/>} colorScheme="teal" size="sm" onClick={
        //                         () => {
        //                             signUpwithGoogle()
        //                         }
        //                     }>
        //                         Sign Up with Google
        //                     </Button>
        //                     <Button width={'65px'} colorScheme="teal" size="sm" onClick={() => navigate('/signup')}>
        //                         Sign Up
        //                     </Button>
        //                     <Button width={'65px'} colorScheme="teal" size="sm" onClick={loginHandler}>
        //                         Log In
        //                     </Button>
        //                 </Flex>
        //             </Stack>
        //             {/*<Flex justifyContent={'center'} alignItems={'center'}flex={0.5}>*/}
        //             {/*    <Text>Username</Text>*/}
        //             {/*</Flex>*/}
        //             {/*<Flex justifyContent={'center'} alignItems={'center'} flex={0.5}>*/}
        //             {/*    */}
        //             {/*</Flex>*/}
        //         </Box>
        //     </Flex>
        // </Box>

        <Flex
            bg={useColorModeValue('white', 'gray.900')}
            flexDirection="column"
            width="100wh"
            height="100vh"

            justifyContent="center"
            alignItems="center"
        >
            <Stack
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center"
            >
                <Avatar bg="teal.500"/>
                <Heading color="teal.400">Welcome</Heading>
                <Box minW={{base: "90%", md: "468px"}} bg={useColorModeValue('white', 'gray.900')}>

                    <Stack
                        spacing={4}
                        p="1rem"
                        boxShadow="md"
                        bg={useColorModeValue('white', 'gray.900')}
                    >
                        <FormControl>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={<CFaUserAlt color="gray.300"/>}
                                />
                                <Input type="email" placeholder="email address" name={'username'}
                                       onChange={valueChangeHandler}/>
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    color="gray.300"
                                    children={<CFaLock color="gray.300"/>}
                                />

                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    name={'password'}
                                    onChange={valueChangeHandler}
                                />
                                <InputRightElement width="4.5rem">
                                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                                        {showPassword ? "Hide" : "Show"}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <FormHelperText textAlign="right">
                                <Link>forgot password?</Link>
                            </FormHelperText>
                        </FormControl>
                        <Button
                            isLoading={isLoading}
                            borderRadius={0}
                            type="submit"
                            variant="solid"
                            colorScheme={useColorModeValue('teal', 'teal')}
                            width="full"
                            onClick={loginHandler}
                        >
                            Login
                        </Button>
                        <Button leftIcon={<FcGoogle/>} colorScheme="teal" size="sm" onClick={
                            () => {
                                signUpwithGoogle()
                            }
                        }>
                            Sign Up with Google
                        </Button>
                    </Stack>
                </Box>
            </Stack>
            <Box>
                New to us?{" "}
                <Link color="teal.500" onClick={() => navigate('/signup')}>
                    Sign Up
                </Link>
            </Box>
        </Flex>
    );
};

export default Login;