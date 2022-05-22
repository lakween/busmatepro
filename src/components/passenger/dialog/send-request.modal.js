import {useEffect, useRef, useState} from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Button, Input, FormLabel, FormControl, useDisclosure, Text, Flex, Select,
} from '@chakra-ui/react'
import {useDispatch, useSelector} from "react-redux";
import {setModalPoperty} from "../../../store/reducers/modal-slice";
import {getDocFromCollection} from "../../../actions/common.action";
import {getHoltsByRoute} from "../../../actions/home.action";

const SendRequestModal = () => {
    const poperties = useSelector((state) => (state.modalSlice.sendRequestModel))
    const [holtList, setHoltList] = useState([])
    let dispatch = useDispatch()
    console.log(holtList,'jjj')

    const initialRef = useRef()
    const finalRef = useRef()

    useEffect(() => {
        getHoltList()
    }, [])

    async function getHoltList(){
        setHoltList( await dispatch(getHoltsByRoute('bus routs', poperties.data.selectedRoute)))
    }

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
                            <Text>{poperties.data.available_seats}</Text>
                        </Flex>
                        <Flex direction={'row'} justifyContent={"space-between"}>
                            <Text>Pick up at</Text>
                            <Select name={"holt"} icon={''}  placeholder='Start' size={'sm'}>
                                {
                                    holtList?.map((holt, index) => (
                                        <option key={index} value={holt.id}>{holt.holt_name}</option>))
                                }
                            </Select>
                        </Flex>

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