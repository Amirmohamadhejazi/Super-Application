'use client';
import React, { useState } from 'react';

const WebSocketTest = () => {
    const [message, setMessage] = useState<string[]>([]);
    const ws = new WebSocket(
        'wss://free.blr2.piesocket.com/v3/1?api_key=nnSkfytXGdt6wJbEQUWtfqwbofdX5i3i5wv08Nip&notify_self=1'
    );

    const apiCall = {
        event: 'bts:subscribe',
        data: { channel: 'order_book_btcusd' }
    };

    ws.onopen = (event) => {
        ws.send(JSON.stringify(apiCall));
    };

    ws.onmessage = function (event) {
        console.log('event');
        // console.log(event);
        // if (typeof event.data === 'string') {
        //     console.log(event.data);
        // } else {
        //     console.log(event.data);
        // }
        // console.log(event);
        setMessage([...message, event.data]);
    };
    return (
        <div className="flex flex-col p-3">
            {message.map((itemsMessage, index) => (
                <div className="flex gap-x-2" key={index}>
                    <div className="bg-red-600 rounded-full p-6"></div>
                    <div className="flex flex-col">
                        <span>name: Amir</span>
                        <span>message: {itemsMessage}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WebSocketTest;
