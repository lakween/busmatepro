import Card from "../../../common/card/card.component";
import { Box, Flex, Select, Text, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getAllDocuments } from "../../../../actions/user.actions";
import MapComponent from "../../../common/map/map.component";
import { useDispatch } from "react-redux";
import { getBusLocations, getHoltLocations } from "../../../../actions/home.action";
import firebase from "firebase/compat/app";
import Loading from "../../../common/loading/loading";
import { getDocFromCollection } from "../../../../actions/common.action";

const Home = () => {
    let dispatch = useDispatch()
    const db = firebase.firestore();
    const [routes, setRoutes] = useState([])
    let [selectedRoute, setSelectedRoute] = useState()
    const [loading, setLoading] = useState(false)
    const [busDetails, setBusDetails] = useState([])
    const [holtLocations, setHoltLocations] = useState([])

    const onChnageHandler = async (event) => {
        setSelectedRoute(event.target.value)
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (selectedRoute) {
            getLocations()
        }
    }, [selectedRoute])

    async function getData() {
        let data = await dispatch(getAllDocuments("busRoutes"))
        let array = []
        for (let route of data) {
            let end = (await (getDocFromCollection('busHolts', route?.end)))?.holt_name
            let start = (await (getDocFromCollection('busHolts', route?.start)))?.holt_name
            array.push({ ...route, start: start, end: end })
        }
        setRoutes(array || [])
    }

    async function getLocations() {
        setLoading(true)
        try {
            let result = await getHoltLocations(routes, selectedRoute)
            let busDetails = await getBusLocations(routes, selectedRoute)
            // ref.current = ref.current
            setHoltLocations([...result])
            setBusDetails([...busDetails])
            setLoading(false)
        } catch (e) {
            setLoading(false)
        }
    }

    return (
        <>
            <Box display={"flex"} borderColor={useColorModeValue('gray.200', 'gray.700')} flexDirection={"column"}
                gap={5} padding={10} width={'80%'} justify={"center"}
                align={"center"} bg={useColorModeValue('gray.100', 'gray.900')}>
                <Card bg={useColorModeValue('gray.100', 'gray.900')}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}>
                    <Flex bg={useColorModeValue('gray.100', 'gray.900')}
                        borderColor={useColorModeValue('gray.200', 'gray.700')} justify={"center"} align={"center"}>
                        <Text fontWeight={1} textAlign={"center"}>
                            Start your journey today
                        </Text>
                    </Flex>
                </Card>
                <Card>
                    <Flex bg={useColorModeValue('gray.100', 'gray.900')} direction={"row"} gap={5} justify={"center"}
                        align={"center"}>

                        <Select name={"start"} icon={''} onChange={onChnageHandler} placeholder='Start' size={'sm'}>
                            {
                                routes?.map((route, index) => (
                                    <option key={index} value={route.id}>{route.start + " To " + route.end}</option>))
                            }
                        </Select>
                    </Flex>
                </Card>
                <Card minHeight={"65vh"}>
                    {loading ?
                        <Loading style={{
                            minHeight: "65vh",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }} /> : <MapComponent locations={holtLocations} busDetails={busDetails} />
                    }
                </Card>
            </Box>
        </>
    )
}

export default Home