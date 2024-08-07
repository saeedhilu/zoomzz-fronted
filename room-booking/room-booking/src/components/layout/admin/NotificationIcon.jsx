// src/components/layout/admin/NotificationIcon.js
import React from 'react';
import { FaBell } from 'react-icons/fa'; // FontAwesome Bell icon

const NotificationIcon = ({ onClick }) => {
    return (
        <button onClick={onClick} className="notification-icon-button">
            <FaBell size={24} />
        </button>
    );
};

export default NotificationIcon;
