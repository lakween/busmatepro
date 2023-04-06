import {useEffect, useRef, useState} from "react";
import {filterDocsFromCollectionRT, getAllDocFromCollection} from "../../../../actions/common.action";
import useUserLoginInfo from "../../../../hooks/useLoginInfor";
import {rebuildMessage} from "../../../../actions/passenger.action";
import {Button} from "@chakra-ui/react";
import {setModalPoperty} from "../../../../store/reducers/modal-slice";
import {useDispatch} from "react-redux";

const MessagePage = () => {

    let userDetails = useUserLoginInfo()
    let dispatch = useDispatch()
    let [messages, setMessages] = useState()
    let [selectedMessage, setSelectedMessage] = useState(0)
    let [messageType, setMessageType] = useState('inbox')

    useEffect(() => {
        if (userDetails?.id) inboxHandler()
    }, [userDetails?.id])

    const inboxHandler = () => {
        setMessageType('inbox')
        setMessages([])
        filterDocsFromCollectionRT('messages', '', [['to', '==', userDetails?.id]], async (messagelist) => {
            let rebulitMessages = await rebuildMessage(messagelist)
            setMessages(rebulitMessages)
        })
    }

    const sentboxHandler = () => {
        setMessageType('sent')
        setMessages([])
        filterDocsFromCollectionRT('messages', '', [['from', '==', userDetails?.id]], async (messagelist) => {
            let rebulitMessages = await rebuildMessage(messagelist)
            setMessages(rebulitMessages)
        })
    }

    const openReplyModal = () => {
        if (messages[selectedMessage]) {
            dispatch(setModalPoperty({model: 'sendReplyMessageModal', poperty: 'isOpen', value: true}))
            dispatch(setModalPoperty({
                model: 'sendReplyMessageModal',
                poperty: 'data',
                value: messages[selectedMessage]
            }))
        }
    }

    return (
        <div className={"w-full"} style={{width: '100%'}}>
            <div className={' bg-white '}>
                <div className={'text-center pt-3'} style={{fontSize: '30px'}}>
                    Message List
                </div>
                <div className={'row gx-0 p-3'} style={{height: '81vh'}}>
                    <div className={'col-3 px-2'}>
                        <div className={'border'} style={{height: '100%'}}>
                            <div style={{
                                cursor: 'pointer',
                                backgroundColor: `${messageType == 'inbox' ? '#faf8f7' : ''}`
                            }} onClick={inboxHandler}
                                 className={`m-2 border border-black p-3 text-center cursor-pointer rounded-md cus-shadow`}>
                                Inbox
                            </div>
                            <div style={{
                                cursor: 'pointer',
                                backgroundColor: `${messageType == 'sent' ? '#faf8f7' : ''}`
                            }} onClick={sentboxHandler}
                                 className={`m-2 border border-black p-3 text-center cursor-pointer rounded-md cus-shadow`}>
                                Sent
                            </div>
                        </div>
                    </div>
                    <div className={'col-3 border'}>
                        {messages?.map((message, index) => (
                            <div style={{
                                cursor: 'pointer',
                                backgroundColor: `${selectedMessage == index ? '#faf8f7' : ''}`
                            }} onClick={() => setSelectedMessage(index)}
                                 className={`m-2 border border-black p-3 text-center cursor-pointer rounded-md cus-shadow`}>
                                <div className={'text-center w-100 text-truncate text-info font-weight-bold'}
                                     style={{fontWeight: 'bold'}}>
                                    {messageType == "inbox" ? message?.fromName : message?.toName}
                                </div>
                                <div className={'text-truncate'}>
                                    {message?.message}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={'col-6'} style={{height: '100%'}}>
                        <div className={'position-relative border mx-2 p-2'} style={{height: '100%'}}>
                            <div className={'text-center'}>
                                {
                                    messages ? messages[selectedMessage]?.message : ''
                                }
                            </div>
                            {
                                (messageType == 'inbox') && (
                                    <div className={'position-absolute bottom-0 start-50 translate-middle-x mb-2'}>
                                        <Button colorScheme='teal' size='sm' onClick={openReplyModal}>
                                            Replay
                                        </Button>
                                    </div>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessagePage