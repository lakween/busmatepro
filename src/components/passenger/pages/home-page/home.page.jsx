import Card from "../../../common/card/card.component";
import {Box, Flex, Select, Spinner, Text} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {getAllDocuments} from "../../../../actions/user.actions";
import MapComponent from "../../../common/map/map.component";
import useFormController from "../../../../hooks/useFormController";
import {useDispatch} from "react-redux";
import {getDocs} from "firebase/firestore";
import {getDocFromCollection} from "../../../../actions/common.action";

const Home = () => {
    let dispatch = useDispatch()
    const [routes, setRoutes] = useState([])
    const [holts, setHolts] = useState([])
    const [locations, setLocations] = useState([])

    const onChnageHandler = async (event) => {
        let array = []
        let holtsRef = await routes?.find((route) => route.id == event.target.value).holts
        if (holtsRef) {
            for (let holt of holtsRef) {
                let holtData = await dispatch(getDocFromCollection('bus holts', holt.id))
                array.push(holtData)
            }
            console.log(array, 'array')
            let locationsArray = []
            for (let item of array) {
                if (item.location) {
                    locationsArray.push({latLng: JSON.parse(item.location)})
                }
            }
            setLocations(locationsArray || [])
        } else {
            setLocations([])
            setHolts(array)
        }
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
            <Box display={"flex"} flexDirection={"column"} gap={5} padding={10} width={'80%'} justify={"center"}
                 align={"center"}>
                <Card>
                    <Flex justify={"center"} align={"center"}>
                        <Text fontWeight={1} textAlign={"center"}>
                            Start your journey today
                        </Text>
                    </Flex>
                </Card>
                <Card>
                    <Flex direction={"row"} gap={5} justify={"center"} align={"center"}>

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
                    <MapComponent locations={locations}/>
                    {locations.length > 0 ? null: <text>Loading....</text>}
                </Card>
            </Box>
        </>
    )
}

const setHoltLocations =()=>{

}


export default Home