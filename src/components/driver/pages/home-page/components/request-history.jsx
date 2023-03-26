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

const RequestHistory = () => {
    const [requestList, setRequestList] = useState()
    const toast = useToast()
    const [isLoading, setIsLoading] = useState(false)
    let userDetails = useUserLoginInfo()

    useEffect(() => {
        getUserRequest()
    }, [userDetails])

    async function callBackForRealtime(userRequests) {
        let rebuildedUserRequests = await rebuildUserRequsets(userRequests)
        setRequestList(rebuildedUserRequests.length > 0 ? rebuildedUserRequests : [])
        setIsLoading(false)
    }

    async function getUserRequest() {
        setIsLoading(true)
        let {busId} = await getDocFromCollection('driverByBus', userDetails?.id)
        filterDocsFromCollectionRT('user requests', '', [['bus_id', '==', busId], ['status', '==', 'waiting']], callBackForRealtime)
    }

    async function rejectHandler(rowData) {
        try {
            await updateFieldsOnly('user requests', rowData?.id, {status: 'Cancelled'})
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
        <div className={'flex w-full bg-amber-50 border border-sky-400 flex-row bg-white'}>
            <div className={'text-center'}>
                Request List
            </div>

            <div className="flex overflow-x-auto shadow-md sm:rounded-lg w-full">
                <Box className={'w-full relative'} mt={10} maxH={'100vh'}>
                    <TableContainer className={'w-full'}>
                        <Table size='sm' className={'w-full '}>
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
                                        minHeight: "78vh",
                                        width:'82vw',
                                        display:'flex',
                                        justifyContent: "center",
                                        alignItems: "center",
                                        position: "absolute",

                                    }}/>
                                    :
                                    <Tbody className={'w-full'}>
                                        {
                                            requestList?.map((request, index) => (
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
                                                        <Button colorScheme='teal' size='xs'>
                                                            Accept
                                                        </Button></Td>
                                                </Tr>
                                            ))
                                        }</Tbody>
                            }

                        </Table>
                    </TableContainer>
                </Box>
            </div>
        </div>
    )
}

export default RequestHistory