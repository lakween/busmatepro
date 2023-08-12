import Card from "../../../common/card/card.component";
import {Box, Flex, Select, Text, useColorModeValue} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {getAllDocuments} from "../../../../actions/user.actions";
import MapComponent from "../../../common/map/map.component";
import {useDispatch} from "react-redux";
import {getBusLocations, getHoltLocations} from "../../../../actions/home.action";
import firebase from "firebase/compat/app";
import Loading from "../../../common/loading/loading";
import {getDocFromCollection} from "../../../../actions/common.action";

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
            array.push({...route, start: start, end: end})
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
            <div className={'w-full h-full space-y-2 p-5'}>
                <div className={'bg-white rounded p-5 w-full'}>
                    <Text fontWeight={1} textAlign={"center"}>
                        Start your journey today </Text>
                </div>
                <div className={'bg-white rounded w-full'}>
                    <Flex  direction={"row"} gap={5} justify={"center"}
                          align={"center"}>

                        <Select name={"start"} icon={''} onChange={onChnageHandler} placeholder='Start' size={'sm'}>
                            {
                                routes?.map((route, index) => (
                                    <option key={index} value={route.id}>{route.start + " To " + route.end}</option>))
                            }
                        </Select>
                    </Flex>
                </div>
                <div className={'bg-white rounded w-full h-[60vh]'}>
                    {loading ?
                        <Loading style={{
                            minHeight: "65vh",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }} /> : <MapComponent locations={holtLocations} busDetails={busDetails} />
                    }
                </div>
            </div>
        </>
    )
}

export default Home