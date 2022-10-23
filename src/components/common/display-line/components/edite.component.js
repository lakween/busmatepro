
import {Box, Button, Flex, useColorModeValue} from "@chakra-ui/react";
import {useState} from "react";

const EditComponent = ({
                           setIsEdit,
                           value = {},
                           name,
                           modelPath,
                           onUpdate,
                           ...rest
                       }) => {
    const [state, setState] = useState({[name]: value})
    return (
        <>
            <Flex gap={2} {...rest}>
                <Box borderWidth="1px"
                     borderColor={useColorModeValue('gray.200', 'gray.700')}
                     bg={useColorModeValue('white', 'gray.900')}>
                    <input color={'blue'}
                           value={state[name]}
                           type={'text'}
                           name={name}
                           onChange={(e) => {
                               setState({[name]:e.target.value})
                           }}/>
                </Box>
                <Button onClick={() => {
                    setIsEdit(false)
                    onUpdate(modelPath,state)
                }
                } colorScheme='teal' size='xs'>
                    OK
                </Button>
            </Flex>

        </>
    )
}

export default EditComponent