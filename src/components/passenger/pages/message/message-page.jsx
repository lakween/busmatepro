import {useEffect, useState} from "react";
import {filterDocsFromCollectionRT, getAllDocFromCollection} from "../../../../actions/common.action";
import useUserLoginInfo from "../../../../hooks/useLoginInfor";
import {Box, StackDivider, VStack} from "@chakra-ui/react";

const MessagePage = () => {

    let userDetails = useUserLoginInfo()
    let [messages, setMessages] = useState()

    useEffect(() => {
        if (userDetails?.id) getMessageList()

    }, [])

    async function getMessageList() {
        filterDocsFromCollectionRT('messages', '', [['from', '==', userDetails?.id]], (messagelist) => {
            setMessages(messagelist)
        })
    }

    return (
        // <div className={"w-full"} style={{width: '100%'}}>
        //     <div className={'row bg-white '}>
        //         <div className={'col-3'}>
        //             Message List
        //         </div>
        //         <div className={'col-9'}>
        //
        //         </div>
        //
        //     </div>
        // </div>
        <VStack
            divider={<StackDivider borderColor='gray.200'/>}
            spacing={4}
            align='stretch'
        >
            <div className={'row bg-white '}>
                <div className={'col-3'}>
                    Message List
                </div>
            </div>
        </VStack>
    )
}

export default MessagePage