import {getAuth} from "firebase/auth";
import {Box, Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useToast} from '@chakra-ui/react'
import {useEffect, useMemo, useState} from "react";
import {
    deleteDocument, filterDocsFromCollectionRT,
    getDocFromCollection,
    updateFieldsOnly
} from "../../../../actions/common.action";
import firebase from "firebase/compat/app";

const RequestHistory = (theme) => {
    const [requests, setRequest] = useState([])
    const toast = useToast()

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async function (user) {
            if (user) {
                getData(user?.uid)
            } else {
                // navigate('/')
            }
        });
    }, [])

    const getData = (uid) => {
        filterDocsFromCollectionRT('userRequests', '', [['user_id', '==', uid]], (data) => {
            setRequest([...data])
        })
    }

    const cancelHandler = async (id) => {
        await updateFieldsOnly('userRequests', id, {status: 'Cancelled'})
        toast({
            title: 'Cancelled',
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
    }

    const deleteHandler = async (id) => {
        await deleteDocument("userRequests", id);
        toast({
            title: 'Deleted',
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
            let routeName = await getDocFromCollection('busRoutes', result?.route_id)
            let pickUpHoltDetails = await getDocFromCollection('busHolts', pickUpHolt)
            setState({...result, routeName: routeName?.name, pickUpHoltName: pickUpHoltDetails?.holt_name})
        }

        return (
            <>
                <th scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{state?.bus_no}</th>
                <td className="px-6 py-4">{state?.routeName}</td>
                <td className="px-6 py-4">{state?.pickUpHoltName}</td>
            </>
        )
    }

    const MemorizeCustomTdGroup = useMemo(() => (CustomTdGroup), [])

    return (
        <div className={'p-5 h-full'}>
            <div className="relative overflow-x-auto bg-white rounded h-full">
                <table className="w-full max-h-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-teal-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Bus No
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Route
                        </th>
                        <th scope="col" className="px-6 py-3">
                            PickUp Holt
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {requests?.map((item) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <MemorizeCustomTdGroup busID={item?.bus_id} pickUpHolt={item?.pickUp_holt}/>
                            <td className="px-6 py-4">
                                {item?.status}
                            </td>
                            <td className="px-6 py-4">
                                <Button onClick={() => cancelHandler(item?.id)} className={'me-2'}
                                        colorScheme='teal' size='xs'>
                                    Cancel
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RequestHistory
