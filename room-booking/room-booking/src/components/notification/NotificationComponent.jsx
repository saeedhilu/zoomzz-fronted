// src/components/NotificationComponent.js
import React, { useEffect, useState } from 'react';
import connectWebSocket from './Socket';

const NotificationComponent = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const socket = connectWebSocket('ws://localhost:8000/ws/notifications/', (message) => {
            setNotifications((prevNotifications) => [...prevNotifications, message]);
        });

        return () => socket.close();
    }, []);

    return (
        <div className="notification-container ">
          <h1>hello</h1>
            {notifications.map((notif, index) => (
                <div key={index} className="notification">
                    {notif}
                </div>
            ))}
        </div>
    );
};

export default NotificationComponent;
