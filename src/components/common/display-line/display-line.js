import {Flex, Text} from "@chakra-ui/react";
import {useState} from "react";
import {FaPencilAlt} from "react-icons/fa";
import EditComponent from "./components/edite.component";

const DisplayLine = ({
                         modelPath,
                         name,
                         onUpdate,
                         value,
                         ...rest
                     }) => {
    const [isEdit, setIsEdit] = useState(false)

    return (
        <> {!isEdit ?
            (
                <Flex gap={5} direction={'row'} align={'center'} {...rest}>
                    <Text>{value}</Text>
                    <FaPencilAlt onClick={() => setIsEdit(true)}/>
                </Flex>
            ) :
            <EditComponent
                modelPath={modelPath}
                name={name}
                onUpdate={onUpdate}
                value={value}
                setIsEdit={setIsEdit}
                {...rest}
            />}
        </>
    )
}

export default DisplayLine