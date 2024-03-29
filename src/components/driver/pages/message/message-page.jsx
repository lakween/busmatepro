import Loading from "../../../common/loading/loading"
import {Button} from "@chakra-ui/react";
import {useDispatch} from "react-redux";
import useUserLoginInfo from "../../../../hooks/useLoginInfor";
import {rebuildMessage} from "../../../../actions/passenger.action";
import {setModalPoperty} from "../../../../store/reducers/modal-slice";
import {useEffect, useRef, useState} from "react";
import {filterDocsFromCollectionRT, getAllDocFromCollection, updateFieldsOnly} from "../../../../actions/common.action";

const MessagePage = () => {

    let userDetails = useUserLoginInfo()
    let dispatch = useDispatch()
    let [messages, setMessages] = useState([])
    let [selectedMessage, setSelectedMessage] = useState(0)
    let [messageType, setMessageType] = useState('inbox')
    let [loading, setLoading] = useState(false)
    let [theme, settheme] = useState()

    const totalUnreadedMessages = () => messages?.filter((message) => !message?.read)?.length

    useEffect(() => {
        if (userDetails?.id) inboxHandler()
    }, [userDetails?.id])

    useEffect(() => {
        const htmlElement = document.documentElement;
        settheme(htmlElement?.className)
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const newClass = mutation.target.className;
                    settheme(newClass)
                }
            }
        });

        observer.observe(htmlElement, {attributes: true});
        return () => {
            observer.disconnect();
        };
    }, [])

    const inboxHandler = () => {
        setMessageType('inbox')
        setMessages([])
        setLoading(true)
        filterDocsFromCollectionRT('messages', '', [['to', '==', userDetails?.id]], async (messagelist) => {
            setLoading(true)
            let rebulitMessages = await rebuildMessage(messagelist)
            setMessageType('inbox')
            setMessages(rebulitMessages)
            setLoading(false)
        })
    }

    const sentboxHandler = () => {
        setMessageType('sent')
        setMessages([])
        filterDocsFromCollectionRT('messages', '', [['from', '==', userDetails?.id]], async (messagelist) => {
            setLoading(true)
            let rebulitMessages = await rebuildMessage(messagelist)
            setMessageType('sent')
            setMessages(rebulitMessages)
            setLoading(false)
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

    const onClickMessage = (index, row) => {
        setSelectedMessage(index)
        if (messageType == 'inbox') updateFieldsOnly('messages', row?.id, {read: true})

    }

    const generateStyleForType = (type) => {
        switch (type) {
            case 'inbox': {
                if (theme == 'dark') return {backgroundColor: `${messageType == 'inbox' ? '#202021' : '#313134'}`}
                else return {backgroundColor: `${messageType == 'inbox' ? '#f2f0eb' : '#ffffff'}`}
            }
            case 'sent': {
                if (theme == 'dark') return {backgroundColor: `${messageType == 'sent' ? '#202021' : '#313134'}`}
                else return {backgroundColor: `${messageType == 'sent' ? '#f2f0eb' : '#ffffff'}`}
            }
        }
    }

    const generateStyleFormessage = (index) => {
        if (theme == 'dark') return {backgroundColor: `${selectedMessage == index ? '#202021' : '#313134'}`}
        else return {
            backgroundColor: `${selectedMessage == index ? '#f2f0eb' : '#ffffff'}`
        }
    }
    return (
        <div className={"w-full h-full p-5 rounded-md"} style={{width: '100%'}}>
            <div className={' bg-white dark:bg-slate-800 w-full rounded-sm h-full'}>
                <div className={'text-center pt-3 w-full text-[30px]'}>
                    Message List
                </div>
                <div className={'flex flex-col gap-5 md:flex-row gx-0 p-3 w-full h-[81vh]'}>
                    <div className={'w-full'}>
                        <div className={'border h-full  dark:bg-slate-700'}>
                            <div style={generateStyleForType('inbox')} onClick={inboxHandler}
                                 className={`m-2 border border-black p-3 text-center cursor-pointer rounded-md cus-shadow`}>
                                <div style={{display: 'flex', justifyContent: 'center', gap: '10px'}}>Inbox<span
                                    style={{
                                        backgroundColor: 'red',
                                        padding: '0px 5px 0px 5px',
                                        borderRadius: '100px'

                                    }}>{totalUnreadedMessages()}</span></div>
                            </div>
                            <div style={generateStyleForType('sent')} onClick={sentboxHandler}
                                 className={`m-2 border border-black p-3 text-center cursor-pointer rounded-md cus-shadow`}>
                                Sent
                            </div>
                        </div>
                    </div>
                    <div className={'w-full h-full border dark:bg-slate-700'} style={{overflowY: "auto"}}>
                        {loading ? <Loading style={{
                            height: "75vh",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}/> : messages?.map((message, index) => (
                            <div
                                className={`m-2 border border-black p-3 text-center cursor-pointer rounded-md cus-shadow`}
                                style={generateStyleFormessage(index)} onClick={() => {
                                onClickMessage(index, message)
                            }}>
                                <div className={'text-center w-100 text-truncate text-info font-weight-bold'}
                                     style={{fontWeight: 'bold'}}>
                                    <div className={'flex justify-center items-center gap-4 text-blue-600'}>
                                        {messageType == "inbox" ? message?.fromName : message?.toName}
                                        {messageType == "inbox" && (!message?.read ? (<img
                                            width={'20px'} height={'20px'}
                                            src={process.env.PUBLIC_URL + '/images/unread.png'}/>) : <img
                                            width={'20px'} height={'20px'}
                                            src={process.env.PUBLIC_URL + '/images/read.png'}/>)}
                                    </div>
                                    <div className={'text-truncate'}>
                                        {message?.message}
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={'w-full h-full'}>
                        <div className={'position-relative dark:bg-slate-700 border'} style={{height: '100%'}}>
                            <div className={'text-center'}>
                                {
                                    messages ? messages[selectedMessage]?.message : ''
                                }
                            </div>
                            {
                                (messageType == 'inbox') && (
                                    <div
                                        className={'absolute bottom-[55px] right-[35%] md:right-[12%] start-50 translate-middle-x mb-2'}>
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