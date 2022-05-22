import {useEffect, useRef, useState} from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Button, Input, FormLabel, FormControl, useDisclosure, Text, Flex,
} from '@chakra-ui/react'
import {useDispatch, useSelector} from "react-redux";
import {setModalPoperty} from "../../../store/reducers/modal-slice";

const SendRequestModal = () => {
    const poperties = useSelector((state) => (state.modalSlice.sendRequestModel))
    let dispatch = useDispatch()
    console.log(poperties)

    const initialRef = useRef()
    const finalRef = useRef()

    return (
        <>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={poperties.isOpen}
                onClose={() => {
                    dispatch(setModalPoperty({model: 'sendRequestModel', poperty: 'isOpen', value: false}))
                }}
            >
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Create your account</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <Flex direction={'row'} justifyContent={"space-between"}>
                            <Text>Bus Number</Text>
                            <Text>{poperties.data.bus_no}</Text>
                        </Flex>
                        <Flex direction={'row'} justifyContent={"space-between"}>
                            <Text>Status</Text>
                            <Text>{poperties.data.available ? 'Available' : 'Not Available'}</Text>
                        </Flex>
                        <Flex direction={'row'} justifyContent={"space-between"}>
                            <Text>Available Seats</Text>
                            <Text>{poperties.data.available_seats }</Text>
                        </Flex>
                        <Text></Text>
                        {/*<FormControl>*/}
                        {/*    <FormLabel>First name</FormLabel>*/}
                        {/*    <Input ref={initialRef} placeholder='First name'/>*/}
                        {/*</FormControl>*/}

                        {/*<FormControl mt={4}>*/}
                        {/*    <FormLabel>Last name</FormLabel>*/}
                        {/*    <Input placeholder='Last name'/>*/}
                        {/*</FormControl>*/}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Send Request
                        </Button>
                        <Button onClick={() => {
                            dispatch(setModalPoperty({model: 'sendRequestModel', poperty: 'isOpen', value: false}))
                        }}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default SendRequestModal