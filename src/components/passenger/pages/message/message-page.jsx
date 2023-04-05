import {useEffect, useState} from "react";
import {filterDocsFromCollectionRT, getAllDocFromCollection} from "../../../../actions/common.action";
import useUserLoginInfo from "../../../../hooks/useLoginInfor";

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
        <div className={"w-full"} style={{width: '100%'}}>
            <div className={'row bg-white '}>
                <div className={'col-3'}>
                    Message List
                </div>
                <div className={'col-9'}>

                </div>

            </div>
        </div>
    )
}

export default MessagePage