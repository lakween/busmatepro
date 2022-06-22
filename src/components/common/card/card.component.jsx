import {Box, Text, useColorModeValue} from "@chakra-ui/react";
import React from "react";

const Card = (props) => {
    let {padding = '3', margin, border = '1px', borderColor = 'black', outSideTitle, inSideTitle, children , minHeight} = props

    const insideTitleMarkup = (<Text size={'md'} paddingBottom={1} color={'#001f3f'} fontWeight={'bold'}>
        {inSideTitle}
    </Text>)

    const outsideTitleMarkup = (<Text size={'md'} py={2} px={3} color={'#001f3f'} fontWeight={'bold'}>
        {outSideTitle}
    </Text>)

    return (
        <Box  bg={useColorModeValue('white', 'gray.900')} width={'100%'} bg={'white'} borderRadius={6} minHeight={minHeight} borderColor={useColorModeValue('gray.200', 'gray.700')}>
            {outSideTitle && outsideTitleMarkup}
            <Box  bg={useColorModeValue('white', 'gray.900')} borderColor={useColorModeValue('gray.200', 'gray.700')} width={'100%'} padding={padding}  minHeight={minHeight} margin={margin} borderStyle={"solid"} borderWidth={border} borderColor={"#DDDDDD"}
                 borderRadius={6}>
                {inSideTitle && insideTitleMarkup}
                {children}
            </Box>
        </Box>
    )
}

export default Card

