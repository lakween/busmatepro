import {useEffect, useState} from "react";
import {
    Button,
    Flex, FormControl, FormLabel, Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Text, Textarea,
    useToast,
} from '@chakra-ui/react'
import {useDispatch, useSelector} from "react-redux";
import useFormController from "../../../../../hooks/useFormController";
import {setModalPoperty} from "../../../../../store/reducers/modal-slice";

;

const SendMessageModal = () => {

    const toast = useToast()
    let dispatch = useDispatch()
    let [valueChangeHandler, setValue, form, setForm] = useFormController()
    const poperties = useSelector((state) => (state?.modalSlice.sendMessageModal))

    useEffect(() => {
        if (poperties.isOpen) {

        }
    }, [poperties.isOpen])

    return (
        <>
            <Modal
                isOpen={poperties.isOpen}
                onClose={() => {
                    dispatch(setModalPoperty({model: 'sendMessageModal', poperty: 'isOpen', value: false}))
                }}
            >
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Send Message</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <div className={'d-flex flex-row gap-2'}>
                            <FormControl>
                                <FormLabel>To</FormLabel>
                                <Input type='text' size={'sm'} disabled/>
                            </FormControl>
                        </div>
                        <div className={'d-flex flex-row gap-2'}>
                            <FormControl>
                                <FormLabel>Message</FormLabel>
                                <Textarea
                                    placeholder='Here is a sample placeholder'
                                    size='sm'
                                    rows={5}
                                />
                            </FormControl>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => {
                        }}>
                            Send Message
                        </Button>
                        <Button onClick={() => {
                            dispatch(setModalPoperty({model: 'sendMessageModal', poperty: 'isOpen', value: false}))
                        }}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default SendMessageModal