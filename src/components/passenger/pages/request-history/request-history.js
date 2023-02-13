import {getAuth} from "firebase/auth";
import {Box, Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useToast} from '@chakra-ui/react'
import {useEffect, useState} from "react";
import {
    deleteDocument,
    filterDocsFromCollection, filterDocsFromCollectionRT,
    getDocFromCollection,
    updateFieldsOnly
} from "../../../../actions/common.action";

const RequestHistory = (theme) => {
    const [requests, setRequest] = useState([])
    const {currentUser} = getAuth()
    const toast = useToast()

    useEffect(() => {
        if (currentUser) {
            getData()
        }
    }, [currentUser])

    console.log('bb',requests)

    const getData =  () => {
        filterDocsFromCollectionRT('user requests', '', [['user_id', '==', currentUser?.uid]],(data)=>{
            setRequest([...data])
        })
    }

    const cancelHandler = async (id) => {
        await updateFieldsOnly('user requests', id, {status: 'Cancelled'})
        toast({
            title: 'Cancelled',
            // description:,
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
    }

    const deleteHandler = async (id) => {
        await deleteDocument("user requests", id);
        toast({
            title: 'Deleted',
            // description:,
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
    }

    const CustomTdGroup = ({busID, pickUpHolt}) => {
        const [state, setState] = useState({})

        useEffect(() => {
            getBusDetails()
        }, [])

        const getBusDetails = async () => {
            let result = await getDocFromCollection('bus', busID)
            let routeName = await getDocFromCollection('bus routs', result?.route_id)
            let pickUpHoltDetails = await getDocFromCollection('bus holts', pickUpHolt)
            setState({...result, routeName: routeName?.name, pickUpHoltName: pickUpHoltDetails?.holt_name})
        }

        return (
            <>
                <Td>{state?.bus_no}</Td>
                <Td>{state?.routeName}</Td>
                <Td>{state?.pickUpHoltName}</Td>
            </>
        )
    }

    return (
        <>
            <Box mt={10} maxH={'100vh'}>
                <TableContainer>
                    <Table size='sm'>
                        <Thead>
                            <Tr>
                                <Th>Bus No</Th>
                                <Th>Route</Th>
                                <Th>PickUp Holt</Th>
                                <Th>Status</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {requests.map((item) => (
                                <Tr>
                                    <CustomTdGroup busID={item?.bus_id} pickUpHolt={item?.pickUp_holt}/>
                                    <Td>{item?.status}</Td>
                                    <Td><Button onClick={() => cancelHandler(item?.id)} className={'me-2'}
                                                colorScheme='teal' size='xs'>
                                        Cancel
                                    </Button>
                                        <Button onClick={() => deleteHandler(item?.id)} colorScheme='teal' size='xs'>
                                            delete
                                        </Button></Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </>

    )
}

export default RequestHistory