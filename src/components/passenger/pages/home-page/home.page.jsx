import Card from "../../../common/card/card.component";
import {Box, Flex, Select, Spinner, Text} from "@chakra-ui/react";
import {useEffect, useRef, useState} from "react";
import {getAllDocuments} from "../../../../services/user.service";
import {useDispatch} from "react-redux";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import Map from "../../../common/map/map.component";
import MyMapComponent from "../../../common/map/map.component";

const Home= ()=>{

    const[holts ,setHolts] = useState([])
    const [zoom, setZoom] = useState(3); // initial zoom
    const [renderr, setRender] = useState(3); // initial zoom
    const [center, setCenter] = useState({
        lat: 0,
        lng: 0,
    });
    useEffect(()=>{
        getData()
    },[])

    async function getData(){
        let data = await getAllDocuments('bus holts')
        setHolts(data)
    }

        return (
        <>
        <Box display={"flex"} flexDirection={"column"} gap={5} padding={10} width={'80%'} justify={"center"} align={"center"}>
            <Card>
               <Flex justify={"center"} align={"center"}>
                    <Text textAlign={"center"}>
                        Start your journey today
                    </Text>
               </Flex>
            </Card>
            <Card >
                <Flex direction={"row"} gap={5} justify={"center"} align={"center"}>

                    <Select icon={''} placeholder='Start' size={'sm'} >
                        {
                            holts?.map((holt)=>( <option value={holt.id}>{holt.holt_name}</option>))
                        }
                    </Select>
                    <Select icon={''} placeholder='End' size={'sm'} size={'sm'}>
                        {
                            holts?.map((holt)=>( <option value={holt.id}>{holt.holt_name}</option>))
                        }
                    </Select>
                </Flex>
            </Card>
            <Card >
                    <Wrapper apiKey={"AIzaSyB5h2G7hf-wjjrZMJPSRC4HOfQ71WYyvGo"}>
                        <MyMapComponent/>
                    </Wrapper>
            </Card>
        </Box>
        </>
    )
}

export default Home