import {
    Avatar,
    Box,
    Button,
    chakra,
    Flex,
    FormControl,
    FormHelperText,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Link,
    Stack,
    useColorModeValue
} from '@chakra-ui/react'
import {FcGoogle} from "react-icons/fc";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {googleSignUp, login} from "../../../actions/user.actions";
import {useState} from "react";
import useFormController from "../../../hooks/useFormController";
import {FaLock, FaUserAlt} from "react-icons/fa";
import {createDocOfCollectionWithId, getDocFromCollection} from "../../../actions/common.action";
import React from 'react';
import useUserLoginInfo from "../../../hooks/useLoginInfor";
import Loading from "../loading/loading";


const Login = () => {
    let navigate = useNavigate();
    let dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    let [valueChangeHandler, setValue, form, setForm] = useFormController()
    let userDetails = useUserLoginInfo()


    async function signUpwithGoogle() {
        // setIsLoading(true
        let res = await googleSignUp(navigate)
        let document = await getDocFromCollection('userProfile', res?.reference_doc_id)

        if (Object.keys(document).length === 0 && res?.reference_doc_id) {
            let doc = await createDocOfCollectionWithId('userProfile', res?.reference_doc_id, {
                ...res,
                type:'passenger'
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


    let loginMarkup = (
        <Flex
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
                <Box minW={{base: "90%", md: "468px"}} bg={'white'}>

                    <Stack
                        spacing={4}
                        p="1rem"
                        boxShadow="md"
                        bg={'white'}
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
                            colorScheme={'teal'}
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
    )

    if (userDetails?.hasOwnProperty('isLogged')) {
        if (userDetails?.isLogged) navigate('user')
    } else {
        loginMarkup = (
            <Loading style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}/>
        )
    }

    return (
        <div>
            {
                loginMarkup
            }
        </div>
    );
};

export default Login;