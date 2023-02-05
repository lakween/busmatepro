import {useEffect, useMemo, useRef, useState} from "react";
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
import {createDocOfCollection, filterDocsFromCollection, getDocFromCollection} from "../../../actions/common.action";
import {getHoltsByRoute} from "../../../actions/home.action";
import useFormController from "../../../hooks/useFormController";
import firebase from "firebase/compat/app";
import passengerNotificationFactory from "../../common/notifications/notification-factory";

const SendRequestModal = () => {

    const poperties = useSelector((state) => (state?.modalSlice.sendRequestModel))
    let authData = useSelector((store) => (store?.firebase.auth))
    const [holtList, setHoltList] = useState([])
    let [valueChangeHandler, setValue, form, setForm] = useFormController()
    let dispatch = useDispatch()

    useEffect(() => {
        if (poperties.isOpen) {
            getHoltList()
            let a  = new passengerNotificationFactory()
        }
    }, [poperties.isOpen])

    async function getHoltList() {
        let data = await getHoltsByRoute('bus routs', poperties.data.selectedRoute)
        setHoltList(data)
    }

    async function sendRequest() {
        const db = firebase.firestore();
        let data = {
            ...form,
            user_id: authData.uid,
            bus_id: poperties.data.bus_id,
            status: 'waiting',
        }
        let result = await createDocOfCollection('user requests', data)
        dispatch(setModalPoperty({model: 'sendRequestModel', poperty: 'isOpen', value: false}))
    }

    const RatingAndFeedBackCell = ({busId}) => {
        const [rateAndFeedBack, SetRateAndFeedback] = useState([{rate: 0}])

        console.log(busId, 'busid')

        useMemo(() => {
            if (busId) {
                getBusRatingAndFeedBack()
            }
        }, [])

        async function getBusRatingAndFeedBack() {
            let result = await filterDocsFromCollection('bus review', '', [['bus_id', '==', busId]])
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