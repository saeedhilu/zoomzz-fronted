// services/socket.js
const connectWebSocket = (url, onMessage) => {
    const socket = new WebSocket(url);
  
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data.message);
    };
  
    socket.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };
  
    socket.onclose = () => {
      console.log('WebSocket connection closed');
      // Optional: Attempt to reconnect after a delay
      setTimeout(() => connectWebSocket(url, onMessage), 5000);
    };
  
    return socket;
  };
  
  export default connectWebSocket;
  