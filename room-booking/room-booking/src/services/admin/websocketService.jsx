// // src/services/websocketService.jsx
// import { Client } from '@stomp/stompjs';
// import { useState } from 'react';

// class WebSocketService {
//     constructor(setShowModal, setNotificationMessage) {
//         this.client = null;
//         this.setShowModal = setShowModal;
//         this.setNotificationMessage = setNotificationMessage;
//         this.connect();
//     }

//     connect() {
//         this.client = new Client({
//             brokerURL: 'ws://localhost:8000/ws/notifications/', // Replace with your backend URL
//             connectHeaders: {},
//             debug: (str) => {
//                 console.log(str);
//             },
//             onConnect: (frame) => {
//                 console.log('Connected: ' + frame);
//                 this.client.subscribe('/topic/notifications', (message) => {
//                     if (message.body) {
//                         console.log('New notification:', message.body);
//                         const data = JSON.parse(message.body);
//                         this.handleNotification(data.message);
//                     }
//                 });
//             },
//             onStompError: (frame) => {
//                 console.error('STOMP Error:', frame);
//             },
//             onWebSocketClose: (event) => {
//                 console.error('WebSocket closed:', event);
//             },
//         });
//         this.client.activate();
//     }

//     disconnect() {
//         if (this.client !== null) {
//             this.client.deactivate();
//             console.log('Disconnected');
//         }
//     }

//     handleNotification(message) {
//         // Trigger modal display
//         this.setNotificationMessage(message);
//         this.setShowModal(true);
//     }
// }

// export default WebSocketService;
