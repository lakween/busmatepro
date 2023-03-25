import { collection, query, where, onSnapshot } from "firebase/firestore";
import firebase from "firebase/compat/app";
import React, {useEffect} from "react";
import {Menu, Button, MenuButton, MenuItem, MenuList, Image, IconButton} from "@chakra-ui/react";
import {FiBell} from "react-icons/fi";
import passengerNotificationFactory from "./notification-factory";

function ChevronDownIcon() {
    return null;
}

const Notifications = () => {
    // const db = firebase.firestore();
    // const q = query(collection(db, "user requests"), where("status", "==", "waiting"));
    // const unsubscribe = ''
   new passengerNotificationFactory()
    // useEffect(()=>{
    //     onSnapshot(q, { includeMetadataChanges: true },  (snapshot) => {
    //         snapshot.docChanges().forEach((change) => {
    //                 console.log("New city: ", change.doc.data());
    //         });
    //     });
    // })


    return (
        <Menu>
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
        </Menu>
    )
}

export default Notifications