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
        if(userDetails?.id){
            let busId = (await getDocFromCollection('driverByBus', userDetails?.id))?.bus_id
            console.log(busId)
        filterDocsFromCollectionRT('busReview', '', [['bus_id', '==', busId]], callBackForRealtime)
        }
    }

    async function callBackForRealtime(userRequests) {
        let rebuiltFeedbacks = await rebuildUserFeedBack(userRequests)
        setAllFeedbacks(rebuiltFeedbacks?.length > 0 ? rebuiltFeedbacks : [])
        setIsLoading(false)
    }

    return (
        <>
            <div className={'mt-3 w-full bg-white'}>
                <div className={'text-center pt-4 font-bold'}>
                    Feedbacks and Ratings
                </div>

                <div className="flex overflow-x-auto shadow-md sm:rounded-lg w-full">
                    <Box className={'w-full relative'} mt={10} maxH={'100vh'}>
                        <TableContainer className={'w-full'}  style={{height:'31vh',overflowY:'auto'}}>
                            <Table size='sm' className={'w-full '}>
                                <Thead>
                                    <Tr>
                                        <Th>Passenger Name</Th>
                                        <Th>Comment</Th>
                                        <Th>Rate</Th>
                                    </Tr>
                                </Thead>


                                {
                                    isLoading ?
                                        <Loading style={{
                                            backgroundColor: 'white',
                                            minHeight: "30vh",
                                            width: '75vw',
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
                                                        <Td>{feedback?.comment}</Td>
                                                        <Td>{feedback?.rate}</Td>
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