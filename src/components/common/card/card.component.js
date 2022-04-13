import {Box, Text} from "@chakra-ui/react";
import React from "react";

const Card = (props) => {
    let {padding = '3', margin, border = '1px', borderColor = 'black', outSideTitle, inSideTitle, children} = props

    const insideTitleMarkup = (<Text size={'md'} py={2} color={'#001f3f'} fontWeight={'bold'}>
        {inSideTitle}
    </Text>)

    const outsideTitleMarkup = (<Text size={'md'} py={2} px={3} color={'#001f3f'} fontWeight={'bold'}>
        {'asfjhasygfjas'}
    </Text>)

    return (
        <Box>
            {outsideTitleMarkup}
            <Box padding={padding} margin={margin} borderStyle={"solid"} borderWidth={border} borderColor={"#DDDDDD"}
                 borderRadius={3}>
                {inSideTitle && insideTitleMarkup}
                {children}
            </Box>
        </Box>

    )
}

const InSideTitle = (props) => {
}

export default Card

