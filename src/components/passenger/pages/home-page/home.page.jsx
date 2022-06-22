import Card from "../../../common/card/card.component";
import {Box, Flex, Select, Text, useColorModeValue} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {getAllDocuments} from "../../../../actions/user.actions";
import MapComponent from "../../../common/map/map.component";
import {useDispatch, useSelector} from "react-redux";
import {getHoltLocations,getBusLocations} from "../../../../actions/home.action";
import {setModalPoperty} from '../../../../store/reducers/modal-slice'

const Home = () => {
    let dispatch = useDispatch()
    const [routes, setRoutes] = useState([])
    const [holts, setHolts] = useState([])
    const [holtLocations, setHoltLocations] = useState([])
    const [busDetails, setBusDetails] = useState([])

    const onChnageHandler = async (event) => {
       let result = await dispatch(getHoltLocations(routes, event.target.value))
        let busDetails = await dispatch(getBusLocations(routes, event.target.value))
        setHoltLocations([...result])
        setBusDetails([...busDetails])
    }

    useEffect(() => {
        getData()
    }, [])

    async function getData() {
        let data = await dispatch(getAllDocuments("bus routs"))
        setRoutes(data || [])
    }

    return (
        <>
            <Box display={"flex"} borderColor={useColorModeValue('gray.200', 'gray.700')} flexDirection={"column"} gap={5} padding={10} width={'80%'} justify={"center"}
                 align={"center"} bg={useColorModeValue('gray.100', 'gray.900')}>
                <Card bg={useColorModeValue('gray.100', 'gray.900')} borderColor={useColorModeValue('gray.200', 'gray.700')}>
                    <Flex bg={useColorModeValue('gray.100', 'gray.900')} borderColor={useColorModeValue('gray.200', 'gray.700')} justify={"center"} align={"center"} >
                        <Text fontWeight={1} textAlign={"center"}>
                            Start your journey today
                        </Text>
                    </Flex>
                </Card>
                <Card>
                    <Flex bg={useColorModeValue('gray.100', 'gray.900')} direction={"row"} gap={5} justify={"center"} align={"center"}>

                        <Select name={"start"} icon={''} onChange={onChnageHandler} placeholder='Start' size={'sm'}>
                            {
                                routes?.map((route, index) => (
                                    <option key={index} value={route.id}>{route.start + " To " + route.end}</option>))
                            }
                        </Select>

                        {/*{*/}
                        {/*    holts?.map((holt, index) => (*/}
                        {/*        <option key={index} value={holt.id}>{holt.holt_name}</option>))*/}
                        {/*}*/}
                    </Flex>
                </Card>
                <Card minHeight={"65vh"}>
                    <MapComponent locations={holtLocations} busDetails={busDetails}/>
                    {holtLocations.length > 0 ? null : <text>Loading....</text>}
                </Card>
            </Box>
        </>
    )
}

export default Home