import {Box, Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useToast} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {
    filterDocsFromCollection, filterDocsFromCollectionRT,
    getAllDocFromCollection,
    getDocFromCollection, updateDocument, updateFieldsOnly
} from "../../../../../actions/common.action";
import useUserLoginInfo from "../../../../../hooks/useLoginInfor";
import {rebuildUserRequsets} from "../../../../../actions/driver.action";
import Loading from "../../../../common/loading/loading";
import {useDispatch} from "react-redux";
import {setModalPoperty} from "../../../../../store/reducers/modal-slice";

const RequestHistory = () => {
    const [requestList, setRequestList] = useState()
    const toast = useToast()
    const [isLoading, setIsLoading] = useState(false)
    let userDetails = useUserLoginInfo()
    const dispatch = useDispatch()

    useEffect(() => {
        getUserRequest()
    }, [userDetails])

    function sendMessageHandler(rawData) {
        dispatch(setModalPoperty({model: 'sendMessageModal', poperty: 'isOpen', value: true}))
        dispatch(setModalPoperty({model: 'sendMessageModal', poperty: 'data', value: rawData}))
    }

    async function acceptHandler(rowData) {
        try {
            await updateFieldsOnly('userRequests', rowData?.id, {status: 'Accept'})
            toast({
                title: 'Cancelled',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        } catch (e) {
            toast({
                title: 'Failed',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    async function callBackForRealtime(userRequests) {
        let rebuildedUserRequests = await rebuildUserRequsets(userRequests)
        setRequestList(rebuildedUserRequests?.length > 0 ? rebuildedUserRequests : [])
        setIsLoading(false)
    }

    async function getUserRequest() {
        if(userDetails?.id){
            setIsLoading(true)
            let {bus_id} = await getDocFromCollection('driverByBus', userDetails?.id?.trim())
            filterDocsFromCollectionRT('userRequests', '', [['bus_id', '==', bus_id?.trim()], ['status', '==', 'waiting']], callBackForRealtime)
        }
       
    }

    async function rejectHandler(rowData) {
        try {
            await updateFieldsOnly('userRequests', rowData?.id, {status: 'Cancelled'})
            toast({
                title: 'Cancelled',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        } catch (e) {
            toast({
                title: 'Failed',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    return (
        <div className={'w-full bg-white rounded-md border'}>
            <div className={'text-center pt-4 font-bold'}>
                Waiting Request List
            </div>

            <div className="flex overflow-x-auto shadow-md sm:rounded-lg w-full">
                <Box className={'w-full relative'} mt={10} maxH={'100vh'}>
                    <TableContainer className={'w-full'} style={{height: '33vh', overflowY: 'auto'}}>
                        <Table size='sm' className={'w-full'}>
                            <Thead>
                                <Tr>
                                    <Th>Passenger Name</Th>
                                    <Th>Pickup Holt</Th>
                                    <Th>Status</Th>
                                    <Th>Action</Th>
                                </Tr>
                            </Thead>
                            {
                                isLoading ?
                                    <Loading style={{
                                        backgroundColor: 'white',
                                        minHeight: "20vh",
                                        width: '75vw',
                                        display: 'flex',
                                        justifyContent: "center",
                                        alignItems: "center",
                                        position: "absolute",

                                    }}/>
                                    :
                                    <Tbody className={'w-full'}>
                                        {

                                            requestList?.length > 0 ? requestList?.map((request, index) => (
                                                <Tr key={index}>
                                                    <Td>{request?.userName}</Td>
                                                    <Td>{request?.holt_name}</Td>
                                                    <Td>{request?.status}</Td>
                                                    <Td>
                                                        <Button className={'me-2'} onClick={() => {
                                                            rejectHandler(request)
                                                        }}
                                                                colorScheme='teal' size='xs'>
                                                            Reject
                                                        </Button>
                                                        <Button onClick={() => {
                                                            acceptHandler(request)
                                                        }} colorScheme='teal' size='xs'>
                                                            Accept
                                                        </Button>
                                                        <Button className={'ms-2'} onClick={() => {
                                                            sendMessageHandler(request)
                                                        }} colorScheme='teal' size='xs'>
                                                            Send Message
                                                        </Button>
                                                    </Td>
                                                </Tr>
                                            )) : ''
                                        }</Tbody>
                            }

                        </Table>
                        {requestList?.length == 0 && <div className={'w-full p-2 text-center'}>No Data</div>}
                    </TableContainer>
                </Box>
            </div>
        </div>
    )
}

export default RequestHistory