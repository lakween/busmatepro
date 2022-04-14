import {Box, Button, Container, Flex, FormControl, FormLabel, Input, useToast} from '@chakra-ui/react'
import React, {useState} from "react";
import Card from "../../../common/card/card.component";
import {useSelector} from "react-redux";
import useFormController from "../../../../hooks/useFormController";
import {createDoc, emailAndPasswordAuth, signOut} from "../../../../services/user.service";
import {useNavigate} from "react-router-dom";

const SignUp = (getNames) => {
    const [isLoading, setIsLoading] = useState(false)
    let navigate = useNavigate();
    let {email, displayName, uid} = useSelector((store) => (store.firebase.auth))
    let [valueChangeHandler, setValue, form, setForm] = useFormController({
        email: email, ...getNames(),
        reference_doc_id: uid,
    })
    const toast = useToast()

    function getNames() {
        const [first_name, last_name] = displayName? displayName?.split(" "):['',''];
        return {first_name: first_name, last_name: last_name}
    }

    const updateHandler = async () => {
        setIsLoading(true)
        let res = await createDoc('userProfile', toast, navigate("/passenger"), form)
        setIsLoading(false)
    }

    const signUpHandler = async () => {
        let res = await emailAndPasswordAuth(form.email,form.password,toast)
        let result = res ? await createDoc('userProfile', toast, navigate("/passenger"), form) : null
    }

    const signedButtonMarkup = (
        <Flex justifyContent={'right'} mt={3} columnGap={'20px'} direction={'row'}>
            <Button onClick={async () => { await signOut()
                navigate("/passenger")
            }} width={'100px'} colorScheme="teal" size="sm">
                Skip
            </Button>
            <Button isLoading={isLoading} onClick={updateHandler} width={'100px'} colorScheme="teal" size="sm">
                Update
            </Button>
        </Flex>
    )
    const notSignedButtonMarkup = (
        <Flex justifyContent={'right'} mt={3} columnGap={'20px'} direction={'row'}>
            <Button isLoading={isLoading} onClick={signUpHandler} width={'100px'} colorScheme="teal" size="sm">
                SignUp
            </Button>
        </Flex>
    )

    return (
        <Container display={'flex'} justifyContent={"center"} height={'100vh'} centerContent padding={5} maxW='70%' backgroundColor={'#c8d8e5'}>
            <Card inSideTitle={'Personal Informations'}>
                <Flex gap={3} direction={'row'}>
                    <Box width={'100%'}>
                        <FormControl>
                            <FormLabel>First Name</FormLabel>
                            <Input value={form.first_name} onChange={valueChangeHandler} name='first_name' type='text'/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Last Name</FormLabel>
                            <Input onChange={valueChangeHandler} value={form.last_name} name='last_name' type='text'/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input onChange={valueChangeHandler} value={form.email} name='email' type='email'/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Input onChange={valueChangeHandler} name='password' type='password'/>
                        </FormControl>
                    </Box>
                    <Box width={'100%'}>
                        <FormControl>
                            <FormLabel>State</FormLabel>
                            <Input onChange={valueChangeHandler} name='state' type='text'/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>City</FormLabel>
                            <Input onChange={valueChangeHandler} name='city' type='text'/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Address</FormLabel>
                            <Input onChange={valueChangeHandler} name='address' type='text'/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Tel: NO</FormLabel>
                            <Input onChange={valueChangeHandler} name='mobile_number' type='email'/>
                        </FormControl>
                    </Box>
                </Flex>
                {uid ? signedButtonMarkup : notSignedButtonMarkup}
            </Card>
        </Container>
    )
}

export default SignUp