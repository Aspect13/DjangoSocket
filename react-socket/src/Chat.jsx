import React, {useEffect, useState} from "react";


const chatRoomName = 'my_awesome_chat_room'
const Chat = ({socket}) => {
    const [name, setName] = useState('')
    const [submittedName, setSubmittedName] = useState('')
    const [chatMessage, setChatMessage] = useState('')
    const [messages, setMessages] = useState([])

    const handleSendMessage = e => {
        e.preventDefault()
        socket.emit('chat', {message: chatMessage, user: submittedName})
        setChatMessage('')
    }

    useEffect(() => {
        socket.on('chat', (message) => setMessages(prevState => [...prevState, message]))
        return () => socket.off('chat')
    }, [socket, setMessages])

    useEffect(() => {
        if (submittedName) {
            socket.emit('enter_chat', {room: chatRoomName, user: submittedName})
        }
    }, [submittedName])

    if (!submittedName) {
        return (
            <div>
                <input type={'text'} placeholder={'choose your chatname'} onChange={e => setName(e.target.value)} value={name}/>
                <button type={"button"} onClick={e => setSubmittedName(name)}>Submit</button>
            </div>
        )
    }


    return (
        <div>
            <div>Welcome to chat, {submittedName}!</div>
            <ul>
                <li>Messages will be here: </li>
                {messages.map((i, index) => {
                    return (
                        <li key={index}>{new Date(i.timestamp).toLocaleTimeString()} - {i.user}: {i.message}</li>
                    )
                })}
            </ul>
            <input type={"text"} onChange={e => setChatMessage(e.target.value)} value={chatMessage} onKeyDown={e => e.key === 'Enter' && handleSendMessage(e)} />
            <button type={"submit"} onClick={handleSendMessage}>Send</button>
        </div>
    )
}
export default Chat