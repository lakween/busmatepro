import React from "react";
import {IconButton, Image, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {FiBell} from "react-icons/fi";
const Notifications = () => {

    return (<Menu>
            <MenuButton>
                <IconButton
                    size="lg"
                    variant="ghost"
                    aria-label="open menu"
                    icon={<FiBell/>}
                />
            </MenuButton>
            <MenuList>
                <MenuItem minH='48px'>
                    <Image
                        boxSize='2rem'
                        borderRadius='full'
                        src='https://placekitten.com/100/100'
                        alt='Fluffybuns the destroyer'
                        mr='12px'
                    />
                    <span>Fluffybuns the Destroyer</span>
                </MenuItem>
                <MenuItem minH='40px'>
                    <Image
                        boxSize='2rem'
                        borderRadius='full'
                        src='https://placekitten.com/120/120'
                        alt='Simon the pensive'
                        mr='12px'
                    />
                    <span>Simon the pensive</span>
                </MenuItem>
            </MenuList>
        </Menu>)
}

export default Notifications