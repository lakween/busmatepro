import {Box, Button, Container, Flex, FormControl, FormHelperText, FormLabel, Input, Text} from '@chakra-ui/react'
import React from "react";
import Card from "../../../common/card/card.component";
import {useComState} from "../../../../hooks/useComState";
import {useSelector} from "react-redux";
import useFormController from "../../../../hooks/useFormController";

const SignUp = ( getNames) => {
    let {email,displayName} = useSelector((store) => (store.firebase.auth))
    let [valueChangeHandler,setValue,form,setForm] = useFormController({email:email , ...getNames()})

     function getNames () {
        const [first_name,last_name] =  displayName.split(" ");
        return {first_name:first_name,last_name:last_name}
    }

    const signUpHandler = () => {
        console.log(form)
    }

    return (
        <Container padding={5} maxW='70%' bg={'#AAAAAA'}>
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
                            <FormLabel>Address</FormLabel>
                            <Input onChange={valueChangeHandler} name='address' type='text'/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input  onChange={valueChangeHandler} value={form.email} name='email' type='email'/>
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
                            <FormLabel>Tel: NO</FormLabel>
                            <Input onChange={valueChangeHandler} name='mobile_number' type='email'/>
                        </FormControl>
                    </Box>
                </Flex>
                <Flex justifyContent={'right'} mt={3} columnGap={'20px'} direction={'row'}>
                    <Button onClick={signUpHandler} width={'100px'} colorScheme="teal" size="sm">
                        Sign Up
                    </Button>
                </Flex>
            </Card>
        </Container>
    )
}

export default SignUp