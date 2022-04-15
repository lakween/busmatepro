import Card from "../../../common/card/card.component";
import {Box, Flex, Select, Text} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {getAllDocuments} from "../../../../services/user.service";
import {useDispatch} from "react-redux";


const Home= ()=>{

    const[holts ,setHolts] = useState([])
    const dispatch = useDispatch()

    useEffect(()=>{
        getData()
    },[])

    async function getData(){
       let data = await getAllDocuments('bus holts')
        setHolts(data)
    }

    console.log(holts)
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
        </Box>
        </>
    )


}

export default Home