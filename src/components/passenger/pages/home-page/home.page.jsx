import Card from "../../../common/card/card.component";
import {Box, Flex, Select, Text} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {getAllDocuments} from "../../../../actions/user.actions";
import MapComponent from "../../../common/map/map.component";
import useFormController from "../../../../hooks/useFormController";
import {useDispatch} from "react-redux";

const Home = () => {
    let dispatch = useDispatch()
    const [holts, setHolts] = useState([])
    const [valueChangeHandler, setValue, form, setForm] =useFormController()

    useEffect(() => {
        getData()
    }, [])

    async function getData() {
        let data = await dispatch(getAllDocuments("bus holts"))
        setHolts(data)
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

                        <Select name={"start"} icon={''} onChange={valueChangeHandler} placeholder='Start' size={'sm'}>
                            {
                                holts?.map((holt, index) => (
                                    <option key={index} value={holt.id}>{holt.holt_name}</option>))
                            }
                        </Select>
                        <Select onChange={valueChangeHandler} name={"end"} icon={''} placeholder='End' size={'sm'}>
                            {
                                holts?.map((holt, index) => (
                                    <option key={index} value={holt.id}>{holt.holt_name}</option>))
                            }
                        </Select>
                    </Flex>
                </Card>
                <Card>
                    <MapComponent form={form}/>
                </Card>
            </Box>
        </>
    )
}

export default Home