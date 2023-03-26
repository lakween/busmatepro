import {Box, Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {
    filterDocsFromCollection, filterDocsFromCollectionRT,
    getAllDocFromCollection,
    getDocFromCollection
} from "../../../../../actions/common.action";
import useUserLoginInfo from "../../../../../hooks/useLoginInfor";
import {rebuildUserRequsets} from "../../../../../actions/driver.action";
import Loading from "../../../../common/loading/loading";

const RequestHistory = () => {
    const [requestList, setRequestList] = useState()
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

    return (
        <div className={'flex w-full bg-amber-50 border border-sky-400 flex-row bg-white'}>
            <div className={'text-center'}>
                Request List
            </div>

            <div className="flex overflow-x-auto shadow-md sm:rounded-lg w-full">
                <Box mt={10} maxH={'100vh'}>
                    <TableContainer>
                        <Table size='sm'>
                            <Thead>
                                <Tr>
                                    <Th>Passenger Name</Th>
                                    <Th>Pickup Holt</Th>
                                    <Th>Status</Th>
                                    <Th>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    isLoading ? <Loading style={{
                                        minHeight: "65vh",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}/> : requestList?.map((request, index) => (
                                        <Tr>
                                            <Td>{request?.userName}</Td>
                                            <Td>{request?.holt_name}</Td>
                                            <Td>{request?.status}</Td>
                                            <Td>
                                                <Button className={'me-2'}
                                                        colorScheme='teal' size='xs'>
                                                    Reject
                                                </Button>
                                                <Button colorScheme='teal' size='xs'>
                                                    Accept
                                                </Button></Td>
                                        </Tr>
                                    ))
                                }</Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            </div>
        </div>
    )
}

export default RequestHistory