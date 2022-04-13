import {useFirebase} from "react-redux-firebase";
import {Box, Button, Container, Flex, Input, Stack, Text} from '@chakra-ui/react'
import {FcGoogle} from "react-icons/fc";
import {useSelector} from "react-redux";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import firebase from "firebase/compat/app";
import {googleSignUp} from "../../../services/user.service";
import {useState} from "react";

const Login = () => {

    let navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    //const firebase = useFirebase()
    //const auth = useSelector(state => state.firebase.auth);
    //console.log(auth, 'auth')

    function signUpwithGoogle() {
        setIsLoading(true)
        let res = googleSignUp()

    }

    return (
        <Box paddingY={'150px'} backgroundColor={'#c8d8e5'} height={'100vh'} width={'100%'}>
            <Flex justify={'center'} height={"50vh"} align={'center'} width={'100%'} columnGap={"20px"}
                  direction={'row'}>
                <Box p={"5px"} ml={'20px'} borderColor={'Black'} borderStyle={'solid'} borderWidth={'2px'}
                     borderRadius={'5px'}
                     justifyContent={'center'} alignItems={'center'} height={'100%'} width={'100%'} display={"flex"}
                     flex={0.6}>
                    <Text align={'center'}>What is Lorem Ipsum?
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                        of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                        but also the leap into electronic typesetting, remaining essentially unchanged. It was
                        popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                        and more recently with desktop publishing software like Aldus PageMaker including versions of
                        Lorem Ipsum</Text>
                </Box>
                <Box paddingTop={'20px'} padding={'10px'} height={'100%'} width={'100%'} flex={0.4}>
                    <Stack paddingX={'55px'} justifyContent={'center'} paddingTop={'60px'} spacing={3}>
                        <Stack>
                            <Text mb="8px">User Name</Text>
                            <Input size="sm" placeholder="large size"/>
                        </Stack>
                        <Stack>
                            <Text mb="8px">Password</Text>
                            <Input size="sm" placeholder="large size"/>
                        </Stack>
                        <Flex justifyContent={'right'} columnGap={'20px'} direction={'row'}>
                            <Button leftIcon={<FcGoogle/>} colorScheme="teal" size="sm" onClick={
                                () => {
                                    signUpwithGoogle()
                                }
                            }>
                                Sign Up with Google
                            </Button>
                            <Button width={'65px'} colorScheme="teal" size="sm" onClick={() => navigate('/signup')}>
                                Sign Up
                            </Button>
                            <Button width={'65px'} colorScheme="teal" size="sm" onClick={() => navigate('/passenger')}>
                                Log In
                            </Button>
                        </Flex>
                    </Stack>
                    {/*<Flex justifyContent={'center'} alignItems={'center'}flex={0.5}>*/}
                    {/*    <Text>Username</Text>*/}
                    {/*</Flex>*/}
                    {/*<Flex justifyContent={'center'} alignItems={'center'} flex={0.5}>*/}
                    {/*    */}
                    {/*</Flex>*/}
                </Box>
            </Flex>
        </Box>
    );
};

export default Login;