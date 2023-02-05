import Card from "../../../common/card/card.component";
import {Box, Flex, Select, Text, useColorModeValue} from "@chakra-ui/react";
import {useEffect, useRef, useState} from "react";
import {getAllDocuments} from "../../../../actions/user.actions";
import MapComponent from "../../../common/map/map.component";
import {useDispatch, useSelector} from "react-redux";
import {getHoltLocations, getBusLocations} from "../../../../actions/home.action";
import firebase from "firebase/compat/app";
import Loading from "../../../common/loading/loading";

const Home = () => {
    let dispatch = useDispatch()
    const [routes, setRoutes] = useState([])
    const [loading, setLoading] = useState(false)
    const [holtLocations, setHoltLocations] = useState([])
    const [busDetails, setBusDetails] = useState([])
    const db = firebase.firestore();
    let [selectedRoute, setSelectedRoute] = useState()

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
        let data = await dispatch(getAllDocuments("bus routs"))
        setRoutes(data || [])
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
                    {   loading ?
                        <Loading style={{minHeight:"65vh",display:"flex",justifyContent:"center",alignItems:"center"}}/>:  <MapComponent locations={holtLocations} busDetails={busDetails}/>
                    }
                </Card>
            </Box>
        </>
    )
}

export default Home