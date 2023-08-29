import {Button, Select, Table, TableContainer, Tbody, Td, Textarea, Th, Thead, Tr, useToast} from "@chakra-ui/react";
import Rating from '@mui/material/Rating';
import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import {
    createDocOfCollection,
    deleteDocument,
    filterDocsFromCollection,
    filterDocsFromCollectionRT,
    getAllDocFromCollection,
    getDocFromCollection,
    updateDocument
} from "../../../../actions/common.action";
import useFormController from "../../../../hooks/useFormController";
import firebase from "firebase/compat/app";

const RatingsFeedback = () => {

    const [busList, setBusList] = useState([]);
    const [selectedBus, setSelectedBus] = useState();
    const [busRouteName, setBusRouteName] = useState();
    const [previous, setPrevious] = useState({});
    const [allFeedbacks, setAllFeedbacks] = useState([]);
    let [valueChangeHandler, setValue, form, setForm] = useFormController({})
    const toast = useToast()
    let currentUser = useRef()

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async function (user) {
            if (user) {
                currentUser.current = user?.uid
                getbuslist()
                getAllFeedbacks()
            } else {
                // navigate('/')
            }
        });
    }, [])

    const onChangeBusSelection = async (e) => {
        setForm({})
        let busDetails = await getDocFromCollection('bus', e.target.value)
        let busRouteDeatils = await getDocFromCollection('busRoutes', busDetails?.route_id)
        let previousReatings = await getPreviousReatings(e?.target?.value)
        setBusRouteName(busRouteDeatils?.name)
        setSelectedBus(e?.target?.value)
    }

    const getPreviousReatings = async (busID) => {

        let result = await filterDocsFromCollection('busReview', '', [['bus_id', '==', busID], ['user_id', '==', currentUser?.current]])
        if (result?.length > 0) {
            setPrevious(result[0])
            setForm({...result[0]})
        }
    }

    const getAllFeedbacks = async () => {

        let result = await filterDocsFromCollectionRT('busReview', '', [['user_id', '==', currentUser?.current]], (data) => {
            if (Array.isArray(data)) setAllFeedbacks(data)
            else setAllFeedbacks([])
        })

    }

    async function getbuslist() {
        let result = await getAllDocFromCollection('bus')
        setBusList(result)
    }

    const deleteHandler = async (id) => {
        await deleteDocument("busReview", id);
        toast({
            title: 'Deleted',
            // description:,
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
        // setRefetch(!refetch)
    }

    async function onSaveHandler() {
        let data = {
            bus_id: selectedBus,
            user_id: currentUser?.current,
            ...form
        }
        if (data?.id) {
            await updateDocument('busReview', data.id, data)
            toast({
                title: 'Saved',
                // description:,
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        } else {
            let result = await createDocOfCollection('busReview', data)
            if (result)
                toast({
                    title: 'Saved',
                    // description:,
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
        }
        // setRefetch(!refetch)
    }

    return (
        <div className={'p-5 h-full'}>
            <div className="flex-row bg-white rounded-md h-full p-3 w-full">
                <div>
                    Give rate and FeedBack
                </div>
                <div className={'flex-row w-full mt-2'}>
                    <div style={{width: '20vw'}}>
                        <Select onChange={onChangeBusSelection} placeholder='Select a bus'>
                            {busList.map((item, index) => (
                                <option key={index} value={item?.id}>{item?.bus_no}</option>
                            ))}
                        </Select>
                    </div>
                    {
                        selectedBus && (
                            <div className={'flex flex-col md:flex-row gap-4 w-full mt-2 border-1 border-light'}>
                                <div className={'w-full'}>
                                    <div className={'w-full'}>
                                        <text>Bus NO:</text>
                                    </div>
                                    <div className={'w-full'}>
                                        <text>{busList?.filter((item) => (item.id == selectedBus))[0]?.bus_no}</text>
                                    </div>
                                </div>
                                <div className={'w-full'}>
                                    <div className={'w-full'}>
                                        <text>Route:</text>
                                    </div>
                                    <div className={'w-full'}>
                                        <text>
                                            {busRouteName}
                                        </text>
                                    </div>
                                </div>
                                <div className={'w-full'}>
                                    <RatingStar setForm={setForm} form={form}/>
                                </div>
                                <div className={'w-full'}>
                                    <Textarea name={'comment'} value={form["comment"]} onChange={valueChangeHandler}
                                              placeholder='Yours feedBack'/>
                                </div>
                                <div className={'w-full'}>
                                    <div>
                                        <Button onClick={onSaveHandler} colorScheme='teal' size='sm'>
                                            Save
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className={'my-3'}>
                    <div> Your Ratings And feedbacks</div>
                    <TableContainer className={'mt-2'}>
                        <Table size='sm'>
                            <Thead>
                                <Tr>
                                    <Th>Bus No</Th>
                                    <Th>Route</Th>
                                    <Th>Stars</Th>
                                    <Th>feedbacks</Th>
                                    <Th>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {allFeedbacks.map((item, index) => (
                                    <Tr key={index}>
                                        <Td><BusNoCell busId={item?.bus_id}/></Td>
                                        <Td><RouteCell busId={item?.bus_id}/></Td>
                                        <Td>{item?.rate}</Td>
                                        <Td>{item?.comment}</Td>
                                        <Td>
                                            <Button onClick={() => deleteHandler(item?.id)} colorScheme='teal'
                                                    size='xs'>
                                                delete
                                            </Button></Td>
                                    </Tr>
                                ))
                                }
                            </Tbody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    )
}

const RatingStar = ({setForm, form}) => {
    const [value, setValue] = useState(2);
    const [hover, setHover] = useState(-1);

    const labels = {
        1: 'Useless',
        2: 'Poor',
        3: 'Ok',
        4: 'Good',
        5: 'Excellent',
    };

    function getLabelText(value) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }

    return (
        <>
            <Rating
                name="simple-controlled"
                value={form["rate"]}
                // precision={0.5}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                    setForm({...form, rate: newValue});
                }}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
                emptyIcon={<StarIcon style={{opacity: 0.55}} fontSize="inherit"/>}
            />
            {value !== null && (
                <Box sx={{ml: 2}}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
        </>
    )
}

const BusNoCell = ({busId}) => {
    const [busDetails, setBusDetails] = useState()

    useEffect(() => {
        getBusNo()

    }, [busId])

    async function getBusNo() {
        let result = await getDocFromCollection('bus', busId)
        setBusDetails(result?.bus_no)
    }

    return (
        <>{busDetails}</>
    )
}

const RouteCell = ({busId}) => {
    const [busDetails, setBusDetails] = useState()

    useEffect(() => {
        getRoute()

    }, [busId])

    async function getRoute() {
        let result = await getDocFromCollection('bus', busId)
        let secondResult = await getDocFromCollection('busRoutes', result?.route_id)
        setBusDetails(secondResult?.name)
    }

    return (
        <>{busDetails}</>
    )
}


export default RatingsFeedback