import {Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useToast} from "@chakra-ui/react";
import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import {filterDocsFromCollectionRT, getDocFromCollection} from "../../../../../actions/common.action";
import useUserLoginInfo from "../../../../../hooks/useLoginInfor";
import {rebuildUserFeedBack} from "../../../../../actions/driver.action";
import Loading from "../../../../common/loading/loading";

const RatingsFeedback = () => {

    const [allFeedbacks, setAllFeedbacks] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    let userDetails = useUserLoginInfo()
    const toast = useToast()

    useEffect(() => {
        getFeedBackAndReatings()
    }, [userDetails])

    async function getFeedBackAndReatings() {
        setIsLoading(true)
        let {busId} = await getDocFromCollection('driverByBus', userDetails?.id)
        filterDocsFromCollectionRT('bus review', '', [['bus_id', '==', busId]], callBackForRealtime)
    }

    async function callBackForRealtime(userRequests) {
        let rebuiltFeedbacks = await rebuildUserFeedBack(userRequests)
        setAllFeedbacks(rebuiltFeedbacks?.length > 0 ? rebuiltFeedbacks : [])
        setIsLoading(false)
    }


    return (
        <>
            <div className={'flex mt-3 w-full bg-amber-50 border border-sky-400 flex-row bg-white'}>
                <div className={'text-center pt-4 font-bold'}>
                    Waiting Request List
                </div>

                <div className="flex overflow-x-auto shadow-md sm:rounded-lg w-full">
                    <Box className={'w-full relative'} mt={10} maxH={'100vh'}>
                        <TableContainer className={'w-full'}>
                            <Table size='sm' className={'w-full '}>
                                <Thead>
                                    <Tr>
                                        <Th>Passenger Name</Th>
                                        <Th>Comment</Th>
                                        <Th>Rate</Th>
                                        <Th>Action</Th>
                                    </Tr>
                                </Thead>


                                {
                                    isLoading ?
                                        <Loading style={{
                                            backgroundColor: 'white',
                                            minHeight: "78vh",
                                            width: '82vw',
                                            display: 'flex',
                                            justifyContent: "center",
                                            alignItems: "center",
                                            position: "absolute",

                                        }}/>
                                        :
                                        <Tbody className={'w-full'}>
                                            {

                                                allFeedbacks?.length > 0 ? allFeedbacks?.map((feedback, index) => (
                                                    <Tr key={index}>
                                                        <Td>{feedback?.userName}</Td>
                                                        <Td>{feedback?.rate}</Td>
                                                        <Td>{feedback?.comment}</Td>
                                                        <Td>
                                                            <Button className={'me-2'} onClick={() => {
                                                                // rejectHandler(request)
                                                            }}
                                                                    colorScheme='teal' size='xs'>
                                                                Reject
                                                            </Button>
                                                            <Button onClick={() => {
                                                                // acceptHandler(request)
                                                            }} colorScheme='teal' size='xs'>
                                                                Accept
                                                            </Button></Td>
                                                    </Tr>
                                                )) : ''
                                            }</Tbody>
                                }
                            </Table>
                            {allFeedbacks?.length == 0 && <div className={'w-full p-2 text-center'}>No Data</div>}
                        </TableContainer>
                    </Box>
                </div>
            </div>
        </>
    )
}
export default RatingsFeedback