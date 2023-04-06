import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Textarea,
    useToast,
} from '@chakra-ui/react';
import useFormController from "../../../../../../hooks/useFormController";
import useUserLoginInfo from "../../../../../../hooks/useLoginInfor";
import {useDispatch, useSelector} from "react-redux";
import {setModalPoperty} from "../../../../../../store/reducers/modal-slice";
import {createDocOfCollection} from "../../../../../../actions/common.action";

const SendReplyModal = () => {

    const toast = useToast()
    let dispatch = useDispatch();
    let userDetails = useUserLoginInfo();
    const poperties = useSelector((state) => (state?.modalSlice.sendReplyMessageModal));
    let [valueChangeHandler, setValue, form, setForm] = useFormController()

    async function sendMessageHandler() {
        createDocOfCollection('messages', {
            ...form,
            to: poperties?.data?.user_id,
            from: userDetails?.id ?? ''
        }).then(() => {
            toast({
                title: 'Message Sent',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        }).catch(() => {
            toast({
                title: 'Something Went Wrong',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }).finally(() => {
            dispatch(setModalPoperty({model: 'sendMessageModal', poperty: 'isOpen', value: false}))
            dispatch(setModalPoperty({model: 'sendMessageModal', poperty: 'data', value: {}}))
        })
    }

    return (
        <>
            <Modal
                isOpen={poperties.isOpen}
                onClose={() => {
                    dispatch(setModalPoperty({model: 'sendReplyMessageModal', poperty: 'isOpen', value: false}))
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
                                <Input type='text' value={poperties?.data?.userName} size={'sm'} disabled/>
                            </FormControl>
                        </div>
                        <div className={'d-flex flex-row gap-2'}>
                            <FormControl>
                                <FormLabel>Message</FormLabel>
                                <Textarea name={'message'} onChange={valueChangeHandler}
                                          placeholder='Here is a sample placeholder'
                                          size='sm'
                                          rows={5}
                                />
                            </FormControl>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={sendMessageHandler}>
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

export default SendReplyModal