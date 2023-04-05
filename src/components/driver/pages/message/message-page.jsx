import {useEffect, useRef, useState} from "react";
import {filterDocsFromCollectionRT, getAllDocFromCollection} from "../../../../actions/common.action";
import useUserLoginInfo from "../../../../hooks/useLoginInfor";

const MessagePage = () => {

    let userDetails = useUserLoginInfo()
    let [messages, setMessages] = useState()
    let currectSelection = useRef('')

    useEffect(() => {
        if (userDetails?.id) getMessageList()

    }, [])

    console.log(messages, 'message')

    const inboxHandler = () => {
        currectSelection.current = 'inbox'
        filterDocsFromCollectionRT('messages', '', [['to', '==', userDetails?.id]], (messagelist) => {
            setMessages(messagelist)
        })
    }

    const sentboxHandler = () => {
        currectSelection.current = 'sent'
        filterDocsFromCollectionRT('messages', '', [['from', '==', userDetails?.id]], (messagelist) => {
            currectSelection.current = 'sent'
            setMessages(messagelist)
        })
    }

    async function getMessageList() {
        filterDocsFromCollectionRT('messages', '', [['to', '==', userDetails?.id]], (messagelist) => {
            setMessages(messagelist)
        })
    }

    return (
        <div className={"w-full"} style={{width: '100%'}}>
            <div className={' bg-white '}>
                <div className={'text-center'}>
                    Message List
                </div>
                <div className={'row gx-0 p-3'} style={{height: '86vh'}}>
                    <div className={'col-3 px-2'}>
                        <div className={'border'} style={{height: '100%'}}>
                            <div style={{
                                cursor: 'pointer',
                                backgroundColor: `${currectSelection.current == 'inbox' ? '#faf8f7' : ''}`
                            }} onClick={inboxHandler}
                                 className={`m-2 border border-black p-3 text-center cursor-pointer rounded-md cus-shadow`}>
                                Inbox
                            </div>
                            <div style={{
                                cursor: 'pointer',
                                backgroundColor: `${currectSelection.current == 'sent' ? '#faf8f7' : ''}`
                            }} onClick={sentboxHandler}
                                 className={`m-2 border border-black p-3 text-center cursor-pointer rounded-md cus-shadow`}>
                                Sent
                            </div>
                        </div>
                    </div>
                    <div className={'col-3 border'}>
                        {messages?.map((message) => (
                            <div style={{
                                cursor: 'pointer',
                                backgroundColor: `${currectSelection.current == 'inbox' ? '#faf8f7' : ''}`
                            }} onClick={inboxHandler}
                                 className={`m-2 border border-black p-3 text-center cursor-pointer rounded-md cus-shadow`}>
                                <div>
                                    {message?.to}
                                </div>
                                <div>
                                    {message?.from}
                                </div>
                                <div>
                                    {message?.message}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={'col-6'}>
                        fsfdf
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessagePage