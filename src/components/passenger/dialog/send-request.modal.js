import {useEffect, useMemo, useState} from "react";
import {
    Button,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Text,
    useToast,
} from '@chakra-ui/react'
import {useDispatch, useSelector} from "react-redux";
import {setModalPoperty} from "../../../store/reducers/modal-slice";
import {createDocOfCollection, filterDocsFromCollection, getDocFromCollection} from "../../../actions/common.action";
import {getHoltsByRoute} from "../../../actions/home.action";
import useFormController from "../../../hooks/useFormController";
import passengerNotificationFactory from "../../common/notifications/notification-factory";

const SendRequestModal = () => {

    const toast = useToast()
    let dispatch = useDispatch()
    const [holtList, setHoltList] = useState([])
    let [valueChangeHandler, setValue, form, setForm] = useFormController()
    let authData = useSelector((store) => (store?.firebase.auth))
    const poperties = useSelector((state) => (state?.modalSlice.sendRequestModel))

    useEffect(() => {
        if (poperties.isOpen) {
            getHoltList()
            let a = new passengerNotificationFactory()
        }
    }, [poperties.isOpen])

    async function getHoltList() {
        let data = await getHoltsByRoute('busRouts', poperties.data.selectedRoute)
        setHoltList(data)
    }

    async function sendRequest() {
        let result = await checkRequestAvailability()

        if (result) executeRequest()
        else {
            dispatch(setModalPoperty({model: 'sendRequestModel', poperty: 'isOpen', value: false}))
            toast({
                title: 'Please cansel the waiting request',
                status: 'warning',
                duration: 9000,
                isClosable: true,
            })
        }
    }

    const executeRequest = async () => {
        let data = {
            ...form,
            user_id: authData.uid,
            bus_id: poperties.data.bus_id,
            status: 'waiting',
        }
        let result = await createDocOfCollection('userRequests', data)
        dispatch(setModalPoperty({model: 'sendRequestModel', poperty: 'isOpen', value: false}))

        toast({
            title: 'Request sent',
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
    }

    const checkRequestAvailability = async () => {
        let result = await filterDocsFromCollection('userRequests', '', [["status", '==', "waiting"],["user_id", "==", authData.uid]])
        if (result?.length > 0) return false
        else return true
    }

    const RatingAndFeedBackCell = ({busId}) => {
        const [rateAndFeedBack, SetRateAndFeedback] = useState([{rate: 0}])

        useMemo(() => {
            if (busId) {
                getBusRatingAndFeedBack()
            }
        }, [])

        async function getBusRatingAndFeedBack() {
            let result = await filterDocsFromCollection('busReview', '', [['bus_id', '==', busId]])
            let FeedbacksWithUsers = []
            for (let line of result) {
                let userName = await getDocFromCollection('userProfile', line?.user_id)
                FeedbacksWithUsers.push({...line, user_name: userName?.first_name + ' ' + userName?.last_name})
            }
            SetRateAndFeedback(FeedbacksWithUsers)
        }

        return (
            <>
                <Flex direction={'row'} justifyContent={"space-between"}>
                    <Text>
                        Rating
                    </Text>
                    <Text>
                        {((rateAndFeedBack?.reduce((prev, item) => (item?.rate + prev), 0)) / rateAndFeedBack?.length) || 0} stars
                    </Text>
                </Flex>
                <div>
                    <Text align={'center'} fontSize='md' color='tomato'>FeedBacks</Text>
                    <div justifyContent={'space-between'}>
                        {
                            rateAndFeedBack?.map((item, index) => (
                                    <Flex justifyContent={'space-between'} key={index}>
                                        <Text>{item?.user_name}</Text>
                                        <Text>{item?.comment}</Text>
                                    </Flex>
                                )
                            )
                        }

                    </div>
                </div>

            </>
        )
    }

    const MemorizeRatingAndFeedBackCell = useMemo(() => (RatingAndFeedBackCell), [])


    return (
        <>
            <Modal
                isOpen={poperties.isOpen}
                onClose={() => {
                    dispatch(setModalPoperty({model: 'sendRequestModel', poperty: 'isOpen', value: false}))
                }}
            >
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Send Pickup Request</ModalHeader>
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
                            <Select onChange={valueChangeHandler} name={"pickUp_holt"} icon={''} placeholder='Start'
                                    size={'sm'} width={'150px'}>
                                {
                                    holtList?.map((holt, index) => (
                                        <option key={index} value={holt.holt_id}>{holt.holt_name}</option>))
                                }
                            </Select>
                        </Flex>
                        <MemorizeRatingAndFeedBackCell busId={poperties?.data?.bus_id}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => {
                            sendRequest()
                        }}>
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