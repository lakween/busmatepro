import {Box, Button, Container, Flex, FormControl, FormLabel, Input, useToast} from '@chakra-ui/react'
import React, {useState} from "react";
import Card from "../../../common/card/card.component";
import {useSelector} from "react-redux";
import useFormController from "../../../../hooks/useFormController";
import {createDoc} from "../../../../services/user.service";

const SignUp = (getNames) => {
    const [isLoading, setIsLoading] = useState(false)
    let {email, displayName, uid} = useSelector((store) => (store.firebase.auth))
    let [valueChangeHandler, setValue, form, setForm] = useFormController({
        email: email, ...getNames(),
        reference_doc_id: uid,
       'Document ID':'123584556'
    })
    const toast = useToast()

    function getNames() {
        const [first_name, last_name] = displayName.split(" ");
        return {first_name: first_name, last_name: last_name}
    }

    const updateHandler = async () => {
        setIsLoading(true)
        let res = await createDoc('userProfile',toast,form)
        setIsLoading(false)
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
                            <Input onChange={valueChangeHandler} value={form.email} name='email' type='email'/>
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
                        <FormControl>
                            <FormLabel>Tel: NO</FormLabel>
                            <Input onChange={valueChangeHandler} name='password' type='password'/>
                        </FormControl>
                    </Box>
                </Flex>
                <Flex justifyContent={'right'} mt={3} columnGap={'20px'} direction={'row'}>
                    <Button width={'100px'} colorScheme="teal" size="sm">
                        Skip
                    </Button>
                    <Button isLoading={isLoading} onClick={updateHandler} width={'100px'} colorScheme="teal" size="sm">
                        Update
                    </Button>
                </Flex>
            </Card>
        </Container>
    )
}

export default SignUp