import {Box, Text} from "@chakra-ui/react";
import React from "react";

const Card = (props) => {
    let {padding = '3', margin, border = '1px', borderColor = 'black', outSideTitle , inSideTitle ,children} = props

    return (
        <Box padding={padding} margin={margin} borderStyle={"solid"} borderWidth={border} borderColor={"#DDDDDD"}
             borderRadius={3}>
            <Text>
                jsfgsdjfgdshgfshd
            </Text>
            {children}
        </Box>
    )
}

export default Card

