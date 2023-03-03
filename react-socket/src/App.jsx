import React, {useEffect, useState} from 'react'
import io from 'socket.io-client';
import Chat from "./Chat.jsx";

const socket = io()

function App() {
    const [isConnected, setIsConnected] = useState(socket.connected)
    const [lastPong, setLastPong] = useState(null)
    const [msg, setMsg] = useState('')
    const [sid, setSid] = useState('')

    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        socket.on('pong', (data) => {
            setLastPong(new Date().toISOString());
            console.log(data)
            setMsg(data.message)
            setSid(data.room)
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('pong');
        };
    }, []);

    const sendPing = () => {
        socket.emit('ping', 'msg 123123');
    }

    return (
        <>
            <p>Connected: {isConnected.toString()}</p>
            <Chat socket={socket}/>
        </>
    )
    return (
        <>
            <div>
                <p>Connected: {'' + isConnected}</p>
                <p>Last pong: {lastPong || '-'}</p>
                <p>Pong msg: {msg || '-'}</p>
                <p>Pong room: {sid || '-'}</p>
                <button onClick={sendPing}>Send ping</button>
            </div>
            <Chat socket={socket}/>
        </>

    );
}

export default App
