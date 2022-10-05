import {Button, color, Select, Textarea, useToast} from "@chakra-ui/react";
import {getAuth} from "firebase/auth";
import {Rating} from "@mui/material";
import * as React from 'react';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import {useEffect, useState} from "react";
import {
    createDocOfCollection,
    filterDocsFromCollection,
    getAllDocFromCollection,
    getDocFromCollection,
    updateDocument
} from "../../../../actions/common.action";
import useFormController from "../../../../hooks/useFormController";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'

const RatingsFeedback = () => {

    const [refetch, setRefetch] = useState(false);
    const [busList, setBusList] = useState([]);
    const [selectedBus, setSelectedBus] = useState();
    const [busRouteName, setBusRouteName] = useState();
    const [previous, setPrevious] = useState({});
    const [allFeedbacks, setAllFeedbacks] = useState([]);
    let [valueChangeHandler, setValue, form, setForm] = useFormController({})
    const toast = useToast()
    const {currentUser} = getAuth()

    useEffect(() => {
        getbuslist()
        getAllFeedbacks()
    }, [refetch])

    const onChangeBusSelection = async (e) => {
        setForm({})
        let result = await getDocFromCollection('bus routs', 'SZFDerpHXuK1VWEP3rZZ')
        let previousReatings = await getPreviousReatings(e?.target?.value)
        setBusRouteName(result?.name)
        setSelectedBus(e?.target?.value)
    }

    const getPreviousReatings = async (busID) => {

        let result = await filterDocsFromCollection('bus review', '', [['bus_id', '==', busID], ['user_id', '==', currentUser?.uid]])
        if (result.length > 0) {
            setPrevious(result[0])
            setForm({...result[0]})
        }
    }

    const getAllFeedbacks = async () => {

        let result = await filterDocsFromCollection('bus review', '', [['user_id', '==', currentUser?.uid]])
        if (result.length > 0) {
            setAllFeedbacks(result)
        }
    }

    async function getbuslist() {
        let result = await getAllDocFromCollection('bus')
        setBusList(result)
    }

    async function onSaveHandler() {
        let data = {
            bus_id: selectedBus,
            user_id: currentUser?.uid,
            ...form
        }
        if (data?.id) {
            await updateDocument('bus review', data.id, data)
            toast({
                title: 'Saved',
                // description:,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        } else {
            let result = await createDocOfCollection('bus review', data)
            if (result)
                toast({
                    title: 'Saved',
                    // description:,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
        }

    }

    return (
        <>
            <div className="flex-row">
                <div>
                    Give rate and FeedBack
                </div>
                <div className={'flex-row mt-2'}>
                    <div style={{width: '20vw'}}>
                        <Select onChange={onChangeBusSelection} placeholder='Select a bus'>
                            {busList.map((item, index) => (
                                <option key={index} value={item?.id}>{item?.bus_no}</option>
                            ))}
                        </Select>
                    </div>
                    {
                        selectedBus && (
                            <div className={'row mt-2 border-1 border-light'}>
                                <div className={'col-2'}>
                                    <div className={'row'}>
                                        <text>Bus NO:</text>
                                    </div>
                                    <div className={'row'}>
                                        <text>{busList?.filter((item) => (item.id == selectedBus))[0]?.bus_no}</text>
                                    </div>
                                </div>
                                <div className={'col-2'}>
                                    <div className={'row'}>
                                        <text>Route:</text>
                                    </div>
                                    <div className={'row'}>
                                        <text>
                                            {busRouteName}
                                        </text>
                                    </div>
                                </div>
                                <div className={'col-4'}>
                                    <RatingStar setForm={setForm} form={form}/>
                                </div>
                                <div className={'col-4'}>
                                    <Textarea name={'comment'} value={form["comment"]} onChange={valueChangeHandler}
                                              placeholder='Yours feedBack'/>
                                </div>
                                <div className={'row'}>
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
                                </Tr>
                            </Thead>
                            <Tbody>
                                {allFeedbacks.map((item, index) => (
                                    <Tr key={index}>
                                        <Td><BusNoCell busId={item?.bus_id}/></Td>
                                        <Td><RouteCell busId={item?.bus_id} /></Td>
                                        <Td>{item?.rate}</Td>
                                        <Td>{item?.comment}</Td>
                                    </Tr>
                                ))
                                }
                            </Tbody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </>
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
        let secondResult = await getDocFromCollection('bus routs', result?.route_id)
        setBusDetails(secondResult?.name)
    }
    return (
        <>{busDetails}</>
    )
}


export default RatingsFeedback