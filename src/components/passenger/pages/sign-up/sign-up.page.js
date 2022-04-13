import {Box, Container, Flex, FormControl, FormHelperText, FormLabel, Input, Text} from '@chakra-ui/react'
import React from "react";
import Card from "../../../common/card/card.component";

const SignUp = () => {
    return(
        <Container padding={5} maxW='70%' bg={'#AAAAAA'}>
            <Box>
                <Card inSideTitle={'Personal Informations'}>
                    <Flex gap={3} direction={'row'}>
                        <Box width={'100%'}>
                            <FormControl>
                                <FormLabel >First Name</FormLabel>
                                <Input id='first_name' type='text' />
                            </FormControl>
                            <FormControl>
                                <FormLabel >Last Name</FormLabel>
                                <Input id='last_name' type='text' />
                            </FormControl>
                            <FormControl>
                                <FormLabel >Address</FormLabel>
                                <Input id='address' type='text' />
                            </FormControl>
                            <FormControl>
                                <FormLabel >Email</FormLabel>
                                <Input id='email' type='email' />
                            </FormControl>
                        </Box>
                        <Box width={'100%'}>
                            <FormControl>
                                <FormLabel >State</FormLabel>
                                <Input id='state' type='text' />
                            </FormControl>
                            <FormControl>
                                <FormLabel >City</FormLabel>
                                <Input id='city' type='text' />
                            </FormControl>
                            <FormControl>
                                <FormLabel >Tel: NO</FormLabel>
                                <Input id='mobile_number' type='email' />
                            </FormControl>
                        </Box>
                    </Flex>
                </Card>
            </Box>

        </Container>
    )
}

export default SignUp